import { convertToVideoItem, getLatestVideos, VideoItemInterface } from "@/utils/varzesh3";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider"

import Spinner from "./spinner";

export default function VideoPage() {
    const [videos, setVideos] = useState<VideoItemInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [minViews, setMinViews] = useState(50);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        async function getVideos() {
            setLoading(true);
            setLoading2(true);
            const tempData = await getLatestVideos();
            setData(tempData);
            const video_list = convertToVideoItem(tempData, minViews * 1000);
            setVideos(video_list);
            setLoading(false);
            setLoading2(false);
        }
        getVideos();
    }, []);

    useEffect(() => {
        setLoading2(true);
        try{
            const video_list = convertToVideoItem(data, minViews * 1000);
            setVideos(video_list);
        } catch (e) {
            console.log(e);
        }

        // set loading to false after 300ms
        let timeout = setTimeout(() => {
            setLoading2(false);
        }, 400);

        return () => clearTimeout(timeout);

    }, [minViews]);

    return (
        <div className="flex w-[calc(100vw-2rem)] max-w-6xl flex-col items-center">
            <h1 className="text-white text-2xl mt-8">خلاصه بازی‌ها</h1>

            {/* slider for min views */}
            <div dir="rtl" className="mt-8 flex w-[80%] max-w-xl items-center gap-4">
                <div className="flex shrink-0 items-center gap-2 text-sm">
                    <span className="text-white/55">حداقل بازدید</span>
                    <span className="rounded-full bg-[#7AD39E]/10 px-2.5 py-1 font-semibold text-[#9fe0b5]">{minViews}k</span>
                </div>
                <Slider defaultValue={[50]} min={0} max={150} step={10} onValueChange={(value) => setMinViews(value[0])} className="flex-1 cursor-pointer" />
            </div>

                {/* {loading2 && (
                    <div className="w-full h-dvh bg-red-600 flex flex-col items-center justify-center">
                        <Spinner/>
                    </div>
                )} */}
            <div className="mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {loading && <div className="relative col-span-full h-64"><Spinner /></div>}
                {!loading && videos.map((video, i) => (
                    <a href={video.url} key={i.toString() + video.title} className="group relative block cursor-pointer">
                        <div className="video-hover-surface pointer-events-none absolute -inset-3 z-0 rounded-2xl bg-[#7AD39E]/15" />
                        <div className="relative z-10">
                            <img src={video.cover} alt={video.title} className="w-full rounded-xl shadow-lg" />
                            <div className="mt-2 flex flex-row-reverse items-center justify-center gap-2 text-center">
                                <div className="text-md text-white">{video.title}</div>
                                <div className="text-sm text-white/50">{video.human_readable_views}</div>
                            </div>
                        </div>
                    </a>
                ))}

                {/* Spacer */}
                <div className="w-full h-36"></div>

            </div>
        </div>
    )
}
