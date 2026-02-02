import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const user = token ? verifyToken(token) : null;

    // Requirement: Protected routes
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
            {/* Task CRUD UI will go here */}
        </div>
    );
}
