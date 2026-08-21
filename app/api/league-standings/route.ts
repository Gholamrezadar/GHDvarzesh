import { NextRequest, NextResponse } from 'next/server';
import { standingsUrl } from '@/utils/varzesh3_constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');

  if (!league) {
    return NextResponse.json({ error: 'league is required' }, { status: 400 });
  }

  const url = standingsUrl(league);
  if (!url) {
    return NextResponse.json({ error: 'unknown league' }, { status: 400 });
  }

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
