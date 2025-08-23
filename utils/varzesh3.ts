import { PlayerItemInterface } from "@/components/player_item";

export async function getTopPlayers(league: string, mode: "Goal" | "Assist" | "GA") {
    // use this later, it has goals, assists, ga, and other stats for a league in one request and is more complete
    // https://web-api.varzesh3.com/v2.0/football/leagues/3/seasons/900911/stats/players/advanced/assists
    // a map of league names to api urls
    const leagueGoalMap = {
        "laliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900921",
        "prem": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900911",
        "league1": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900913",
        "ucl": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900825",
        "seria": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900817",
        "bundesliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900912",
    };

    const leagueAssistMap = {
        "laliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900921",
        "prem": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900911",
        "league1": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900913",
        "ucl": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900825",
        "seriea": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900817",
        "bundesliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900912",
    };

    const url = mode === "Goal" ? leagueGoalMap[league] : leagueAssistMap[league];

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export async function getLatestVideos() {
    const response = await fetch("/api/videos");
    const data = await response.json();
    return data;
}

export async function getLatestMatches() {
    const response = await fetch("https://web-api.varzesh3.com/v1.0/football/widgets/115/latest-matches/900921");
    const data = await response.json();
    return data;
}

export async function getLeagueStandings(league: string) {
    const leagueStandingMap = {
        "laliga": "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902965",
        "prem": "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902953",
        "seriea": "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902645",
        "league1": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900913",
        "ucl": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900825",
        "bundesliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900912",
    }
    const laligaUrl = "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902965";
    const premUrl = "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902953";
    const serieaUrl = "https://web-api.varzesh3.com/v1.0/football/widgets/84/league/902645";

    const url = leagueStandingMap[league];
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export interface LeagueItemInterface {
    name: string;
    played: number;
    points: number;
    goalDiff: number;
    rank: number;
}

export function convertToLeagueItem(data: any): LeagueItemInterface[] {
    const leagues: LeagueItemInterface[] = [];

    for (let row of data.standing.teams) {
        leagues.push({
            name: row.name,
            rank: row.rank,
            played: row.played,
            goalDiff: row.goalDifference,
            points: row.points,
        })
    }
    return leagues;
}

export interface VideoItemInterface {
    title: string;
    url: string;
    cover: string;
    views: number;
    human_readable_views: string;
}

function cleanString(str: string) {
    if (str.toLowerCase().startsWith("خلاصه بازی ")) {
        str = str.slice(11);
    }

    // Find the position of '(' and remove everything from there
    // const parenIndex = str.indexOf("(");
    // if (parenIndex !== -1) {
    //     str = str.slice(0, parenIndex).trim();
    // }

    // remove a string from another string
    str = str.replace("(گزارش اختصاصی)", "");
    str = str.replace("گزارش اختصاصی", "");

    return str;
}


// Minimum views required for a video to be included in the list
const MIN_VIEWS = 5000;

export function convertToVideoItem(data: any, min_views: number): VideoItemInterface[] {
    const videos: VideoItemInterface[] = [];

    for (let row of data.items) {
        if (row.viewCount >= min_views) {

            const trimmedTitle = cleanString(row.title);
            videos.push({
                title: trimmedTitle,
                url: row.link,
                cover: row.cover,
                views: row.viewCount,
                human_readable_views: row.viewCountHumanReadable,
            })
        }
    }
    return videos;
}

export function convertToPlayerItem(data: any): PlayerItemInterface[] {
    const players: PlayerItemInterface[] = [];

    for (let row of data.topPlayers) {
        const number = row.goalCount;
        for (let player of row.players) {
            players.push({
                name: player.name,
                team: player.teamName,
                number: number,
                medal: "",
                pic: player.portrait
            })
        }
    }
    return players;
}


export async function getTodaysMatches() {
    // const url = "https://web-api.varzesh3.com/v2.0/livescore/today"
    const url = "/api/today_matches"
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export interface MatchItemInterface {
    league: string;
    date: string;
    time: string;
    host: string;
    guest: string;
}

export function convertToMatchItem(data: any): MatchItemInterface[] {
    const matches: MatchItemInterface[] = [];

    for (let row of data) {
        const leagueName = row.title;
        const date = row.dates[0].date;
        for(let match of row.dates[0].matches) {
            matches.push({
                league: leagueName,
                date: date,
                time: match.time,
                host: match.host.name,
                guest: match.guest.name,
            })
        }
    }


    return matches;
}