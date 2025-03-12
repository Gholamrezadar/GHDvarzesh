import { convertToMatchItem, getTodaysMatches, MatchItemInterface } from "@/utils/varzesh3";
import { useEffect, useState } from "react";
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

function MatchesTable({ matches }: { matches: MatchItemInterface[] }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <Table dir="rtl" className="max-w-xl mx-auto">
          <TableHeader>
            <TableRow className="border-b-1 border-white/20">
              <TableHead className="text-right text-white/40">تاریخ</TableHead>
              <TableHead className="text-right text-white/40">لیگ</TableHead>
              <TableHead className="text-right text-white/40">میزبان</TableHead>
              <TableHead className="text-right text-white/40">میهمان</TableHead>
              <TableHead className="text-right text-white/40">زمان</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              matches.map((match, i) => (
                <TableRow className="border-b-1 border-white/20" key={i.toString() + match.league + match.date + match.time + match.host + match.guest}>
                  <TableCell className="">{match.date}</TableCell>
                  <TableCell className="">{match.league}</TableCell>
                  <TableCell className="">{match.host}</TableCell>
                  <TableCell className="">{match.guest}</TableCell>
                  <TableCell className="">{match.time}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>

        </Table>
        </div>
</>
)}
export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItemInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMatches() {
      setLoading(true);
      const data = await getTodaysMatches();
      const matches = convertToMatchItem(data);
      setMatches(matches);
      setLoading(false);
    }
    getMatches();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  w-full h-full">
      <h1 className="text-white text-2xl mt-8">بازی‌های امروز</h1>
      <div className="overflow-y-auto h-full w-full no-scrollbar mt-8">

        {/* {!loading && matches.map((match, i) => (
          <div key={i.toString() + match.league + match.date + match.time + match.host + match.guest} className="w-full px-4">
            <div className="text-white text-2xl">#{match.league} | {match.date} | {match.time} | {match.host} | {match.guest}</div>
          </div>
        ))} */}
        {!loading && <MatchesTable matches={matches} />}

        {/* Spacer */}
        <div className="w-full h-36"></div>

      </div>
    </div>
  )
}