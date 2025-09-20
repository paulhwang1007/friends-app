// app/page.js
"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import BootstrapUser from "@/components/BootstrapUser";

function WhoAmIBox() {
  const [whoami, setWhoami] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/whoami", { credentials: "include" });
      const data = await res.json();
      console.log("whoami:", data);
      setWhoami(data);
    })();
  }, []);

  return (
    <pre className="bg-gray-100 p-3 rounded text-sm w-full max-w-md overflow-x-auto">
      {JSON.stringify(whoami, null, 2)}
    </pre>
  );
}

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
        <BootstrapUser />
        <h1 className="text-2xl font-bold">You’re signed in 🚀</h1>
        <UserButton afterSignOutUrl="/" />
        <WhoAmIBox /> {/* 👈 only runs when signed in */}
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
