import convertToPersianDigits from "@/utils/persian_digits";

export interface PlayerItemInterface {
    name: string;
    team: string;
    number: number;
    medal: "Gold" | "Silver" | "Bronze" | "";
    pic: string;
}
export default function PlayerItem({ name, team, number, medal, pic }: PlayerItemInterface) {

    function getMedalColor(medal: "Gold" | "Silver" | "Bronze" | "") {
        if (medal === "Gold") {
            return "#D7C17E";
        } else if (medal === "Silver") {
            return "#EE0000";
        } else if (medal === "Bronze") {
            return "#F5B975";
        } else {
            return "#FFFFFF";
        }
    }

    return (
        <div className="flex flex-row-reverse items-center justify-between py-2 pl-8 pr-4 text-white">
            <div className="flex flex-row-reverse items-center justify-start gap-4">
                {/* image */}
                <div className="w-16 h-16 rounded-full text-black">
                    <div className={`${medal === "Gold" ? "outline-[#D7C17E]" : medal === "Silver" ? "outline-gray-400" : medal === "Bronze" ? "outline-[#84654F]" : "outline-[#979899]/0"} outline-2 outline-offset-2 rounded-full`}>
                    <img width={64} height={64} src={pic} alt={name.toString() + "profile picture"} className="w-full h-full rounded-full" />

                    </div>
                </div>

                {/* name and team */}
                <div className="flex flex-col justify-center items-end">
                    <div className="text-lg">{name}</div>
                    <div className="text-xs text-white/50">{team}</div>
                </div>
            </div>

            {/* score */}
            <div className="text-2xl px-4 font-light">
                <div className={`${medal === "Gold" ? "text-[#D7C17E]" : medal === "Silver" ? "text-gray-400" : medal === "Bronze" ? "text-[#84654F]" : "text-[#979899]/50"}
                    }`}>{convertToPersianDigits(number)}</div>
            </div>

        </div>
    );
}