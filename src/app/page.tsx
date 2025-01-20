// src/app/page.tsx
import Link from 'next/link';
import TranscriptionUploader from '@/components/TranscriptionUploader';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">音声文字起こしツール</h1>
          <Link 
            href="/transcriptions" 
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          >
            <FileText className="h-4 w-4 mr-2" />
            文字起こし一覧
          </Link>
        </div>
        <TranscriptionUploader />
      </div>
    </main>
  );
}
