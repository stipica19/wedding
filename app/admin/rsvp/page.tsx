import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Rsvp from "@/models/Rsvp";
import { redirect } from "next/navigation";
import AdminRsvpClient from "./AdminRsvpClient";

export default async function AdminRsvpPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  const items = await Rsvp.find()
    .select({ status: 1, guests: 1, message: 1, createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();

  const yesCount = items.filter((x: any) => x.status === "YES").length;
  const noCount = items.filter((x: any) => x.status === "NO").length;

  const totalYesGuests = items
    .filter((x: any) => x.status === "YES")
    .reduce((sum: number, x: any) => sum + (x.guests?.length || 0), 0);

  return (
    <AdminRsvpClient
      items={items.map((it: any) => ({
        _id: String(it._id),
        status: it.status,
        guests: it.guests || [],
        message: it.message || "",
        createdAt: it.createdAt ? String(it.createdAt) : "",
      }))}
      stats={{ yesCount, noCount, totalYesGuests }}
    />
  );
}
