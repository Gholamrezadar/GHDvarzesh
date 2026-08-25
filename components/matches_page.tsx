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
import {
  loadMatchFilterPreferences,
  saveMatchFilterPreferences,
} from "@/services/match-filter-storage.service";

const FILTER_COLORS = [
  "border-[#7AD39E]/35 bg-[#7AD39E]/10 text-[#b9e8c9]",
  "border-[#7AB8D3]/35 bg-[#7AB8D3]/10 text-[#b9dce8]",
  "border-[#A78BD3]/35 bg-[#A78BD3]/10 text-[#d0c3e8]",
  "border-[#D3A27A]/35 bg-[#D3A27A]/10 text-[#ead0b9]",
  "border-[#D3C27A]/35 bg-[#D3C27A]/10 text-[#eae0b9]",
  "border-[#D37A86]/35 bg-[#D37A86]/10 text-[#eab9bf]",
];

function formatCountdown(startOnUtc: string, now: number) {
  const difference = Math.max(0, new Date(startOnUtc).getTime() - now);
  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const time = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return days > 0 ? `${days}d ${time}` : time;
}

function AddFilterButton({
  value,
  onAddFilter,
  className,
  children,
}: {
  value: string;
  onAddFilter: (value: string) => void;
  className: string;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onAddFilter(value)}
      className={`group relative cursor-pointer ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#7AD39E]/25 bg-[#121416] px-2.5 py-1.5 text-[11px] font-normal text-[#b9e8c9] opacity-0 shadow-lg shadow-black/30 transition-opacity group-hover:opacity-100">
        افزودن به فیلتر
      </span>
    </button>
  );
}

function MatchesTable({
  matches,
  onAddFilter,
}: {
  matches: MatchItemInterface[];
  onAddFilter: (value: string) => void;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <Table dir="rtl" className="mx-auto w-[90%] max-w-xl border-separate border-spacing-y-2 px-3 sm:w-full">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="hidden px-3 pb-1 text-right text-xs font-normal text-white/35 sm:table-cell">تاریخ</TableHead>
              <TableHead className="hidden px-3 pb-1 text-right text-xs font-normal text-white/35 sm:table-cell">لیگ</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">میزبان</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">میهمان</TableHead>
              <TableHead className="px-3 pb-1 text-right text-xs font-normal text-white/35">زمان</TableHead>
              <TableHead className="hidden px-3 pb-1 text-right text-xs font-normal text-white/35 sm:table-cell">تا شروع</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              matches.map((match, i) => (
                <TableRow className="border-0 bg-[#1b241f] transition-colors hover:bg-[#243229]" key={i.toString() + match.league + match.date + match.time + match.host + match.guest}>
                  <TableCell className="hidden border-0 px-3 py-4 text-sm text-white/55 first:rounded-r-2xl sm:table-cell">{match.date}</TableCell>
                  <TableCell className="hidden border-0 px-3 py-4 text-xs text-[#a9e0bd] sm:table-cell"><AddFilterButton value={match.league} onAddFilter={onAddFilter} className="rounded-full bg-[#7AD39E]/10 px-2 py-1 transition-colors hover:bg-[#7AD39E]/20">{match.league}</AddFilterButton></TableCell>
                  <TableCell className="rounded-r-2xl border-0 px-3 py-4 font-medium text-white sm:rounded-r-none"><AddFilterButton value={match.host} onAddFilter={onAddFilter} className="transition-colors hover:text-[#7AD39E]">{match.host}</AddFilterButton></TableCell>
                  <TableCell className="border-0 px-3 py-4 font-medium text-white"><AddFilterButton value={match.guest} onAddFilter={onAddFilter} className="transition-colors hover:text-[#7AD39E]">{match.guest}</AddFilterButton></TableCell>
                  <TableCell className="rounded-l-2xl border-0 px-3 py-4 text-sm font-semibold text-[#7AD39E] sm:rounded-l-none">{match.time}</TableCell>
                  <TableCell className="hidden border-0 px-3 py-4 text-sm text-white/55 last:rounded-l-2xl sm:table-cell">{formatCountdown(match.startOnUtc, now)}</TableCell>
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
  const [filtersActive, setFiltersActive] = useState(true);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const preferences = loadMatchFilterPreferences();
    setSelectedTeams(preferences.selectedFilters);
    setFiltersActive(preferences.isActive);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) {
      return;
    }

    saveMatchFilterPreferences({
      selectedFilters: selectedTeams,
      isActive: filtersActive,
    });
  }, [filtersActive, preferencesLoaded, selectedTeams]);

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

  function addFilter(value: string) {
    const filter = value.trim();
    if (!filter || selectedTeams.includes(filter)) {
      return;
    }

    setSelectedTeams((teams) => [...teams, filter]);
  }

  function addTeam() {
    addFilter(teamInput);
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
    : !filtersActive
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
          aria-pressed={filtersActive}
          onClick={() => setFilterOpen(true)}
          className={`relative flex h-8 cursor-pointer items-center gap-1.5 rounded-xl border px-3 text-xs transition-colors ${filtersActive ? "border-[#7AD39E]/30 bg-[#212A25] text-[#7AD39E] hover:border-[#7AD39E] hover:bg-[#28372e]" : "border-white/10 bg-white/5 text-white/35 hover:border-white/20 hover:bg-white/10"}`}
        >
          <Filter className="size-3.5" />
          <span>فیلتر</span>
          {filtersActive && selectedTeams.length > 0 && (
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[#7AD39E] text-[10px] font-bold text-[#121416]">
              {selectedTeams.length}
            </span>
          )}
        </button>
      </div>
      <div className="w-full mt-8">

        {!loading && filteredMatches.length > 0 && <MatchesTable matches={filteredMatches} onAddFilter={addFilter} />}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
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
                <div className="flex items-center gap-2">
                  <h2 id="matches-filter-title" className="text-xl font-semibold">فیلتر تیم و لیگ</h2>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={filtersActive}
                    onClick={() => setFiltersActive((active) => !active)}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${filtersActive ? "border-[#7AD39E]/40 bg-[#7AD39E]/10 text-[#7AD39E]" : "border-white/10 bg-white/5 text-white/40"}`}
                  >
                    <span className={`size-2 rounded-full ${filtersActive ? "bg-[#7AD39E]" : "bg-white/25"}`} />
                    فعال
                  </button>
                </div>
                <p className="mt-1 text-sm text-white/45">نام تیم یا لیگی که می‌خواهید ببینید اضافه کنید</p>
              </div>
              <button
                type="button"
                aria-label="بستن فیلتر"
                onClick={() => setFilterOpen(false)}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
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
                className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[#7AD39E] text-[#121416] transition-transform hover:scale-105 active:scale-95"
              >
                <Plus className="size-5" />
              </button>
            </div>

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
                      className="flex size-6 cursor-pointer items-center justify-center rounded-full text-current opacity-70 transition-colors hover:bg-white/10 hover:opacity-100"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))
              )}
              </div>
            </div>

            {selectedTeams.length > 0 && (
              <button
                type="button"
                onClick={clearAllTeams}
                className="mt-3 cursor-pointer self-center text-sm text-white/35 transition-colors hover:text-white/60"
              >
                پاک کردن همه
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
