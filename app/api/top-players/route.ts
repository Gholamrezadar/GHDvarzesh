import { NextRequest, NextResponse } from 'next/server';
import { topScorersUrl, topAssistersUrl, LeagueKey } from '@/utils/varzesh3_constants';

interface WidgetPlayer {
  id: number;
  name: string;
  portrait: string;
  team: { id: number; name: string };
}

interface WidgetGroup {
  goalCount: number;
  players: WidgetPlayer[];
}

function flattenGroups(groups: WidgetGroup[]): Map<number, { player: WidgetPlayer; count: number }> {
  const map = new Map<number, { player: WidgetPlayer; count: number }>();
  for (const group of groups) {
    for (const p of group.players) {
      map.set(p.id, { player: p, count: group.goalCount });
    }
  }
  return map;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');
  const mode = searchParams.get('mode') || 'Goal';

  if (!league) {
    return NextResponse.json({ error: 'league is required' }, { status: 400 });
  }

  if (mode === 'GA') {
    const [scorersRes, assistersRes] = await Promise.all([
      fetch(topScorersUrl(league as LeagueKey), { headers: { 'Content-Type': 'application/json' } }),
      fetch(topAssistersUrl(league as LeagueKey), { headers: { 'Content-Type': 'application/json' } }),
    ]);

    const scorersData = await scorersRes.json();
    const assistersData = await assistersRes.json();

    const goalsMap = flattenGroups(scorersData.topPlayers);
    const assistsMap = flattenGroups(assistersData.topPlayers);

    const merged = new Map<number, { player: WidgetPlayer; goals: number; assists: number; total: number }>();

    for (const [id, { player, count }] of goalsMap) {
      merged.set(id, { player, goals: count, assists: 0, total: count });
    }

    for (const [id, { player, count }] of assistsMap) {
      const existing = merged.get(id);
      if (existing) {
        existing.assists = count;
        existing.total = existing.goals + count;
      } else {
        merged.set(id, { player, goals: 0, assists: count, total: count });
      }
    }

    const sorted = [...merged.values()].sort((a, b) => b.total - a.total);

    const topPlayers = sorted.slice(0, 20).map(({ player, total }) => ({
      goalCount: total,
      players: [{
        id: player.id,
        name: player.name,
        portrait: player.portrait,
        team: { name: player.team.name },
      }],
    }));

    return NextResponse.json({ topPlayers });
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
