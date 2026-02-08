import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Rsvp from "@/models/Rsvp";
import { rsvpSchema } from "@/lib/rsvpSchema";

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

        const raw = await req.json();
        const parsed = rsvpSchema.safeParse(raw);

        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Invalid payload", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { status, guests, message } = parsed.data;

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "";
        const userAgent = req.headers.get("user-agent") || "";
        const last = await Rsvp.findOne({ ip }).sort({ createdAt: -1 }).lean();
        if (last && Date.now() - new Date(last.createdAt).getTime() < 5_000) {
            return NextResponse.json(
                { ok: false, error: "Too many requests" },
                { status: 429 }
            );
        }

        await Rsvp.create({
            status,
            guests,
            message,
            //childrenCount,
            ip,
            userAgent,
        });

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
