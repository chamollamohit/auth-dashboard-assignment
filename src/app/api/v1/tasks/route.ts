import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/checkAuth";




export async function GET(req: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const tasks = await db.task.findMany({
        where: {
            userId: user.userId,
            ...(status && { status: status as any }),
            ...(search && { title: { contains: search, mode: 'insensitive' } }),
        },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(tasks);
}

export async function POST(req: Request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title } = await req.json();
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newTask = await db.task.create({
        data: { title, userId: user.userId }
    });

    return NextResponse.json(newTask, { status: 201 });
}