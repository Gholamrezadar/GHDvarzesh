'use client'

import { convertToPlayerItem, getTopPlayersNew } from "@/utils/varzesh3"
import { useEffect } from "react"

export default function Home() {

    useEffect(() => {
        console.log("hello")
        async function getPlayers() {
            const data = await getTopPlayersNew("laliga", "Goal");
            // const players = convertToPlayerItem(data);
            const players = data.players;
            for(let player of players) {
                console.log("name: ", player.name);
                console.log("goals: ", player.goals);
                console.log("assists: ", player.assists);
                console.log("goalsAndAssists: ", player.goalsAndAssists);
                console.log("teamName: ", player.teamName);
                console.log("portrait: ", player.portrait);
            }
            // console.log(data);
        }
        getPlayers();
    }, [])

    return (
        <>
            <div>hello ga</div>
        </>
    )
}