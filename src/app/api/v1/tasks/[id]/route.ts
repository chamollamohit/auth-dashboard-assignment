import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { title, status } = await req.json();

    const updated = await db.task.update({
        where: { id: params.id },
        data: { title, status }
    });

    return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await db.task.delete({
        where: { id: params.id }
    });
    return NextResponse.json({ message: "Deleted" });
}