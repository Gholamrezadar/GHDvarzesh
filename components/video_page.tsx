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
        <div className="flex flex-col justify-center items-center  w-full h-full max-w-xl">
            <h1 className="text-white text-2xl mt-8">خلاصه بازی‌ها</h1>

            {/* slider for min views */}
            <div className="flex flex-col justify-center items-center gap-4 mt-8 w-full px-24">
                <Slider defaultValue={[50]} min={0} max={150} step={10} onValueChange={(value) => setMinViews(value[0])} />
                <div className="text-white text-sm flex flex-row-reverse" >
                    <div className="text-center">‌حداقل بازدید</div>
                    <div className="text-center">{minViews}k :</div>
                </div>
            </div>

            <div className="overflow-y-auto h-full w-full no-scrollbar mt-8">
                {loading2 && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <Spinner/>
                    </div>
                )}
                {loading && <Spinner />}
                {!loading && videos.map((video, i) => (
                    <div key={i.toString() + video.title} className="w-full px-4">
                        {/* Video Card */}
                        <div className="">
                            <div className="flex flex-col items-center justify-center h-full">
                                <a href={video.url}>
                                    <img src={video.cover} className="w-full h-full rounded-xl shadow-lg" />
                                    <div className="text-center text-white text-md mt-2 mb-8 flex flex-row-reverse gap-2 items-center justify-center">
                                        <div className="text-center text-white">{video.title}</div>
                                        <div className="text-center text-white/50 text-sm">{video.human_readable_views}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Spacer */}
                <div className="w-full h-36"></div>

            </div>
        </div>
    )
}