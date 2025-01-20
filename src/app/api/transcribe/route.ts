// src/app/api/transcribe/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ファイル名から拡張子を取り除く関数
function removeFileExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}

// ファイル名を安全な形式に変換する関数
function sanitizeFilename(filename: string): string {
  // 1. パスとして危険な文字を削除
  // 2. ファイル名として不適切な文字を削除
  const sanitized = filename
    .replace(/[/\\?%*:|"<>]/g, '_')  // Windowsで使用できない文字を置換
    .replace(/\s+/g, '_')            // スペースをアンダースコアに置換
    .trim();                         // 前後の空白を削除

  // デコード処理を追加（日本語URLエンコードされている場合に対応）
  try {
    return decodeURIComponent(sanitized);
  } catch {
    return sanitized;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const originalFilename = file.name;
    const baseFilename = removeFileExtension(originalFilename);
    const safeFilename = sanitizeFilename(baseFilename);
    
    // バッファオーバーフロー対策として長すぎるファイル名を切る
    const maxLength = 100; // 適切な長さに調整
    const truncatedFilename = safeFilename.length > maxLength 
      ? safeFilename.slice(0, maxLength) + '_' + Date.now()
      : safeFilename;

    const transcriptionPath = path.join(
      process.cwd(),
      'transcriptions',
      `${truncatedFilename}.txt`
    );

    // キャッシュの確認
    try {
      const cachedTranscription = await fs.readFile(transcriptionPath, 'utf-8');
      console.log(`Cache hit for file: ${originalFilename}`);
      return NextResponse.json({
        text: cachedTranscription,
        fromCache: true,
        originalFilename
      });
    } catch (error) {
      console.log(error)
      // キャッシュがない場合は続行
    }

    // 新規文字起こしの実行
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      response_format: 'verbose_json',
    });

    // transcriptionsディレクトリが存在することを確認
    const transcriptionsDir = path.join(process.cwd(), 'transcriptions');
    try {
      await fs.access(transcriptionsDir);
    } catch {
      await fs.mkdir(transcriptionsDir, { recursive: true });
    }

    // 結果の保存
    await fs.writeFile(transcriptionPath, transcription.text);
    console.log(`Saved transcription for file: ${originalFilename} as ${truncatedFilename}.txt`);

    return NextResponse.json({
      text: transcription.text,
      fromCache: false,
      originalFilename
    });

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Transcription failed' },
      { status: 500 }
    );
  }
}
