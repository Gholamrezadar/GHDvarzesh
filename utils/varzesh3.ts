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

export function convertToPlayerItem(data: any): PlayerItemInterface[] {
    const players: PlayerItemInterface[] = [];

    for(let row of data.topPlayers)
    {
        const number = row.goalCount;
        for(let player of row.players){
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
