"use client";
import { useState } from "react";
import Stepper, { appear } from "./Stepper";

function Line({ on, children }) {
  return <div className={`${appear(on)} origin-left`}>{children}</div>;
}

export default function HttpReveal({ steps }) {
  const [shown, setShown] = useState(1);
  const go = (n) => setShown(Math.max(1, Math.min(steps.length, n)));
  const method = shown >= 3 ? "POST" : "GET";

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(shown + 1);
        if (e.key === "ArrowLeft") go(shown - 1);
      }}
      className="outline-none"
    >
      <div className="card p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-3 font-display text-3xl font-extrabold">Request →</div>
            <div className="min-h-[300px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-10 text-[#f3ece2]">
              <Line on={shown >= 1}>
                <span className="rounded-md bg-amber px-2 font-bold text-ink">{method}</span> /profile HTTP/1.1
              </Line>
              <Line on={shown >= 2}>
                <span className="text-[#8fb8ff]">Host:</span> myapp.com
              </Line>
              <Line on={shown >= 2}>
                <span className="text-[#8fb8ff]">Accept:</span> application/json
              </Line>
              <Line on={shown >= 3}>
                <span className="text-[#8fb8ff]">Content-Type:</span> application/json
              </Line>
              <Line on={shown >= 3}>
                <div className="mt-3 text-[#7be0b8]">{`{ "name": "Asha" }`}</div>
              </Line>
            </div>
          </div>

          <div>
            <div className="mb-3 font-display text-3xl font-extrabold">← Response</div>
            <div className="min-h-[300px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-10 text-[#f3ece2]">
              <Line on={shown >= 4}>
                HTTP/1.1 <span className="rounded-md bg-[#4fbfb0] px-2 font-bold text-ink">200 OK</span>
              </Line>
              <Line on={shown >= 4}>
                <span className="text-[#8fb8ff]">Content-Type:</span> application/json
              </Line>
              <Line on={shown >= 4}>
                <div className="mt-3 text-[#7be0b8]">{`{ "saved": true }`}</div>
              </Line>
            </div>
          </div>
        </div>

        <div className={`mt-10 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 5)}`}>
          <span className="text-xl text-ink/75">status codes:</span>
          <span className="rounded-full border-[3px] border-ink bg-[#c9f0e3] px-5 py-1.5 font-mono text-xl font-bold">
            200 OK
          </span>
          <span className="rounded-full border-[3px] border-ink bg-[#fdeed0] px-5 py-1.5 font-mono text-xl font-bold">
            404 Not Found
          </span>
          <span className="rounded-full border-[3px] border-ink bg-[#fbd5d5] px-5 py-1.5 font-mono text-xl font-bold">
            500 Server Error
          </span>
        </div>
      </div>

      <Stepper steps={steps} shown={shown} go={go} />
    </div>
  );
}
