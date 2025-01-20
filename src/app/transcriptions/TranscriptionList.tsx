// src/app/transcriptions/TranscriptionsList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TranscriptionItem } from '@/types/transcription';
import { FileText, Calendar } from 'lucide-react';

export default function TranscriptionsList() {
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await fetch('/api/transcriptions');
        if (!response.ok) throw new Error('Failed to fetch transcriptions');
        const data = await response.json();
        setTranscriptions(data);
      } catch (err) {
        console.log(err)
        setError('文字起こしデータの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscriptions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (transcriptions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        文字起こしデータがありません
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {transcriptions.map((transcription) => (
        <Link
          key={transcription.id}
          href={`/transcriptions/${transcription.id}`}
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {transcription.filename}
                </h2>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(transcription.createdAt).toLocaleString('ja-JP')}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm line-clamp-2">
            {transcription.text}
          </div>
        </Link>
      ))}
    </div>
  );
}
