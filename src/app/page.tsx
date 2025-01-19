// src/app/page.tsx
import TranscriptionUploader from '@/components/TranscriptionUploader';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          音声文字起こしツール
        </h1>
        <TranscriptionUploader />
      </div>
    </main>
  );
}
