import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const email = String(body?.email || "").toLowerCase().trim();
        const password = String(body?.password || "");
        const name = String(body?.name || "").trim();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ ok: false, error: "Password min 8 chars" }, { status: 400 });
        }

        const existing = await User.findOne({ email }).lean();
        if (existing) {
            return NextResponse.json({ ok: false, error: "Email already exists" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            name,
            passwordHash,
            role: "admin", // ako želiš da prvi user bude admin; ili "user"
        });

        return NextResponse.json({ ok: true, id: user._id }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
