import NavButton from "@/components/nav_button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh w-full max-w-3xl mx-auto flex-col items-center select-none">
      {children}
      <NavButton />
      <div className="fixed bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#00000000] to-[#000000FF] pointer-events-none"></div>
    </div>
  );
}
