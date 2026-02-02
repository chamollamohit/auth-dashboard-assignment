import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = (await cookies()).get("token")?.value;
    const decoded = token ? (verifyToken(token) as { userId: string }) : null;
    if (!decoded) redirect("/login");

    const user = await db.user.findUnique({
        where: { id: decoded.userId },
        select: { name: true },
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                T
                            </span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-800">
                            TaskMaster
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Active User
                            </p>
                            <p className="text-sm font-semibold text-slate-800">
                                {user?.name}
                            </p>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <LogoutButton />
                    </div>
                </div>
            </nav>
            <main className="p-6 max-w-4xl mx-auto">{children}</main>
        </div>
    );
}
