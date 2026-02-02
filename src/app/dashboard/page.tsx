"use client";
import { useState } from "react";
import TaskManager from "@/components/TaskManager";
import ProfileSettings from "@/components/ProfileSettings";
import { LayoutGrid, UserCircle } from "lucide-react";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"tasks" | "settings">("tasks");

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-8 border-b border-zinc-800/50">
                <button
                    onClick={() => setActiveTab("tasks")}
                    className={`pb-4 text-xs font-bold uppercase flex items-center gap-2 relative ${
                        activeTab === "tasks"
                            ? "text-[#D9FF41]"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}>
                    <LayoutGrid size={16} />
                    My Workspace
                    {activeTab === "tasks" && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9FF41] shadow-[0_0_10px_rgba(217,255,65,0.5)]" />
                    )}
                </button>

                <button
                    onClick={() => setActiveTab("settings")}
                    className={`pb-4 text-xs font-bold uppercase flex items-center gap-2 relative ${
                        activeTab === "settings"
                            ? "text-[#D9FF41]"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}>
                    <UserCircle size={16} />
                    Profile Settings
                    {activeTab === "settings" && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D9FF41] shadow-[0_0_10px_rgba(217,255,65,0.5)]" />
                    )}
                </button>
            </div>

            <div>
                {activeTab === "tasks" ? <TaskManager /> : <ProfileSettings />}
            </div>
        </div>
    );
}
