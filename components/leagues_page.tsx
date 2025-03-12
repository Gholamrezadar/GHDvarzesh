import { convertToLeagueItem, getLeagueStandings, LeagueItemInterface } from "@/utils/varzesh3";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";


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
function LeagueTable({ standings }: { standings: LeagueItemInterface[] }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <Table dir="rtl" className="max-w-xl mx-auto">
          <TableHeader>
            <TableRow className="border-b-1 border-white/20">
              <TableHead className="text-right text-white/40">#</TableHead>
              <TableHead className="text-right text-white/40">تیم</TableHead>
              <TableHead className="text-right text-white/40">بازی</TableHead>
              <TableHead className="text-right text-white/40">تفاضل</TableHead>
              <TableHead className="text-right text-white/40">امتیاز</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              standings.map((team, i) => (
                <TableRow className="border-b-1 border-white/20" key={i.toString() + team.name}>
                  <TableCell className={`${getBorder(i)}`}>{team.rank}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell className="text-white/40">{team.played}</TableCell>
                  <TableCell className="text-white/40">{team.goalDiff}</TableCell>
                  <TableCell className="text-white">{team.points}</TableCell>
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
  const [selectedLeague, setSelectedLeague] = useState<"laliga" | "prem" | "seriea">("laliga");
  const [loading, setLoading] = useState(true);

  function handleLeagueChange(newLeague: "laliga" | "prem" | "seriea") {
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
    <div className="flex flex-col justify-center items-center w-full h-full">

      <div className="flex mt-8 mb-4">
        {/* shadcn ui select */}
        <Select dir="rtl" defaultValue="laliga" value={selectedLeague} onValueChange={handleLeagueChange}>
          <SelectTrigger className="bg-transparent text-white border-none ring-0 outline-none active:ring-0 focus:ring-0 focus:outline-none text-2xl">
            <SelectValue className="focus:ring-0 focus:outline-none"></SelectValue>
          </SelectTrigger>
          <SelectContent className="outline-none focus:ring-0 focus:outline-none border-0 text-white bg-[#161a18]">
            <SelectItem value="laliga">لالیگای اسپانیا</SelectItem>
            <SelectItem value="prem">لیگ برتر انگلیس</SelectItem>
            <SelectItem value="seriea">سری آ ایتالیا</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-y-auto h-full w-full no-scrollbar mt-8">
        {
          // !loading && standings.map((team, i) => (
          //   <div key={i.toString() + team.name} className="w-full px-4">
          //     <div>#{team.rank} | {team.name} | {team.played} | {team.goalDiff} | {team.points}</div>
          //   </div>
          // ))
        }
        {
          !loading && <LeagueTable standings={standings} />
        }
        {/* Spacer */}
        <div className="w-full h-36"></div>

      </div>
    </div>
  )
}