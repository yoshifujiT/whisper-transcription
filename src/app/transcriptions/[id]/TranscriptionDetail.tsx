// src/app/transcriptions/[id]/TranscriptionDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TranscriptionItem } from '@/types/transcription';
import { Calendar, Copy, Check } from 'lucide-react';

export default function TranscriptionDetail() {
  const params = useParams();
  const [transcription, setTranscription] = useState<TranscriptionItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await fetch(`/api/transcriptions/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch transcription');
        const data = await response.json();
        setTranscription(data);
      } catch (err) {
        console.log(err)
        setError('文字起こしデータの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscription();
  }, [params.id]);

  const handleCopy = async () => {
    if (!transcription?.text) return;
    
    try {
      await navigator.clipboard.writeText(transcription.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !transcription) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error || 'データが見つかりませんでした'}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {transcription.filename}
          </h1>
          <div className="flex items-center mt-2 text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(transcription.createdAt).toLocaleString('ja-JP')}
          </div>
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
      <div className="mt-6 prose max-w-none">
        {transcription.text.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
