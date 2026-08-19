"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const STAGES = ["placed", "preparing", "ready", "outForDelivery", "delivered"] as const;

export function OrderTracker({ dict }: { dict: Dictionary }) {
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const activeStage = 2; // demo state

  return (
    <div className="max-w-xl">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (orderId.trim()) setSubmitted(true);
        }}
      >
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="DO-482913"
          className="focus-ring flex-1 border border-[var(--color-line)] px-4 py-3 text-sm"
        />
        <button className="focus-ring bg-[var(--color-ink)] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-terracotta)]">
          {dict.account.trackOrder}
        </button>
      </form>

      {submitted && (
        <ol className="mt-10 space-y-6">
          {STAGES.map((stage, i) => (
            <li key={stage} className="flex items-center gap-4">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs",
                  i <= activeStage ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)] text-white" : "border-[var(--color-line)] text-[var(--color-ink)]/40"
                )}
              >
                {i + 1}
              </span>
              <span className={cn("text-sm", i <= activeStage ? "font-medium text-[var(--color-ink)]" : "text-[var(--color-ink)]/45")}>
                {dict.tracking[stage]}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
