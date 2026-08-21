import { NextRequest, NextResponse } from 'next/server';
import { topScorersUrl, topAssistersUrl, LeagueKey } from '@/utils/varzesh3_constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');
  const mode = searchParams.get('mode') || 'Goal';

  if (!league) {
    return NextResponse.json({ error: 'league is required' }, { status: 400 });
  }

  const url = mode === 'Goal'
    ? topScorersUrl(league as LeagueKey)
    : topAssistersUrl(league as LeagueKey);

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
