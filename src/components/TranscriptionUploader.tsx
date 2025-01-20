// src/components/TranscriptionUploader.tsx
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Copy, Check, Loader } from 'lucide-react';

interface TranscriptionResponse {
  text: string;
  fromCache: boolean;
  originalFilename: string;
}

export default function TranscriptionUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    // ドロップされた時点で全ての状態をリセット
    setResult(null);
    setError(null);
    setCopied(false);
    setIsFromCache(false);
    
    setIsLoading(true);
    setCurrentFile(acceptedFiles[0].name);

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

      const data: TranscriptionResponse = await response.json();
      setResult(data.text);
      setIsFromCache(data.fromCache);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      setCurrentFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => {
      // ドラッグ開始時に結果をクリア
      setResult(null);
      setError(null);
      setCopied(false);
      setIsFromCache(false);
    },
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    maxSize: 25 * 1024 * 1024,
    disabled: isLoading, // 処理中は新しいファイルのアップロードを無効化
    multiple: false, // 単一ファイルのみ許可
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* ステータス表示 */}
      {currentFile && (
        <div className="text-sm text-gray-600">
          現在の処理ファイル: {currentFile}
        </div>
      )}

      {/* アップロードエリア */}
      <div
        {...getRootProps()}
        className={`
          p-8 rounded-lg border-2 border-dashed transition-all duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : isLoading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-50'
              : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="text-gray-600">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Loader className="h-6 w-6 animate-spin text-blue-500" />
                <p>文字起こしを実行中...</p>
              </div>
            ) : isDragActive ? (
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
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-800">文字起こし結果</h3>
              {isFromCache && (
                <span className="text-sm text-gray-500 ml-2">
                  (キャッシュから読み込み)
                </span>
              )}
            </div>
            <button
              onClick={handleCopy}
              className={`
                inline-flex items-center px-3 py-1.5 rounded
                ${copied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                transition-colors duration-200
              `}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  <span>コピーしました</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  <span>コピー</span>
                </>
              )}
            </button>
          </div>
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
