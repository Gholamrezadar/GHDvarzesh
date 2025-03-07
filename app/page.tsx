'use client'

import BestPlayers from "@/components/best_players";
import LeaguesPage from "@/components/leagues_page";
import MatchesPage from "@/components/matches_page";
import NavButton from "@/components/nav_button";
import Spinner from "@/components/spinner";
import VideoPage from "@/components/video_page";
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

type NavOption = "برترین‌ها" | "ویدیو" | "برنامه بازی‌ها" | "جدول لیگ‌ها";


export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [navOptionActive, setNavOptionActive] = useState<NavOption>("برترین‌ها");
  const [navOption1, setNavOption1] = useState<NavOption>("ویدیو");
  const [navOption2, setNavOption2] = useState<NavOption>("برنامه بازی‌ها");
  const [navOption3, setNavOption3] = useState<NavOption>("جدول لیگ‌ها");

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw max-w-3xl mx-auto select-none">

      {/* Routing */}
      {navOptionActive === "برترین‌ها" && <BestPlayers />}
      {navOptionActive === "ویدیو" && <VideoPage />}
      {navOptionActive === "برنامه بازی‌ها" && <MatchesPage />}
      {navOptionActive === "جدول لیگ‌ها" && <LeaguesPage />}

      {/* Nav Button */}
      <NavButton active={navOptionActive} option1={navOption1} option2={navOption2} option3={navOption3} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setNavOption1={setNavOption1} setNavOption2={setNavOption2} setNavOption3={setNavOption3} setNavOptionActive={setNavOptionActive} />

      {/* Black Gradient from bottom to 2/3 of the screen */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#00000000] to-[#000000FF] pointer-events-none"></div>
    </div>
  );
}
