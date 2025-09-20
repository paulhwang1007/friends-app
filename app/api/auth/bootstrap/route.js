export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req) {
  await connectDB();

  const { userId } = getAuth(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cu = await currentUser();
  const email = cu?.emailAddresses?.[0]?.emailAddress || "";
  const name =
    [cu?.firstName, cu?.lastName].filter(Boolean).join(" ") ||
    cu?.username ||
    "Unnamed";
  const username = cu?.username || "";

  const doc = await User.findOneAndUpdate(
    { clerkId: userId },
    {
      $set: { email, name, username },
      $setOnInsert: { clerkId: userId, createdAt: new Date() },
    },
    { new: true, upsert: true }
  );

  return NextResponse.json({ ok: true, user: doc });
}
