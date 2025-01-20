// src/app/page.tsx
import Link from 'next/link';
import TranscriptionUploader from '@/components/TranscriptionUploader';
import { FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">音声文字起こしツール</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href="/transcriptions" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              文字起こし一覧
            </Link>
          </div>
        </div>
        <TranscriptionUploader />
      </div>
    </main>
  );
}
