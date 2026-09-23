"use client";
import { useState } from "react";
import Stepper, { appear } from "./Stepper";
import { matchRoute } from "./router";

const routes = [
  { method: "GET", path: "/users", handler: "listUsers()" },
  { method: "GET", path: "/users/:id", handler: "getUser(id)" },
  { method: "POST", path: "/users", handler: "createUser()" },
];

const requestFor = (shown) =>
  shown >= 5 ? { method: "GET", path: "/nope" } : shown === 4 ? { method: "GET", path: "/users/42" } : { method: "GET", path: "/users" };

export default function RoutingReveal({ steps }) {
  const [shown, setShown] = useState(1);
  const go = (n) => setShown(Math.max(1, Math.min(steps.length, n)));

  const req = requestFor(shown);
  const hit = matchRoute(routes, req.method, req.path);
  const highlight = shown >= 2 ? hit.route : null;

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
          <div className="rounded-xl border-[3px] border-ink bg-[#fffdf9] px-6 py-4 text-center font-mono text-2xl font-bold">
            <span className="rounded-md bg-amber px-2">{req.method}</span> {req.path}
            <div className="mt-1 font-sans text-base font-normal text-ink/75">incoming request</div>
          </div>
          <span className="font-mono text-5xl font-bold text-ink/80">→</span>
          <div className={`rounded-xl border-[3px] border-ink bg-[#fff0c9] px-7 py-5 text-center text-2xl font-bold ${appear(shown >= 2)}`}>
            Router
            <div className="mt-1 text-base font-normal text-ink/75">finds the match</div>
          </div>
        </div>

        <div className={`mt-10 flex flex-col gap-3 ${appear(shown >= 3)}`}>
          {routes.map((r) => {
            const on = highlight === r;
            return (
              <div
                key={r.method + r.path}
                className={`flex flex-wrap items-center gap-4 rounded-xl border-[3px] border-ink px-5 py-4 font-mono text-xl transition-all duration-300 ${
                  on ? "scale-[1.02] bg-[#c9f0e3] shadow-[5px_5px_0_#1d1a19]" : "bg-[#fffdf9]"
                }`}
              >
                <span className="w-20 font-bold">{r.method}</span>
                <span className="font-bold">
                  {r.path.split(/(:\w+)/).map((seg, i) =>
                    seg.startsWith(":") ? (
                      <span key={i} className={`rounded-md px-1 ${shown >= 4 ? "bg-amber" : ""}`}>
                        {seg}
                      </span>
                    ) : (
                      seg
                    )
                  )}
                </span>
                <span className="ml-auto text-ink/80">→ {r.handler}</span>
              </div>
            );
          })}
        </div>

        <div className={`mt-8 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 4 && shown < 5)}`}>
          {shown === 4 && (
            <>
              <span className="text-xl text-ink/75">the router captured:</span>
              <span className="rounded-full border-[3px] border-ink bg-amber px-5 py-1.5 font-mono text-xl font-bold">
                id = &quot;42&quot;
              </span>
            </>
          )}
        </div>

        <div className={`mt-2 flex flex-wrap items-center justify-center gap-3 ${appear(shown >= 5)}`}>
          <span className="text-xl text-ink/75">no route matches →</span>
          <span className="rounded-full border-[3px] border-ink bg-[#ef7370] px-5 py-1.5 font-mono text-xl font-bold">
            404 Not Found
          </span>
        </div>
      </div>

      <Stepper steps={steps} shown={shown} go={go} />
    </div>
  );
}
