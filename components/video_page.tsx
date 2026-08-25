import { convertToVideoItem, getLatestVideos, VideoItemInterface } from "@/utils/varzesh3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Spinner from "./spinner";

function VideoCard({ video }: { video: VideoItemInterface }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <a href={video.url} data-video-key={video.url} className="group relative block cursor-pointer">
            <div className="pointer-events-none absolute -inset-3 z-0 rounded-2xl bg-[#7AD39E]/15 video-hover-surface" />
            <div className="relative z-10">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#212A25] shadow-lg">
                    {!imageLoaded && <div className="video-skeleton absolute inset-0" />}
                    <img
                        src={video.cover}
                        alt={video.title}
                        onLoad={() => setImageLoaded(true)}
                        className={`size-full object-cover transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <div className="mt-2 flex min-h-8 flex-row-reverse items-center justify-center gap-2 text-center">
                    <div className="text-md text-white">{video.title}</div>
                    <div className="text-sm text-white/50">{video.human_readable_views}</div>
                </div>
            </div>
        </a>
    );
}

export default function VideoPage() {
    const [videos, setVideos] = useState<VideoItemInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [minViews, setMinViews] = useState(50);
    const [data, setData] = useState<any>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const previousPositions = useRef<Map<string, DOMRect> | null>(null);

    useLayoutEffect(() => {
        const grid = gridRef.current;
        const positions = previousPositions.current;
        if (!grid || !positions) {
            return;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            grid.querySelectorAll<HTMLElement>("[data-video-key]").forEach((element) => {
                const key = element.dataset.videoKey;
                if (!key) {
                    return;
                }

                const previousPosition = positions.get(key);
                if (!previousPosition) {
                    element.animate([{ opacity: 0 }, { opacity: 1 }], {
                        duration: 350,
                        easing: "ease-out",
                        fill: "both",
                    });
                    return;
                }

                const currentPosition = element.getBoundingClientRect();
                const offsetX = previousPosition.left - currentPosition.left;
                const offsetY = previousPosition.top - currentPosition.top;
                if (offsetX === 0 && offsetY === 0) {
                    return;
                }

                // Freeze any interrupted move at its current visual position before restarting.
                element.getAnimations().forEach((animation) => animation.cancel());
                element.animate(
                    [
                        { transform: `translate(${offsetX}px, ${offsetY}px)` },
                        { transform: "translate(0, 0)" },
                    ],
                    { duration: 350, easing: "ease-out" }
                );
            });
        });

        previousPositions.current = null;
        return () => window.cancelAnimationFrame(animationFrame);
    }, [videos]);

    useEffect(() => {
        async function getVideos() {
            setLoading(true);
            const tempData = await getLatestVideos();
            setData(tempData);
            const video_list = convertToVideoItem(tempData, minViews * 1000);
            setVideos(video_list);
            setLoading(false);
        }
        getVideos();
    }, []);

    useEffect(() => {
        try{
            const video_list = convertToVideoItem(data, minViews * 1000);
            const grid = gridRef.current;
            if (grid) {
                previousPositions.current = new Map(
                    Array.from(grid.querySelectorAll<HTMLElement>("[data-video-key]")).map((element) => [
                        element.dataset.videoKey ?? "",
                        element.getBoundingClientRect(),
                    ])
                );
            }
            setVideos(video_list);
        } catch (e) {
            console.log(e);
        }

    }, [data, minViews]);

    return (
        <div className="flex w-[calc(100vw-2rem)] max-w-6xl flex-col items-center">
            <h1 className="text-white text-2xl mt-8">خلاصه بازی‌ها</h1>

            <div dir="rtl" className="mt-8 flex w-[80%] max-w-xl items-center justify-center gap-3">
                <div className="shrink-0 text-sm text-white/55">حداقل بازدید</div>
                <div className="flex flex-wrap justify-center gap-2">
                    {[
                        { label: "همه", value: 0 },
                        { label: "50k", value: 50 },
                        { label: "100k", value: 100 },
                        { label: "150k", value: 150 },
                        { label: "200k", value: 200 },
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setMinViews(option.value)}
                            aria-pressed={minViews === option.value}
                            className={`cursor-pointer rounded-full px-3 py-1.5 text-xs transition-colors ${minViews === option.value ? "bg-[#7AD39E] text-[#121416] hover:bg-[#91e0ad]" : "bg-[#212A25] text-[#7AD39E]/75 hover:bg-[#2a3830]"}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div ref={gridRef} dir="rtl" className="mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {loading && <div className="relative col-span-full h-64"><Spinner /></div>}
                {!loading && videos.length === 0 && (
                    <div className="col-span-full py-16 text-center text-sm text-white/45">
                        ویدیویی با این میزان بازدید پیدا نشد
                    </div>
                )}
                {!loading && videos.map((video) => (
                    <VideoCard key={video.url} video={video} />
                ))}

                {/* Spacer */}
                <div className="w-full h-36"></div>

            </div>
        </div>
    )
}
