export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-slate-200">
            <div className="w-full max-w-md bg-[#1e293b] border border-slate-800 p-8 rounded-2xl shadow-xl">
                {children}
            </div>
        </div>
    );
}
