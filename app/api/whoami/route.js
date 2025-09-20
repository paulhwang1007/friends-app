// app/api/auth/whoami/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getAuth, currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId, sessionId } = getAuth(req); // ✅ read auth from THIS request
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  return NextResponse.json({
    userId,
    sessionId,
    email: user?.emailAddresses?.[0]?.emailAddress || null,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    username: user?.username || null,
  });
}
