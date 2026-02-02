import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/checkAuth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getAuthUser();
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { status } = await req.json();
        const { id } = await params
        if (!status) {
            return NextResponse.json({ error: "Status needed to update" }, { status: 401 });
        }
        const updated = await db.task.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Falied to update status" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getAuthUser();
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params
        await db.task.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Task Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Falied to delete task" }, { status: 500 });
    }
}