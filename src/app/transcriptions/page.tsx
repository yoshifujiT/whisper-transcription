// src/app/transcriptions/page.tsx
import Link from 'next/link';
import TranscriptionsList from './TranscriptionList';
import { Home } from 'lucide-react';

export default function TranscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">文字起こし一覧</h1>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <Home className="h-4 w-4 mr-2" />
          ホームに戻る
        </Link>
      </div>
      <TranscriptionsList />
    </div>
  );
}
