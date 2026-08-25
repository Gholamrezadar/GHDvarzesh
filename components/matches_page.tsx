import { convertToMatchItem, getTodaysMatches, MatchItemInterface } from "@/utils/varzesh3";
import { useEffect, useState } from "react";
import { Filter, Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Spinner from "./spinner";

const FILTER_COLORS = [
  "border-[#7AD39E]/35 bg-[#7AD39E]/10 text-[#b9e8c9]",
  "border-[#7AB8D3]/35 bg-[#7AB8D3]/10 text-[#b9dce8]",
  "border-[#A78BD3]/35 bg-[#A78BD3]/10 text-[#d0c3e8]",
  "border-[#D3A27A]/35 bg-[#D3A27A]/10 text-[#ead0b9]",
  "border-[#D3C27A]/35 bg-[#D3C27A]/10 text-[#eae0b9]",
  "border-[#D37A86]/35 bg-[#D37A86]/10 text-[#eab9bf]",
];

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
  const [filterOpen, setFilterOpen] = useState(false);
  const [teamInput, setTeamInput] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

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

  useEffect(() => {
    if (!filterOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFilterOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [filterOpen]);

  function addTeam() {
    const team = teamInput.trim();
    if (!team || selectedTeams.includes(team)) {
      return;
    }

    setSelectedTeams((teams) => [...teams, team]);
    setTeamInput("");
  }

  function removeTeam(teamToRemove: string) {
    setSelectedTeams((teams) => teams.filter((team) => team !== teamToRemove));
  }

  function clearAllTeams() {
    setSelectedTeams([]);
    setTeamInput("");
  }

  function matchesSelectedTeam(teamName: string) {
    const normalizedTeamName = teamName.trim().toLocaleLowerCase();
    return selectedTeams.some((team) =>
      normalizedTeamName.includes(team.toLocaleLowerCase())
    );
  }

  const filteredMatches = selectedTeams.length === 0
    ? matches
    : matches.filter((match) =>
        matchesSelectedTeam(match.host) ||
        matchesSelectedTeam(match.guest) ||
        matchesSelectedTeam(match.league)
      );

  return (
    <div className="flex w-full flex-col items-center">
      {loading && <Spinner />}
      <div className="mt-8 flex w-full flex-row-reverse items-center justify-center gap-3 px-4">
        <h1 className="text-2xl text-white">بازی‌های امروز</h1>
        <button
          type="button"
          aria-label="فیلتر تیم و لیگ"
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen(true)}
          className="relative flex h-8 items-center gap-1.5 rounded-xl border border-[#7AD39E]/30 bg-[#212A25] px-3 text-xs text-[#7AD39E] transition-colors hover:border-[#7AD39E] hover:bg-[#28372e]"
        >
          <Filter className="size-3.5" />
          <span>فیلتر</span>
          {selectedTeams.length > 0 && (
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#7AD39E] text-[10px] font-bold text-[#121416]">
              {selectedTeams.length}
            </span>
          )}
        </button>
      </div>
      <div className="w-full mt-8">

        {!loading && filteredMatches.length > 0 && <MatchesTable matches={filteredMatches} />}
        {!loading && filteredMatches.length === 0 && (
          <div className="px-4 text-center text-sm text-white/50">
            بازی‌ای برای تیم‌های انتخاب‌شده پیدا نشد
          </div>
        )}

        {/* Spacer */}
        <div className="w-full h-36"></div>

      </div>

      {filterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-6 pt-16 backdrop-blur-sm sm:items-center"
          onClick={() => setFilterOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="matches-filter-title"
            dir="rtl"
            onClick={(event) => event.stopPropagation()}
            className="flex h-[60dvh] min-h-0 max-h-[60dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121416] p-5 text-white shadow-2xl shadow-black/50"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="matches-filter-title" className="text-xl font-semibold">فیلتر تیم و لیگ</h2>
                <p className="mt-1 text-sm text-white/45">نام تیم یا لیگی که می‌خواهید ببینید اضافه کنید</p>
              </div>
              <button
                type="button"
                aria-label="بستن فیلتر"
                onClick={() => setFilterOpen(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                autoFocus
                value={teamInput}
                onChange={(event) => setTeamInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTeam();
                  }
                }}
                placeholder="مثلا رئال مادرید یا لالیگا"
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#212A25] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#7AD39E]/70 focus:ring-2 focus:ring-[#7AD39E]/10"
              />
              <button
                type="button"
                onClick={addTeam}
                aria-label="افزودن تیم"
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#7AD39E] text-[#121416] transition-transform hover:scale-105 active:scale-95"
              >
                <Plus className="size-5" />
              </button>
            </div>

            {selectedTeams.length > 0 && (
              <button
                type="button"
                onClick={clearAllTeams}
                className="mt-3 self-center text-sm text-[#7AD39E]/75 transition-colors hover:text-[#7AD39E]"
              >
                پاک کردن همه
              </button>
            )}

            <div dir="ltr" className="scrollbar-on-hover mt-5 min-h-10 flex-1 overflow-y-auto">
              <div dir="rtl" className="flex flex-col gap-2">
              {selectedTeams.length === 0 ? (
                <p className="w-full text-center text-sm text-white/35">هنوز تیمی انتخاب نشده</p>
              ) : (
                selectedTeams.map((team, index) => (
                  <div key={team} className={`flex w-full items-center justify-between gap-2 rounded-2xl border py-2 pl-2 pr-3 text-sm ${FILTER_COLORS[index % FILTER_COLORS.length]}`}>
                    <span>{team}</span>
                    <button
                      type="button"
                      aria-label={`حذف ${team}`}
                      onClick={() => removeTeam(team)}
                      className="flex size-6 items-center justify-center rounded-full text-current opacity-70 transition-colors hover:bg-white/10 hover:opacity-100"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))
              )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
