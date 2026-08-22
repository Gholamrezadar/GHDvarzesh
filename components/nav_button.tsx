'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ALL_TABS, TAB_TO_ROUTE, ROUTE_TO_TAB } from "@/utils/varzesh3_constants";

const MENU_TRANSLATE_CLASSES = ["-translate-y-16", "-translate-y-32", "-translate-y-48"];

export default function NavButton() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const activeTab = ROUTE_TO_TAB[pathname] ?? ALL_TABS[0];
    const otherTabs = ALL_TABS.filter(t => t !== activeTab);

    return (
        <>
            {/* Active Nav Button */}
            <div className="fixed right-0 bottom-0 m-12 z-20" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="flex bg-[#7AD39E] rounded-full w-24 py-4 text-center items-center justify-center text-black text-sm big-green-glow cursor-pointer">
                    {activeTab}
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
                            <div className="flex bg-[#212B25] rounded-full w-24 py-4 text-center items-center justify-center text-[#7AD39E]/70 text-sm cursor-pointer">
                                {tab}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
