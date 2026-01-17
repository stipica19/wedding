import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Rsvp from "@/models/Rsvp";

export async function GET(req: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status"); // YES | NO | null
        const q = searchParams.get("q"); // pretraga po imenu

        const filter: any = {};
        if (status === "YES" || status === "NO") filter.status = status;
        if (q && q.trim()) filter.guests = { $regex: q.trim(), $options: "i" };

        const items = await Rsvp.find(filter).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ ok: true, count: items.length, items });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();

        const doc = await Rsvp.create({
            status: body.status,
            guests: body.guests,
            message: body.message || "",
        });

        return NextResponse.json({ ok: true, id: doc._id }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
