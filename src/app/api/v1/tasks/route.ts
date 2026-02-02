import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/checkAuth";


export async function GET(req: Request) {
    const token = await getAuthUser();
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const skip = (page - 1) * limit;
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    try {
        const where: any = {
            userId: token.userId,
            ...(search && { title: { contains: search, mode: 'insensitive' } }),
            ...(status && { status: status as any }),
        };

        const [tasks, totalCount] = await Promise.all([
            db.task.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.task.count({ where })
        ]);

        return NextResponse.json({
            tasks,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const token = await getAuthUser();
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { title } = await req.json();
        if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

        const newTask = await db.task.create({
            data: { title, userId: token.userId }
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}