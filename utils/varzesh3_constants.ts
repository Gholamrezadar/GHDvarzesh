// ==============================
// Varzesh3 API & UI Constants
// Update this file when URLs, IDs, or labels change.
// ==============================

export const VARZESH3_API_BASE = "https://web-api.varzesh3.com";

// League keys used throughout the app
export type LeagueKey = "laliga" | "prem" | "league1" | "ucl" | "seria" | "seriea" | "bundesliga";

// Season IDs
export const SEASON_IDS: Record<LeagueKey, string> = {
  laliga: "900921",
  prem: "900911",
  league1: "906386",
  ucl: "900825",
  seria: "906385",
  seriea: "906385",
  bundesliga: "906406",
};

// Widget IDs
export const WIDGET_TOP_SCORERS = "115";
export const WIDGET_STANDINGS = "84";

// Standing league IDs (widget 84)
export const STANDING_LEAGUE_IDS: Record<string, string> = {
  laliga: "906405",
  prem: "906384",
  seriea: "906385",
  bundesliga: "906406",
  league1: "906386",
};

// --- API Endpoint builders ---
export function topScorersUrl(league: LeagueKey): string {
  return `${VARZESH3_API_BASE}/v1.0/football/widgets/${WIDGET_TOP_SCORERS}/top-scorers/${SEASON_IDS[league]}`;
}

export function topAssistersUrl(league: LeagueKey): string {
  return `${VARZESH3_API_BASE}/v1.0/football/widgets/${WIDGET_TOP_SCORERS}/top-assisters/${SEASON_IDS[league]}`;
}

export function standingsUrl(league: string): string {
  const id = STANDING_LEAGUE_IDS[league];
  return `${VARZESH3_API_BASE}/v1.0/football/widgets/${WIDGET_STANDINGS}/league/${id}`;
}

export const LATEST_MATCHES_URL = `${VARZESH3_API_BASE}/v1.0/football/widgets/${WIDGET_TOP_SCORERS}/latest-matches/${SEASON_IDS.laliga}`;

export const TODAYS_MATCHES_URL = `${VARZESH3_API_BASE}/v2.0/livescore/today`;

export const VIDEOS_TAG = "927733";
export const VIDEOS_TAKE = "64";
export const VIDEOS_URL = `${VARZESH3_API_BASE}/v1.0/tags/${VIDEOS_TAG}/videos?take=${VIDEOS_TAKE}`;

export const MATCH_CDN_BASE = "https://match-cdn.varzesh3.com";

// --- Display names (Persian) ---
export const LEAGUE_DISPLAY_NAMES: Record<string, string> = {
  laliga: "لالیگای اسپانیا",
  prem: "لیگ برتر انگلیس",
  seriea: "سری آ ایتالیا",
  league1: "لیگ ۱ فرانسه",
  ucl: "لیگ قهرمانان اروپا",
  bundesliga: "بوندسلیگای آلمان",
};

// --- UI Mode labels ---
export const MODE_LABELS: Record<string, string> = {
  Goal: "گل",
  Assist: "پاس‌گل",
  GA: "GA",
};

// --- Tab names ---
export const TAB_BEST_PLAYERS = "برترین‌ها";
export const TAB_VIDEOS = "ویدیو";
export const TAB_MATCHES = "برنامه بازی‌ها";
export const TAB_LEAGUES = "جدول لیگ‌ها";

// --- Route paths ---
export const ROUTE_BEST_PLAYERS = "/best-players";
export const ROUTE_VIDEOS = "/videos";
export const ROUTE_MATCHES = "/matches";
export const ROUTE_LEAGUES = "/leagues";

export const TAB_TO_ROUTE: Record<string, string> = {
  [TAB_BEST_PLAYERS]: ROUTE_BEST_PLAYERS,
  [TAB_VIDEOS]: ROUTE_VIDEOS,
  [TAB_MATCHES]: ROUTE_MATCHES,
  [TAB_LEAGUES]: ROUTE_LEAGUES,
};

export const ROUTE_TO_TAB: Record<string, string> = {
  [ROUTE_BEST_PLAYERS]: TAB_BEST_PLAYERS,
  [ROUTE_VIDEOS]: TAB_VIDEOS,
  [ROUTE_MATCHES]: TAB_MATCHES,
  [ROUTE_LEAGUES]: TAB_LEAGUES,
};

export const ALL_TABS = [TAB_BEST_PLAYERS, TAB_VIDEOS, TAB_MATCHES, TAB_LEAGUES];

// --- Video constants ---
export const MIN_VIEWS_DEFAULT = 5000;

// Persian strings used in video title cleaning
export const VIDEO_TITLE_PREFIX_TO_REMOVE = "خلاصه بازی ";
export const VIDEO_TITLE_SUFFIX_TO_REMOVE_1 = "(گزارش اختصاصی)";
export const VIDEO_TITLE_SUFFIX_TO_REMOVE_2 = "گزارش اختصاصی";
