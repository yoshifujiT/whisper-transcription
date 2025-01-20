// src/types/transcription.ts
export interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

export interface TranscriptionItem {
  id: string;          // ファイル名から生成されるユニークID
  filename: string;    // 元のファイル名
  createdAt: string;  // 作成日時
  path: string;       // ファイルパス
  text: string;       // 文字起こしテキスト
}
