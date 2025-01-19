// src/components/TranscriptionUploader.tsx
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function TranscriptionUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('文字起こしに失敗しました');
      }

      const data = await response.json();
      setResult(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxSize: 25 * 1024 * 1024,
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* アップロードエリア */}
      <div
        {...getRootProps()}
        className={`
          p-8 rounded-lg border-2 border-dashed transition-all duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="text-gray-600">
            {isDragActive ? (
              <p className="text-blue-500">ファイルをドロップしてください</p>
            ) : (
              <>
                <p className="mb-2">音声ファイルをドラッグ&ドロップ</p>
                <p className="text-sm text-gray-500">または クリックしてファイルを選択</p>
                <p className="mt-2 text-xs text-gray-400">
                  対応フォーマット: MP3, WAV, M4A, OGG (最大25MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ローディング表示 */}
      {isLoading && (
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent mr-3"></div>
          <p className="text-gray-600">文字起こしを実行中...</p>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        </div>
      )}

      {/* 結果表示 */}
      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800">文字起こし結果</h3>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="max-h-[500px] overflow-y-auto prose prose-sm">
              {result.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
