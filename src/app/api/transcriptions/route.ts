// src/app/api/transcriptions/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { TranscriptionItem } from '@/types/transcription';

export async function GET() {
  try {
    const transcriptionsDir = path.join(process.cwd(), 'transcriptions');
    let files: string[];

    try {
      files = await fs.readdir(transcriptionsDir);
    } catch {
      await fs.mkdir(transcriptionsDir, { recursive: true });
      files = [];
    }

    const transcriptions: TranscriptionItem[] = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(transcriptionsDir, filename);
        const stats = await fs.stat(filePath);
        const content = await fs.readFile(filePath, 'utf-8');

        return {
          id: filename.replace('.txt', ''),
          filename: filename,
          createdAt: stats.birthtime.toISOString(),
          path: filePath,
          text: content
        };
      })
    );

    // 作成日時の降順でソート
    transcriptions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(transcriptions);
  } catch (error) {
    console.error('Error fetching transcriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transcriptions' },
      { status: 500 }
    );
  }
}
