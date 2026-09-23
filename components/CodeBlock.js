"use client";
import { useState } from "react";

export default function CodeBlock({ filename, code }) {
  const [output, setOutput] = useState(null);

  const run = () => {
    const lines = [];
    const fakeConsole = {
      log: (...args) =>
        lines.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
    };
    try {
      new Function("console", code)(fakeConsole);
    } catch (e) {
      lines.push(`${e.name}: ${e.message}`);
    }
    setOutput(lines);
  };

  return (
    <div className="overflow-hidden rounded-2xl border-[3px] border-ink bg-[#221f1c] shadow-[8px_8px_0_#1d1a19]">
      <div className="flex items-center justify-between bg-[#2c2824] px-6 py-4 font-mono text-xl text-white/90">
        {filename}
        <button
          onClick={run}
          className="rounded-lg border-[3px] border-ink bg-[#4fbfb0] px-6 py-2 text-xl font-bold text-ink"
        >
          Run ▶
        </button>
      </div>
      <pre className="overflow-x-auto px-8 py-6 font-mono text-[22px] leading-10 text-[#f3ece2]">{code}</pre>
      <div className="min-h-[72px] bg-[#0e0d0c] px-8 py-5 font-mono text-[22px]">
        {output === null ? (
          <span className="text-white/60">Click &quot;Run&quot; to see output</span>
        ) : (
          output.map((l, i) => (
            <div key={i} className="text-[#7be0b8]">
              {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
