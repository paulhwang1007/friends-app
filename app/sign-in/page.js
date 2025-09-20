"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {/* Hash routing avoids the catch-all requirement */}
      <SignIn routing="hash" signUpUrl="/sign-up" />
    </main>
  );
}
