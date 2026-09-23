"use client";
import { useState } from "react";
import Stepper, { appear } from "./Stepper";

const verbs = [
  { v: "GET", path: "/users/1", does: "read", tone: "bg-[#c9f0e3]" },
  { v: "POST", path: "/users", does: "create", tone: "bg-[#fdeed0]" },
  { v: "PUT", path: "/users/1", does: "update", tone: "bg-[#dbe6ff]" },
  { v: "DELETE", path: "/users/1", does: "remove", tone: "bg-[#fbd5d5]" },
];

function Node({ on, className = "", children }) {
  return (
    <div
      className={`rounded-xl border-[3px] border-ink px-7 py-5 text-center text-2xl font-bold ${appear(on)} ${className}`}
    >
      {children}
    </div>
  );
}

export default function ApiReveal({ steps }) {
  const [shown, setShown] = useState(1);
  const go = (n) => setShown(Math.max(1, Math.min(steps.length, n)));

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
            Your app
            <div className="mt-1 text-base font-normal text-ink/75">the client</div>
          </Node>
          <span className={`font-mono text-5xl font-bold text-ink/80 ${appear(shown >= 1)}`}>↔</span>
          <Node on={shown >= 1} className="bg-[#fce4ec]">
            API
            <div className="mt-1 text-base font-normal text-ink/75">the menu</div>
          </Node>
          <span className={`font-mono text-5xl font-bold text-ink/80 ${appear(shown >= 2)}`}>↔</span>
          <Node on={shown >= 2} className="border-dashed bg-[#f0ece4]">
            Server + database
            <div className="mt-1 text-base font-normal text-ink/75">hidden kitchen</div>
          </Node>
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 3)}`}>
          <span className="text-xl text-ink/75">resources:</span>
          {["/users", "/users/1", "/posts", "/posts/7"].map((r) => (
            <span key={r} className="rounded-full border-[3px] border-ink bg-[#fffdf9] px-5 py-1.5 font-mono text-xl font-bold">
              {r}
            </span>
          ))}
        </div>

        <div className={`mt-10 grid gap-4 md:grid-cols-2 ${appear(shown >= 4)}`}>
          {verbs.map((x) => (
            <div key={x.v} className={`flex items-center gap-4 rounded-xl border-[3px] border-ink px-5 py-4 ${x.tone}`}>
              <span className="w-24 font-mono text-xl font-bold">{x.v}</span>
              <span className="font-mono text-xl">{x.path}</span>
              <span className="ml-auto text-xl font-bold">→ {x.does}</span>
            </div>
          ))}
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 5)}`}>
          {["stateless", "JSON in / JSON out", "same rules everywhere"].map((c) => (
            <span key={c} className="rounded-full border-[3px] border-ink bg-amber px-5 py-1.5 text-xl font-bold">
              {c}
            </span>
          ))}
        </div>
      </div>

      <Stepper steps={steps} shown={shown} go={go} />
    </div>
  );
}
