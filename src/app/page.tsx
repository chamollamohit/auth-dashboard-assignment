import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 text-center space-y-8 max-w-2xl">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-[#D9FF41] text-[10px] font-bold uppercase tracking-widest">
                        Now in Beta
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white">
                        TASK<span className="text-[#D9FF41]">MASTER</span>
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-md mx-auto">
                        The minimal workspace for high-performance developers.
                        Organize tasks with speed and precision.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="w-full sm:w-auto px-8 py-4 bg-[#D9FF41] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(217,255,65,0.2)]">
                        Get Started Free
                    </Link>
                    <Link
                        href="/login"
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-full hover:bg-zinc-800 transition-all">
                        Sign In
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-8 text-zinc-700 text-[10px] font-bold uppercase tracking-[0.2em]">
                Built for the Primetrade Assignment
            </div>
        </div>
    );
}
