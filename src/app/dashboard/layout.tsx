import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 selection:bg-lime-400 selection:text-black">
            {/* Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

            <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#D9FF41] rounded-xl flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(217,255,65,0.2)]">
                            <span className="text-black font-black text-xl">
                                T
                            </span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter">
                            TASKMASTER
                        </span>
                    </div>
                    <LogoutButton />
                </div>
            </nav>

            <main className="relative z-10 p-6 max-w-5xl mx-auto">
                {children}
            </main>
        </div>
    );
}
