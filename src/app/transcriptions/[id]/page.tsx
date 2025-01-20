// src/app/transcriptions/[id]/page.tsx
import TranscriptionDetail from './TranscriptionDetail';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TranscriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/transcriptions"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        一覧に戻る
      </Link>
      <TranscriptionDetail />
    </div>
  );
}
