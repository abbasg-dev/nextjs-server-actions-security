"use client";

import { useTransition } from "react";
import { clearDemoSession, useDemoUser } from "@/app/dev-session-actions";

export function DemoSession({ activeUser }: { activeUser: string | null }) {
  const [pending, startTransition] = useTransition();

  return (
    <section className="demo-session">
      <span className="session-label">
        SESSION: <strong>{activeUser ?? "SIGNED OUT"}</strong>
      </span>
      <div className="session-actions">
        <button disabled={pending} onClick={() => startTransition(() => useDemoUser("user-alice"))}>Alice</button>
        <button disabled={pending} onClick={() => startTransition(() => useDemoUser("user-bob"))}>Bob</button>
        <button disabled={pending} onClick={() => startTransition(() => clearDemoSession())}>Sign out</button>
      </div>
    </section>
  );
}
