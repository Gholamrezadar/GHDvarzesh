'use client'

import NavButton from "@/components/nav_button";
import PlayerItem, { PlayerItemInterface } from "@/components/player_item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"
import { convertToPlayerItem, getTopPlayers } from "@/utils/varzesh3";
import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useEffect, useState } from "react";

// const fakeDataGoal: PlayerItemInterface[] = [
//   {
//     name: "رابرت لواندوفسکی",
//     team: "بارسلونا",
//     number: 18,
//     medal: "Gold",
//     pic: "https://match-cdn.varzesh3.com/football-player/2022/06/22/C/0fikzp0b.jpg"
//   },
//   {
//     name: "رافینیا",
//     team: "بارسلونا",
//     number: 17,
//     medal: "Silver",
//     pic: "https://match-cdn.varzesh3.com/football-player/2022/02/13/B/yfkcig2w.jpg"
//   },
//   {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 16,
//     medal: "Bronze",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   }
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 11,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 10,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 8,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 4,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   }, {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 3,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 2,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 1,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
// ];

// const fakeDataAssist: PlayerItemInterface[] = [
//   {
//     name: "رافینیا",
//     team: "بارسلونا",
//     number: 16,
//     medal: "Silver",
//     pic: "https://match-cdn.varzesh3.com/football-player/2022/02/13/B/yfkcig2w.jpg"
//   },
//   {
//     name: "رابرت لواندوفسکی",
//     team: "بارسلونا",
//     number: 14,
//     medal: "Silver",
//     pic: "https://match-cdn.varzesh3.com/football-player/2022/06/22/C/0fikzp0b.jpg"
//   },
//   {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 11,
//     medal: "Bronze",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   }
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 11,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 10,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 8,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 4,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   }, {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 3,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 2,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
//   , {
//     name: "لامین یامال",
//     team: "بارسلونا",
//     number: 1,
//     medal: "",
//     pic: "https://match-cdn.varzesh3.com/football-player/2024/03/13/B/ks0eukbh.jpg"
//   },
// ];


function Spinner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // wait for 120ms before showing the spinner to avoid flashing
    const timer = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(timer); // Cleanup on unmount
  });

  return (
    <div className={`flex justify-center items-center h-full w-full ${visible ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute w-12 h-12 border-4 border-t-transparent border-[#7AD39E] rounded-full animate-spin "></div>
    </div>
  );
}

type NavOption = "برترین‌ها" | "ویدیو" | "برنامه بازی‌ها" | "جدول لیگ‌ها";

export default function Home() {
  const [mode, setMode] = useState<"Goal" | "Assist">("Goal");
  const [playersList, setPlayersList] = useState<PlayerItemInterface[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("laliga");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOptionActive, setNavOptionActive] = useState<NavOption>("برترین‌ها");
  const [navOption1, setNavOption1] = useState<NavOption>("ویدیو");
  const [navOption2, setNavOption2] = useState<NavOption>("برنامه بازی‌ها");
  const [navOption3, setNavOption3] = useState<NavOption>("جدول لیگ‌ها");

  function handleOptionChange(option: string) {
    if (option === selectedOption) {
      return;
    }
    setLoading(true);
    setSelectedOption(option);
  }

  function handleModeChange(newMode: "Goal" | "Assist") {
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
    <div className="flex flex-col items-center h-dvh w-dvw select-none">
      <div className="flex mt-8 mb-4">
        {/* shadcn ui select */}
        <Select dir="rtl" defaultValue="laliga" value={selectedOption} onValueChange={handleOptionChange}>
          <SelectTrigger className="bg-transparent text-white border-none ring-0 outline-none active:ring-0 focus:ring-0 focus:outline-none text-xl">
            <SelectValue className="focus:ring-0 focus:outline-none"></SelectValue>
          </SelectTrigger>
          <SelectContent className="outline-none focus:ring-0 focus:outline-none border-0 text-white bg-[#161a18]">
            <SelectItem value="laliga">لالیگای اسپانیا</SelectItem>
            <SelectItem value="ucl">لیگ قهرمانان اروپا</SelectItem>
            <SelectItem value="prem">لیگ برتر انگلیس</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pills: Goal/Assist mode selection */}
      <div className="flex flex-row-reverse gap-3">
        {/* Goal mode */}
        {mode === "Goal" ?
          (
            <>
              <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm" onClick={() => handleModeChange("Goal")}>گل</div>
              <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
            </>
          ) :
          (
            <>
              <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm" onClick={() => handleModeChange("Goal")}>گل</div>
              <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm" onClick={() => handleModeChange("Assist")}>پاس‌گل</div>
            </>
          )}

      </div>

      {/* scrollable list */}
      <div className="overflow-y-auto h-full w-full mt-8">
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
      
      {/* Nav Button */}
      <NavButton active={navOptionActive} option1={navOption1} option2={navOption2} option3={navOption3} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setNavOption1={setNavOption1} setNavOption2={setNavOption2} setNavOption3={setNavOption3} setNavOptionActive={setNavOptionActive} />

      {/* Black Gradient from bottom to 2/3 of the screen */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#00000000] to-[#000000FF] pointer-events-none"></div>

    </div>
  );
}
