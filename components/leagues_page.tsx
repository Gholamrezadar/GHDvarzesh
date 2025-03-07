import { convertToLeagueItem, getLeagueStandings, LeagueItemInterface } from "@/utils/varzesh3";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

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
          !loading && standings.map((team, i) => (
            <div key={i.toString() + team.name} className="w-full px-4">
              <div>#{team.rank} | {team.name} | {team.played} | {team.goalDiff} | {team.points}</div>
            </div>
          ))
        }
        {/* Spacer */}
        <div className="w-full h-36"></div>

      </div>
    </div>
  )
}