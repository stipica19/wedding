import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Rsvp from "@/models/Rsvp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function toCSV(rows: string[][], delimiter = ";"): string {
    const escape = (v: string) => {
        if (v == null) return "";
        const s = String(v);
        // u CSV-u s ; delimiterom i dalje treba escapati " i new line
        if (/[\"\n]/.test(s) || s.includes(delimiter)) return '"' + s.replace(/"/g, '""') + '"';
        return s;
    };

    return rows.map((r) => r.map(escape).join(delimiter)).join("\n");
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions as any);
        if (!session || (session as any).user?.role !== "admin") {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const items = await Rsvp.find({ status: "YES" })
            .select({ guests: 1, message: 1, createdAt: 1 })
            .sort({ createdAt: -1 })
            .lean();

        // A=Ime, B=Poruka, C=Datum
        const rows: string[][] = [["  Ime i Prezime  ", "    Poruka     ", "Datum potvrde"]];

        for (const it of items as any[]) {
            const msg = it.message || "";
            const date = it.createdAt
                ? new Date(it.createdAt).toISOString().slice(0, 10) // 2026-01-29
                : "";


            for (const g of it.guests || []) {
                const name = String(g).trim();
                if (!name) continue;
                rows.push([name, msg, date]);
            }
        }

        // Excel-friendly:
        // 1) BOM za UTF-8
        // 2) "sep=;" da Excel zna delimiter
        const csv = "\uFEFF" + "sep=;\n" + toCSV(rows, ";") + "\n";

        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const filename = `popis_${yyyy}-${mm}-${dd}.csv`;

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-store",
            },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}
