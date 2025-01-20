// src/app/api/transcriptions/[id]/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      'transcriptions',
      `${params.id}.txt`
    );
    
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);

    return NextResponse.json({
      id: params.id,
      filename: `${params.id}.txt`,
      createdAt: stats.birthtime.toISOString(),
      path: filePath,
      text: content
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Transcription not found' },
      { status: 404 }
    );
  }
}
