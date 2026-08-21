import { NextResponse } from 'next/server';
import { PLAYER_STATS_URL } from '@/utils/varzesh3_constants';

export async function GET() {
  const res = await fetch(PLAYER_STATS_URL, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
