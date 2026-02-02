"use client";
import { useState } from "react";
import TaskManager from "@/components/TaskManager";
import ProfileSettings from "@/components/ProfileSettings";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"tasks" | "settings">("tasks");

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 gap-6">
                <button
                    onClick={() => setActiveTab("tasks")}
                    className={`pb-2 text-sm font-medium transition-all ${activeTab === "tasks" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                    My Tasks
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`pb-2 text-sm font-medium transition-all ${activeTab === "settings" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
                    Profile Settings
                </button>
            </div>

            {/* Conditional Rendering */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "tasks" ? <TaskManager /> : <ProfileSettings />}
            </div>
        </div>
    );
}
