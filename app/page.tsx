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
    <div className="flex flex-col items-center">
      <div className="flex mt-8 mb-8">
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
      <div className="flex flex-row-reverse gap-4">
        <div className="rounded-full cursor-pointer w-24 py-2 text-center bg-[#7AD39E] text-black text-sm">گل</div>
        <div className="rounded-full cursor-pointer w-24 py-2 text-center bg-[#212A25] text-[#61A27B] text-sm">پاس‌گل</div>

      </div>


    </div>
  );
}
