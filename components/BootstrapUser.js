"use client";
import { useEffect, useState } from "react";

export default function BootstrapUser() {
  const [status, setStatus] = useState("bootstrapping…");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/bootstrap", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        if (ignore) return;
        setStatus(res.ok ? "ok" : `error: ${data?.error || res.status}`);
        console.log("bootstrap:", data);
      } catch (e) {
        if (!ignore) setStatus(`error: ${e.message}`);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  return <p className="text-sm text-gray-500">bootstrap: {status}</p>;
}
