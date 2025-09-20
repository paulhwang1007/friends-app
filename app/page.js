"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <SignedOut>
        <h1 className="text-2xl font-bold">Friend Profiles 🎉</h1>
        <p className="text-gray-600">Sign in to join or create a group</p>

        <div className="flex gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Sign in
          </Link>
          <Link href="/sign-up" className="px-4 py-2 rounded border">
            Sign up
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <h1 className="text-2xl font-bold">You’re signed in 🚀</h1>
        <UserButton afterSignOutUrl="/" />
        <Link
          href="/groups"
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Go to Groups
        </Link>
      </SignedIn>
    </main>
  );
}
