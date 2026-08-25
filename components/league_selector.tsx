"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LEAGUE_DISPLAY_NAMES } from "@/utils/varzesh3_constants";

const DEFAULT_LEAGUE_OPTIONS = Object.keys(LEAGUE_DISPLAY_NAMES);

interface LeagueSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  options?: string[];
}

export default function LeagueSelector({ value, onValueChange, options = DEFAULT_LEAGUE_OPTIONS }: LeagueSelectorProps) {
  return (
    <Select dir="rtl" value={value} onValueChange={onValueChange}>
      <SelectTrigger className="cursor-pointer rounded-xl border-none bg-transparent text-2xl text-white/90 outline-none transition-colors hover:text-white [&_svg]:opacity-70 [&_svg]:transition-colors hover:[&_svg]:text-[#7AD39E] hover:[&_svg]:opacity-100 active:ring-0 focus:ring-0 focus:outline-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-0 bg-[#161a18] text-white outline-none focus:ring-0 focus:outline-none">
        {options.map((option) => (
          <SelectItem
            key={option}
            className="cursor-pointer data-[highlighted]:bg-[#212A25] data-[highlighted]:text-white hover:bg-[#212A25]"
            value={option}
          >
            {LEAGUE_DISPLAY_NAMES[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
