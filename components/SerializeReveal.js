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

export default function SerializeReveal({ steps }) {
  const [shown, setShown] = useState(1);
  const go = (n) => setShown(Math.max(1, Math.min(steps.length, n)));
  const arrived = shown >= 4;

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
        <div className="flex flex-wrap items-start justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center gap-4">
            <Node on={shown >= 1} className="bg-[#fffdf9] font-mono">
              {`{ name: "Asha", age: 21 }`}
              <div className="mt-2 font-sans text-base font-normal text-ink/75">object in memory</div>
            </Node>
            <div className={appear(shown >= 2)}>
              <Label>JSON.stringify()</Label>
            </div>
          </div>

          <div className={`flex min-w-[150px] flex-col items-center gap-2 pt-4 ${appear(shown >= 3)}`}>
            <Label>over the wire</Label>
            <span className="font-mono text-5xl font-bold text-ink/80">→</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Node on={shown >= 3} className={arrived ? "bg-[#e6dcfb] font-mono" : "bg-[#fdeed0] font-mono"}>
              {arrived ? `{ name: "Asha", age: 21 }` : `'{"name":"Asha","age":21}'`}
              <div className="mt-2 font-sans text-base font-normal text-ink/75">
                {arrived ? "object again!" : "just text"}
              </div>
            </Node>
            <div className={appear(shown >= 4)}>
              <Label>JSON.parse()</Label>
            </div>
          </div>
        </div>

        <div className={`mt-10 rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 text-center font-mono text-[22px] text-[#7be0b8] ${appear(shown >= 2)}`}>
          {`'{"name":"Asha","age":21}'`}
          <div className="mt-1 text-base text-white/70">typeof → &quot;string&quot;: safe to send anywhere</div>
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 5)}`}>
          <span className="text-xl text-ink/75">doesn&apos;t survive:</span>
          <span className="rounded-full border-[3px] border-ink bg-[#fbd5d5] px-5 py-1.5 font-mono text-xl font-bold">
            functions
          </span>
          <span className="rounded-full border-[3px] border-ink bg-[#fbd5d5] px-5 py-1.5 font-mono text-xl font-bold">
            undefined
          </span>
          <span className="rounded-full border-[3px] border-ink bg-[#fdeed0] px-5 py-1.5 font-mono text-xl font-bold">
            Date → string
          </span>
        </div>
      </div>

      <Stepper steps={steps} shown={shown} go={go} />
    </div>
  );
}
