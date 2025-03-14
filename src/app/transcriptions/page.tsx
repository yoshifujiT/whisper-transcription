// src/app/transcriptions/page.tsx
import Link from 'next/link';
import TranscriptionsList from './TranscriptionList';
import { Home } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function TranscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">文字起こし一覧</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Home className="h-4 w-4 mr-2" />
            ホームに戻る
          </Link>
        </div>
      </div>
      <TranscriptionsList />
    </div>
  );
}
