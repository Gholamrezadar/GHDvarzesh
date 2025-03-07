export default function LeaguesPage() {
  return (
    <div className="flex flex-col justify-center items-center  w-full h-full">
      <h1 className="text-white text-2xl mt-8">خلاصه بازی‌ها</h1>
      <div className="overflow-y-auto h-full w-full no-scrollbar mt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i.toString()} className="w-full px-4">
            {/* Video Card */}
            <div className="">
              <div className="flex flex-col items-center justify-center h-full">
                <a href="#">
                <img src="https://video-icdn.varzesh3.com/covers/2025/03/07/B/b5tc2ldm.jpg" className="w-full h-full rounded-xl shadow-lg" />
                <div className="text-center text-white text-md mt-2">{"بارسلونا 2 - 1 بنفیکا"}</div>
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