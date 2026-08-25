import { useEffect, useState } from "react";
import PlayerItem, { PlayerItemInterface } from "./player_item";
import { convertToPlayerItem, getTopPlayers } from "@/utils/varzesh3";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Spinner from "./spinner";
import { LEAGUE_DISPLAY_NAMES } from "@/utils/varzesh3_constants";

export default function BestPlayers() {
    const [mode, setMode] = useState<"Goal" | "Assist" | "GA">("Goal");
    const [playersList, setPlayersList] = useState<PlayerItemInterface[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("laliga");
    const [loading, setLoading] = useState(true);
    function handleOptionChange(option: string) {
        if (option === selectedOption) {
            return;
        }
        setLoading(true);
        setSelectedOption(option);
    }

    function handleModeChange(newMode: "Goal" | "Assist" | "GA") {
        if (mode === newMode) {
            return;
        }
        setLoading(true);
        setMode(newMode);
    }

    useEffect(() => {
        async function getPlayers() {
            const data = await getTopPlayers(selectedOption, mode);
            const players = convertToPlayerItem(data);
            setPlayersList(players);
            setLoading(false);
        }
        getPlayers();
    }, [selectedOption, mode]);

    function getMedal(i: number): "" | "Gold" | "Silver" | "Bronze" {
        if (i === 0) {
            return "Gold";
        } else if (i === 1) {
            return "Silver";
        } else if (i === 2) {
            return "Bronze";
        } else {
            return "";
        }
    }
    return (
        <div className="mt-8 flex w-full flex-col px-4">
            <div className="flex justify-center mb-4">
                {/* shadcn ui select */}
                <Select dir="rtl" defaultValue="laliga" value={selectedOption} onValueChange={handleOptionChange}>
                    <SelectTrigger className="bg-transparent text-white border-none ring-0 outline-none active:ring-0 focus:ring-0 focus:outline-none text-2xl">
                        <SelectValue className="focus:ring-0 focus:outline-none"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="outline-none focus:ring-0 focus:outline-none border-0 text-white bg-[#161a18]">
                        <SelectItem value="laliga">{LEAGUE_DISPLAY_NAMES.laliga}</SelectItem>
                        <SelectItem value="ucl">{LEAGUE_DISPLAY_NAMES.ucl}</SelectItem>
                        <SelectItem value="prem">{LEAGUE_DISPLAY_NAMES.prem}</SelectItem>
                        <SelectItem value="seriea">{LEAGUE_DISPLAY_NAMES.seriea}</SelectItem>
                        <SelectItem value="league1">{LEAGUE_DISPLAY_NAMES.league1}</SelectItem>
                        <SelectItem value="bundesliga">{LEAGUE_DISPLAY_NAMES.bundesliga}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pills: Goal/Assist mode selection */}
            <div className="flex flex-row-reverse justify-center gap-3">
                {/* Goal mode */}
                {mode === "Goal" ?
                    (
                        <>
                            <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm" onClick={() => handleModeChange("Goal")}>گل</div>
                            <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                            <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ) :
                    (<></>)}


                {mode === "Assist" ?
                    
                    (
                        <>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Goal")}>گل</div>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ):
                    (<></>)}
                
                {mode === "GA" ?
                    
                    (
                        <>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Goal")}>گل</div>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ):
                    (<></>)}

            </div>

            {/* scrollable list */}
            <div className="flex-1 w-full">
                {/* Spinner */}
                {loading && <Spinner />}

                {/* Players */}
                {
                    !loading && playersList.map((player, i) => (
                        <PlayerItem key={i.toString() + player.name} name={player.name} team={player.team} number={player.number} medal={getMedal(i)} pic={player.pic} />
                    )
                    )
                }

                {/* empty space to move the last player higher */}
                {!loading && (
                    <div className="w-full h-24">
                    </div>
                )}
            </div>


        </div>
    );
}
