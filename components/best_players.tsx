import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PlayerItem, { PlayerItemInterface } from "./player_item";
import { convertToPlayerItem, getTopPlayers } from "@/utils/varzesh3";
import LeagueSelector from "./league_selector";
import Spinner from "./spinner";

export default function BestPlayers() {
    const [mode, setMode] = useState<"Goal" | "Assist" | "GA">("Goal");
    const [playersList, setPlayersList] = useState<PlayerItemInterface[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("laliga");
    const [loading, setLoading] = useState(true);
    const playersCache = useRef(new Map<string, PlayerItemInterface[]>());
    const playerListRef = useRef<HTMLDivElement>(null);
    const previousPlayerPositions = useRef<Map<string, DOMRect> | null>(null);

    useLayoutEffect(() => {
        const list = playerListRef.current;
        const positions = previousPlayerPositions.current;
        if (!list || !positions) {
            return;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            list.querySelectorAll<HTMLElement>("[data-player-key]").forEach((element) => {
                const key = element.dataset.playerKey;
                if (!key) {
                    return;
                }

                const previousPosition = positions.get(key);
                if (!previousPosition) {
                    element.animate([{ opacity: 0 }, { opacity: 1 }], {
                        duration: 350,
                        easing: "ease-out",
                        fill: "both",
                    });
                    return;
                }

                const currentPosition = element.getBoundingClientRect();
                const offsetX = previousPosition.left - currentPosition.left;
                const offsetY = previousPosition.top - currentPosition.top;
                if (offsetX === 0 && offsetY === 0) {
                    return;
                }

                element.getAnimations().forEach((animation) => animation.cancel());
                element.animate(
                    [
                        { transform: `translate(${offsetX}px, ${offsetY}px)` },
                        { transform: "translate(0, 0)" },
                    ],
                    { duration: 350, easing: "ease-out" }
                );
            });
        });

        previousPlayerPositions.current = null;
        return () => window.cancelAnimationFrame(animationFrame);
    }, [playersList]);
    function handleOptionChange(option: string) {
        if (option === selectedOption) {
            return;
        }
        setSelectedOption(option);
    }

    function handleModeChange(newMode: "Goal" | "Assist" | "GA") {
        if (mode === newMode) {
            return;
        }
        setMode(newMode);
    }

    useEffect(() => {
        let cancelled = false;
        const cacheKey = `${selectedOption}:${mode}`;

        function updatePlayers(players: PlayerItemInterface[]) {
            const list = playerListRef.current;
            if (list) {
                previousPlayerPositions.current = new Map(
                    Array.from(list.querySelectorAll<HTMLElement>("[data-player-key]")).map((element) => [
                        element.dataset.playerKey ?? "",
                        element.getBoundingClientRect(),
                    ])
                );
            }
            setPlayersList(players);
        }

        async function getPlayers() {
            const cachedPlayers = playersCache.current.get(cacheKey);
            if (cachedPlayers) {
                updatePlayers(cachedPlayers);
                setLoading(false);
                return;
            }

            const data = await getTopPlayers(selectedOption, mode);
            if (cancelled) {
                playersCache.current.set(cacheKey, convertToPlayerItem(data));
                return;
            }
            const players = convertToPlayerItem(data);
            playersCache.current.set(cacheKey, players);
            updatePlayers(players);
            setLoading(false);
        }
        getPlayers();

        return () => {
            cancelled = true;
        };
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
            <div className="flex justify-center">
                {/* shadcn ui select */}
                <LeagueSelector value={selectedOption} onValueChange={handleOptionChange} />
            </div>

            {/* Pills: Goal/Assist mode selection */}
            <div className="mt-3 flex flex-row-reverse justify-center gap-2">
                {/* Goal mode */}
                {mode === "Goal" ?
                    (
                        <>
                            <div className="w-24 cursor-pointer rounded-full bg-[#7AD39E] py-2 text-center text-sm text-black transition-colors hover:bg-[#91e0ad]" onClick={() => handleModeChange("Goal")}>گل</div>
                            <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                            <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ) :
                    (<></>)}


                {mode === "Assist" ?
                    
                    (
                        <>
                        <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("Goal")}>گل</div>
                        <div className="w-24 cursor-pointer rounded-full bg-[#7AD39E] py-2 text-center text-sm text-black transition-colors hover:bg-[#91e0ad]" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                        <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ):
                    (<></>)}
                
                {mode === "GA" ?
                    
                    (
                        <>
                        <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("Goal")}>گل</div>
                        <div className="w-24 cursor-pointer rounded-full bg-[#212A25] py-2 text-center text-sm text-[#61A27B] transition-colors hover:bg-[#2a3830]" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
                        <div className="w-24 cursor-pointer rounded-full bg-[#7AD39E] py-2 text-center text-sm text-black transition-colors hover:bg-[#91e0ad]" onClick={() => handleModeChange("GA")}>GA</div>
                        </>
                    ):
                    (<></>)}

            </div>

            {/* scrollable list */}
            <div ref={playerListRef} className="relative mx-auto mt-8 min-h-40 flex-1 w-full sm:max-w-lg">
                {loading && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-8">
                        <Spinner />
                    </div>
                )}

                <div className={`transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}>
                    {playersList.map((player, i) => (
                        <div key={player.name} data-player-key={player.name}>
                            <PlayerItem name={player.name} team={player.team} number={player.number} medal={getMedal(i)} pic={player.pic} />
                        </div>
                    ))}

                    {/* empty space to move the last player higher */}
                    {!loading && <div className="h-24 w-full" />}
                </div>
            </div>


        </div>
    );
}
