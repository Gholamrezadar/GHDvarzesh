'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarDays, Table2, Trophy, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ALL_TABS, TAB_TO_ROUTE, ROUTE_TO_TAB, TAB_BEST_PLAYERS, TAB_LEAGUES, TAB_MATCHES, TAB_VIDEOS } from "@/utils/varzesh3_constants";

const MENU_TRANSLATE_CLASSES = ["-translate-y-16", "-translate-y-32", "-translate-y-48"];
const TAB_ICONS: Record<string, LucideIcon> = {
    [TAB_MATCHES]: CalendarDays,
    [TAB_LEAGUES]: Table2,
    [TAB_BEST_PLAYERS]: Trophy,
    [TAB_VIDEOS]: Video,
};

export default function NavButton() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const activeTab = ROUTE_TO_TAB[pathname] ?? ALL_TABS[0];
    const otherTabs = ALL_TABS.filter(t => t !== activeTab);
    const ActiveIcon = TAB_ICONS[activeTab];

    return (
        <>
            {/* Active Nav Button */}
            <div className="fixed right-0 bottom-0 m-12 z-20" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="flex w-28 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#7AD39E] px-3 py-4 text-center text-sm text-black big-green-glow">
                    <span className="whitespace-nowrap">{activeTab}</span>
                    <ActiveIcon className="size-4 shrink-0" />
                </div>
            </div>
            {/* Other Nav Buttons */}
            <div>
                {otherTabs.map((tab, i) => (
                    <div
                        key={tab}
                        className={`fixed right-0 bottom-0 m-12 z-10 transition-all ease-in-out ${menuOpen ? MENU_TRANSLATE_CLASSES[i] : "-translate-y-0"}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <Link href={TAB_TO_ROUTE[tab]}>
                            <div className="flex w-28 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#212B25] px-3 py-4 text-center text-sm text-[#7AD39E]/70">
                                {(() => {
                                    const Icon = TAB_ICONS[tab];
                                    return <><span className="whitespace-nowrap">{tab}</span><Icon className="size-4 shrink-0" /></>;
                                })()}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
