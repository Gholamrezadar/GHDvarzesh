import { NextResponse } from 'next/server';
import { TODAYS_MATCHES_URL } from '@/utils/varzesh3_constants';

export async function GET() {
  const res = await fetch(TODAYS_MATCHES_URL, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
