import { PlayerItemInterface } from "@/components/player_item";

export async function getTopPlayers(league: string, mode: "Goal" | "Assist") {
    // a map of league names to api urls
    const leagueGoalMap = {
        "laliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900795",
        "prem": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900794",
        "ucl": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-scorers/900825",
    };

    const leagueAssistMap = {
        "laliga": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900795",
        "prem": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900794",
        "ucl": "https://web-api.varzesh3.com/v1.0/football/widgets/115/top-assisters/900825",
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
    const response = await fetch("https://web-api.varzesh3.com/v1.0/football/widgets/115/latest-matches/900795");
    const data = await response.json();
    return data;
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
    const parenIndex = str.indexOf("(");
    if (parenIndex !== -1) {
        str = str.slice(0, parenIndex).trim();
    }

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
