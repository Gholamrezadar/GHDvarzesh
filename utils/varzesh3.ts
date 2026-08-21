import { PlayerItemInterface } from "@/components/player_item";
import { MIN_VIEWS_DEFAULT, VIDEO_TITLE_PREFIX_TO_REMOVE, VIDEO_TITLE_SUFFIX_TO_REMOVE_1, VIDEO_TITLE_SUFFIX_TO_REMOVE_2 } from "./varzesh3_constants";

export async function getTopPlayersNew(league: string, mode: "Goal" | "Assist" | "GA") {
    const response = await fetch("/api/player-stats");
    const data = await response.json();

    return data;
}

export async function getTopPlayers(league: string, mode: "Goal" | "Assist" | "GA") {
    const url = `/api/top-players?league=${encodeURIComponent(league)}&mode=${encodeURIComponent(mode)}`;
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
    const response = await fetch("/api/latest-matches");
    const data = await response.json();
    return data;
}

export async function getLeagueStandings(league: string) {
    const url = `/api/league-standings?league=${encodeURIComponent(league)}`;
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
    if (str.toLowerCase().startsWith(VIDEO_TITLE_PREFIX_TO_REMOVE)) {
        str = str.slice(11);
    }

    str = str.replace(VIDEO_TITLE_SUFFIX_TO_REMOVE_1, "");
    str = str.replace(VIDEO_TITLE_SUFFIX_TO_REMOVE_2, "");

    return str;
}


// Minimum views required for a video to be included in the list
const MIN_VIEWS = MIN_VIEWS_DEFAULT;

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

export function convertToPlayerItemNew(data: any): PlayerItemInterface[] {
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
