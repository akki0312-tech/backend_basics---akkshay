"use client";
import { useState } from "react";
import Stepper, { appear } from "./Stepper";

function Node({ on, className = "", children }) {
  return (
    <div
      className={`rounded-xl border-[3px] border-ink px-7 py-5 text-center text-2xl font-bold ${appear(on)} ${className}`}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return <span className="rounded-md bg-ink px-3 py-1 font-mono text-lg text-white">{children}</span>;
}

export default function Reveal({ steps }) {
  const [shown, setShown] = useState(1);
  const last = steps.length;
  const go = (n) => setShown(Math.max(1, Math.min(last, n)));

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(shown + 1);
        if (e.key === "ArrowLeft") go(shown - 1);
      }}
      className="outline-none"
    >
      <div className="card p-8 md:p-14">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <Node on={shown >= 1} className="bg-[#fffdf9]">
            Browser
            <div className="mt-3 rounded-lg border-[3px] border-ink bg-amber px-4 py-1.5 text-lg">Log in</div>
            <div className="mt-1 text-base font-normal text-ink/75">the frontend</div>
          </Node>

          <div className="flex min-w-[190px] flex-col items-center gap-3">
            <div className={`flex flex-col items-center ${appear(shown >= 2)}`}>
              <Label>GET /profile</Label>
              <span className="font-mono text-5xl font-bold text-ink/80">→</span>
            </div>
            <div className={`flex flex-col items-center ${appear(shown >= 4)}`}>
              <span className="font-mono text-5xl font-bold text-ink/80">←</span>
              <Label>200 OK</Label>
            </div>
          </div>

          <Node on={shown >= 2} className={shown === 3 ? "bg-amber" : "bg-[#eaf1ff]"}>
            Backend
            <div className="mt-1 text-base font-normal text-ink/75">rules &amp; logic</div>
          </Node>

          <span className={`font-mono text-5xl font-bold text-ink/80 ${appear(shown >= 3)}`}>↔</span>

          <Node on={shown >= 3} className="bg-[#fdeed0]">
            Database
            <div className="mt-1 text-base font-normal text-ink/75">stored data</div>
          </Node>
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 5)}`}>
          <span className="text-xl text-ink/75">same pattern behind</span>
          {["social", "payments", "maps", "games"].map((a) => (
            <span key={a} className="rounded-full border-[3px] border-ink bg-[#fffdf9] px-5 py-1.5 text-xl font-bold">
              {a}
            </span>
          ))}
        </div>
      </div>

      <Stepper steps={steps} shown={shown} go={go} />
    </div>
  );
}
