import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { title, status } = await req.json();
    const { id } = await params
    const updated = await db.task.update({
        where: { id },
        data: { title, status }
    });

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    await db.task.delete({
        where: { id }
    });
    return NextResponse.json({ message: "Deleted" });
}