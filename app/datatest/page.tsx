'use client'

import { convertToPlayerItem, getTopPlayers } from "@/utils/varzesh3"
import { useEffect } from "react"

export default function Home() {

    useEffect(() => {
        console.log("hello")
        async function getPlayers() {
            const data = await getTopPlayers("laliga", "Goal");
            const players = convertToPlayerItem(data);
            console.log(players);
        }
        getPlayers();
    }, [])

    return (
        <>
            <div>hello</div>
        </>
    )
}