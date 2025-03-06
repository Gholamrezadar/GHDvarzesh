export default function NavButton({ active, option1, option2, option3, menuOpen, setMenuOpen, setNavOptionActive, setNavOption1, setNavOption2, setNavOption3 }: {
    active: string;
    option1: string;
    option2: string;
    option3: string;
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNavOptionActive: React.Dispatch<React.SetStateAction<string>>;
    setNavOption1: React.Dispatch<React.SetStateAction<string>>;
    setNavOption2: React.Dispatch<React.SetStateAction<string>>;
    setNavOption3: React.Dispatch<React.SetStateAction<string>>;
}) {
    function handleOption1() {
        setNavOptionActive(option1); 
        if(option1 === "برترین‌ها"){
            setNavOption1("ویدیو");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }else if(option1 === "ویدیو"){
            setNavOption1("برترین‌ها");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }else if(option1 === "برنامه بازی‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("جدول لیگ‌ها");
        }else if(option1 === "جدول لیگ‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("برنامه بازی‌ها");
        }
        setMenuOpen(false);
    }

    function handleOption2() {
        setNavOptionActive(option2);
        if(option2 === "ویدیو"){
            setNavOption1("برترین‌ها");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }else if(option2 === "برترین‌ها"){
            setNavOption1("ویدیو");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }else if(option2 === "برنامه بازی‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("جدول لیگ‌ها");
        }else if(option2 === "جدول لیگ‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("برنامه بازی‌ها");
        }
        setMenuOpen(false);
    }

    function handleOption3() {
        setNavOptionActive(option3); 
        if(option3 === "برنامه بازی‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("جدول لیگ‌ها");
        }else if(option3 === "برترین‌ها"){
            setNavOption1("ویدیو");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }else if(option3 === "ویدیو"){  
            setNavOption1("برترین‌ها");
            setNavOption2("برنامه بازی‌ها");
            setNavOption3("جدول لیگ‌ها");
        }
        else if(option3 === "جدول لیگ‌ها"){
            setNavOption1("برترین‌ها");
            setNavOption2("ویدیو");
            setNavOption3("برنامه بازی‌ها");
        }
        setMenuOpen(false);
    }
    return (
        <>
            {/* Active Nav Button */}
            <div className="fixed right-0 bottom-0 m-12 z-20" onClick={() => { setMenuOpen(!menuOpen) }}>
                <div className="flex bg-[#7AD39E] rounded-full w-24 py-4 text-center items-center justify-center text-black text-sm big-green-glow cursor-pointer">
                    {active}
                </div>
            </div>
            {/* Other Nav Buttons */}
            <div className={`${menuOpen ? "" : ""}`}>

                <div className={`fixed right-0 bottom-0 m-12 z-10 transition-all ease-in-out ${menuOpen ? "-translate-y-16" : "-translate-y-0"}`} onClick={()=>{handleOption1()}}>
                    <div className="flex bg-[#212B25] rounded-full w-24 py-4 text-center items-center justify-center text-[#7AD39E]/70 text-sm cursor-pointer">
                        {option1}
                    </div>
                </div>
                <div className={`fixed right-0 bottom-0 m-12 z-10 transition-all ease-in-out ${menuOpen ? "-translate-y-32" : "-translate-y-0"}`} onClick={()=>{handleOption2()}}>
                    <div className="flex bg-[#212B25] rounded-full w-24 py-4 text-center items-center justify-center text-[#7AD39E]/70 text-sm cursor-pointer">
                        {option2}
                    </div>
                </div>
                <div className={`fixed right-0 bottom-0 m-12 z-10 transition-all ease-in-out ${menuOpen ? "-translate-y-48" : "-translate-y-0"}`} onClick={()=>{handleOption3()}}>
                    <div className="flex bg-[#212B25] rounded-full w-24 py-4 text-center items-center justify-center text-[#7AD39E]/70 text-sm cursor-pointer">
                        {option3}
                    </div>
                </div>
            </div>
        </>
    );
}