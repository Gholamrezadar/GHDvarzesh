import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://web-api.varzesh3.com/v1.0/tags/927733/videos?take=64', {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}