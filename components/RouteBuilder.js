"use client";
import { useState } from "react";
import { matchRoute } from "./router";

const initial = [
  { method: "GET", path: "/hello", reply: "Hello from the backend!" },
  { method: "GET", path: "/users/:id", reply: "Profile page for user :id" },
];

const panel =
  "min-h-[200px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-9 text-[#f3ece2] break-words";
const input =
  "rounded-xl border-[3px] border-ink bg-[#fffdf9] px-4 py-2 font-mono text-xl outline-none focus:bg-[#fff8dc]";
const tone = (s) => (s === 200 ? "bg-[#4fbfb0]" : s === 404 ? "bg-[#ef7370]" : "bg-amber");
const label = { 200: "OK", 404: "Not Found", 405: "Method Not Allowed" };

function fill(reply, params) {
  return Object.entries(params).reduce((t, [k, v]) => t.split(`:${k}`).join(v), reply);
}

export default function RouteBuilder() {
  const [routes, setRoutes] = useState(initial);
  const [nm, setNm] = useState("GET");
  const [np, setNp] = useState("/about");
  const [nr, setNr] = useState("About this app");

  const [rm, setRm] = useState("GET");
  const [rp, setRp] = useState("/users/7");
  const [res, setRes] = useState(null);

  const addRoute = () => {
    const path = np.startsWith("/") ? np.trim() : `/${np.trim()}`;
    if (!nr.trim() || routes.length >= 8) return;
    setRoutes([...routes, { method: nm, path, reply: nr.trim() }]);
    setRes(null);
  };

  const send = () => {
    const path = rp.startsWith("/") ? rp.trim() : `/${rp.trim()}`;
    const hit = matchRoute(routes, rm, path);
    setRes({ ...hit, path });
  };

  const select = (v, set, opts) => (
    <select value={v} onChange={(e) => set(e.target.value)} className={`${input} font-bold`}>
      {opts.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="card p-8 md:p-12">
        <div className="font-display text-3xl font-extrabold">1. Build your routes</div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {select(nm, setNm, ["GET", "POST", "PUT", "DELETE"])}
          <input value={np} onChange={(e) => setNp(e.target.value)} className={`${input} w-56`} aria-label="path" />
          <span className="font-mono text-2xl font-bold">→ reply</span>
          <input value={nr} onChange={(e) => setNr(e.target.value)} className={`${input} min-w-[240px] flex-1`} aria-label="reply" />
          <button
            onClick={addRoute}
            className="rounded-full border-[3px] border-ink bg-amber px-6 py-2 text-xl font-bold shadow-[4px_4px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19]"
          >
            Add route
          </button>
        </div>
        <p className="mt-3 text-lg text-ink/70">
          Tip: use <span className="inline-code">:id</span> in a path for a variable part, e.g. /posts/:id
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {routes.map((r, i) => (
            <div
              key={i}
              className={`flex flex-wrap items-center gap-4 rounded-xl border-[3px] border-ink px-5 py-3 font-mono text-xl transition-all ${
                res && res.route === r && res.status === 200 ? "bg-[#c9f0e3]" : "bg-[#fffdf9]"
              }`}
            >
              <span className="w-20 font-bold">{r.method}</span>
              <span className="font-bold">{r.path}</span>
              <span className="ml-auto text-ink/80">→ &quot;{r.reply}&quot;</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-8 md:p-12">
        <div className="font-display text-3xl font-extrabold">2. Send a request to it</div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {select(rm, setRm, ["GET", "POST", "PUT", "DELETE"])}
          <input value={rp} onChange={(e) => setRp(e.target.value)} className={`${input} w-64`} aria-label="request path" />
          <button
            onClick={send}
            className="ml-auto rounded-full border-[3px] border-ink bg-[#4fbfb0] px-8 py-2 text-2xl font-bold shadow-[5px_5px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19]"
          >
            Send ▶
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 font-display text-3xl font-extrabold">Router says</div>
            <div className={panel}>
              {res === null ? (
                <span className="text-white/60">Press &quot;Send&quot;</span>
              ) : res.route ? (
                <>
                  matched <span className="text-[#7be0b8]">{res.route.method} {res.route.path}</span>
                  {Object.keys(res.params).length > 0 && (
                    <div className="text-[#8fb8ff]">params: {JSON.stringify(res.params)}</div>
                  )}
                  {res.status === 405 && <div className="text-[#ffd27f]">…but not for {rm}</div>}
                </>
              ) : (
                <span className="text-[#ff8f8f]">no route matches {res.path}</span>
              )}
            </div>
          </div>
          <div>
            <div className="mb-2 font-display text-3xl font-extrabold">← Response</div>
            <div className={panel}>
              {res === null ? (
                <span className="text-white/60">waiting…</span>
              ) : (
                <>
                  <span className={`rounded-md px-2 font-bold text-ink ${tone(res.status)}`}>
                    {res.status} {label[res.status]}
                  </span>
                  <div className="mt-3 text-[#7be0b8]">
                    {res.status === 200 ? fill(res.route.reply, res.params) : ""}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
