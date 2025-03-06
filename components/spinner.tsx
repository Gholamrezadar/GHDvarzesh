import { useEffect, useState } from "react";

export default function Spinner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // wait for 120ms before showing the spinner to avoid flashing
        const timer = setTimeout(() => setVisible(true), 120);
        return () => clearTimeout(timer); // Cleanup on unmount
    });

    return (
        <div className={`flex justify-center items-center h-full w-full ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute w-12 h-12 border-4 border-t-transparent border-[#7AD39E] rounded-full animate-spin "></div>
        </div>
    );
}