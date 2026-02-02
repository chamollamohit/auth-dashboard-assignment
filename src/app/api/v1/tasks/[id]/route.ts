import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/checkAuth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, status } = await req.json();
    const { id } = await params
    console.log(title);

    const updated = await db.task.update({
        where: { id },
        data: { title, status }
    });

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params
    await db.task.delete({
        where: { id }
    });
    return NextResponse.json({ message: "Deleted" });
}