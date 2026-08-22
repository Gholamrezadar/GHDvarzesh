import NavButton from "@/components/nav_button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw max-w-3xl mx-auto select-none">
      {children}
      <NavButton />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#00000000] to-[#000000FF] pointer-events-none"></div>
    </div>
  );
}
