import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://web-api.varzesh3.com/v2.0/livescore/today', {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}