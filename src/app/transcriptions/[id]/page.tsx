// src/app/transcriptions/[id]/page.tsx
import Link from 'next/link';
import TranscriptionDetail from './TranscriptionDetail';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function TranscriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/transcriptions"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          一覧に戻る
        </Link>
        <ThemeToggle />
      </div>
      <TranscriptionDetail />
    </div>
  );
}
