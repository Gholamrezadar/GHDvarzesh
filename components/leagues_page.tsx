import { convertToLeagueItem, getLeagueStandings, LeagueItemInterface } from "@/utils/varzesh3";
import LeagueSelector from "./league_selector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Spinner from "./spinner";
import { useEffect, useState } from "react";
import { LEAGUE_DISPLAY_NAMES, STANDING_LEAGUE_IDS } from "@/utils/varzesh3_constants";

const LEAGUE_OPTIONS = Object.keys(STANDING_LEAGUE_IDS) as Array<keyof typeof LEAGUE_DISPLAY_NAMES>;


function getBorder(i: number) {
  if (i === 0 ) {
    return "border-r-4 border-[#D7C17E]";
  } else if (i === 1) {
    return "border-r-4 border-gray-400";
  } else if (i === 2) {
    return "border-r-4 border-[#84654F]";
  } else {
    return "border-none"
  }
}

function getRowBackground(i: number) {
  if (i === 0) {
    return "bg-[#252521] hover:bg-[#2f2e26]";
  } else if (i === 1) {
    return "bg-[#1f2225] hover:bg-[#26292d]";
  } else if (i === 2) {
    return "bg-[#24211f] hover:bg-[#2c2723]";
  }

  return "bg-[#1b241f] hover:bg-[#243229]";
}

function getRankColor(i: number) {
  if (i === 0) {
    return "text-[#D7C17E]";
  } else if (i === 1) {
    return "text-gray-400";
  } else if (i === 2) {
    return "text-[#84654F]";
  }

  return "text-white/70";
}

function LeagueTable({ standings }: { standings: LeagueItemInterface[] }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <Table dir="rtl" className="mx-auto max-w-xl border-separate border-spacing-y-1 px-3">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">#</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">تیم</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">بازی</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">تفاضل</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">امتیاز</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              standings.map((team, i) => (
                <TableRow className={`border-0 transition-colors ${getRowBackground(i)}`} key={i.toString() + team.name}>
                  <TableCell className={`border-0 px-3 py-2.5 font-bold first:rounded-r-xl ${getBorder(i)} ${getRankColor(i)}`}>{team.rank}</TableCell>
                  <TableCell className="border-0 px-3 py-2.5 font-medium text-white">{team.name}</TableCell>
                  <TableCell className="border-0 px-3 py-2.5 text-sm text-white/50">{team.played}</TableCell>
                  <TableCell className="border-0 px-3 py-2.5 text-sm text-white/50">{team.goalDiff}</TableCell>
                  <TableCell className="border-0 px-3 py-2.5 font-semibold text-white/75 last:rounded-l-xl">{team.points}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>

        </Table>

        {/* Header */}
        {/* <div className="w-full flex flex-row-reverse justify-center items-center"> */}
        {/* <div className="text-white text-2xl">#</div>
          <div className="text-white text-2xl">نام</div>
          <div className="text-white text-2xl">بازی</div>
          <div className="text-white text-2xl">تفاضل</div>
          <div className="text-white text-2xl">امتیاز</div>
        </div> */}

        {/* Body */}

        {
          // standings.map((team, i) => (
          //   <div key={i.toString() + team.name} className="w-full flex flex-row-reverse justify-center items-center">
          //     {/* <div>#{team.rank} | {team.name} | {team.played} | {team.goalDiff} | {team.points}</div> */}

          //     <div>#{team.rank}</div>
          //     <div>{team.name}</div>
          //     <div>{team.played}</div>
          //     <div>{team.goalDiff}</div>
          //     <div>{team.points}</div>
          //   </div>
          // ))
        }

      </div>
    </>
  )
}

export default function LeaguesPage() {
  const [standings, setStandings] = useState<LeagueItemInterface[]>([]);
  const [selectedLeague, setSelectedLeague] = useState(LEAGUE_OPTIONS[0]);
  const [loading, setLoading] = useState(true);

  function handleLeagueChange(newLeague: string) {
    setSelectedLeague(newLeague);
  }

  useEffect(() => {
    async function getStandings() {
      setLoading(true);
      const data = await getLeagueStandings(selectedLeague);
      const leagues = convertToLeagueItem(data);
      setStandings(leagues);
      setLoading(false);
    }
    getStandings();
  }, [selectedLeague]);

  return (
    <div className="flex w-full flex-col items-center">

      {loading && (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <div className="flex justify-center mt-8 mb-4">
        {/* shadcn ui select */}
        <LeagueSelector
          value={selectedLeague}
          onValueChange={handleLeagueChange}
          options={LEAGUE_OPTIONS}
        />
      </div>

      <div className="w-full mt-8">
        {!loading && <LeagueTable standings={standings} />}
        {/* Spacer */}
        <div className="w-full h-36"></div>

      </div>
    </div>
  )
}
