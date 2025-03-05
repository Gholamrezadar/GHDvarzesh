'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"


export default function Home() {
  return (
    <div className="flex flex-col items-center h-dvh w-dvw select-none">
      <div className="flex mt-8 mb-4">
        {/* shadcn ui select */}
        <Select dir="rtl" defaultValue="laliga" >
          <SelectTrigger className="bg-transparent text-white border-none ring-0 outline-none active:ring-0 focus:ring-0 focus:outline-none text-xl">
            <SelectValue className="focus:ring-0 focus:outline-none"></SelectValue>
          </SelectTrigger>
          <SelectContent className="outline-none focus:ring-0 focus:outline-none">
            <SelectItem value="laliga">لالیگای اسپانیا</SelectItem>
            <SelectItem value="ucl">لیگ قهرمانان اروپا</SelectItem>
            <SelectItem value="prem">لیگ برتر انگلیس</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pills: Goal/Assist mode selection */}
      <div className="flex flex-row-reverse gap-3">
        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#7AD39E] text-black text-sm">گل</div>
        <div className="rounded-full cursor-pointer w-28 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm">پاس‌گل</div>

      </div>

      {/* scrollable list */}
      <div className="overflow-y-auto h-full w-full mt-8">
        {
          Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex flex-row-reverse items-center justify-between py-2 pl-8 pr-4 text-white">
              <div className="flex flex-row-reverse items-center justify-start gap-4">
                {/* image */}
                <div className="w-16 h-16 rounded-full outline-2 outline-[#D7C17E] outline-offset-2  bg-[#7AD39E] text-black">
                  <img src="https://match-cdn.varzesh3.com/football-player/2022/06/22/C/0fikzp0b.jpg" alt="player profile" className="w-full h-full rounded-full" />
                </div>

                {/* name and team */}
                <div className="flex flex-col justify-center items-end">
                  <div className="text-lg">رابرت لواندوفسکی</div>
                  <div className="text-xs text-white/50">بارسلونا</div>
                </div>
              </div>

              {/* score */}
              <div className="text-2xl px-4">
                <div className="text-[#D7C17E]">١٩</div>
              </div>

            </div>
          ))
        }
      </div>


      {/* Nav Button */}
      <div className="fixed right-0 bottom-0 m-12 z-10">
        <div className="flex bg-[#7AD39E] rounded-full px-8 py-4 text-black text-sm big-green-glow cursor-pointer">
          برترین‌ها
        </div>
      </div>

      {/* Black Gradient from bottom to 2/3 of the screen */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#00000000] to-[#000000FF] pointer-events-none"></div>


    </div>
  );
}
