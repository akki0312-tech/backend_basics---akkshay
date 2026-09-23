"use client";
import { useState } from "react";

const initial = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
];

const requests = [
  { method: "GET", path: "/users" },
  { method: "GET", path: "/users/1" },
  { method: "GET", path: "/users/99" },
  { method: "POST", path: "/users", body: { name: "Meera" } },
  { method: "PUT", path: "/users/1", body: { name: "Asha K" } },
  { method: "DELETE", path: "/users/2" },
];

const tone = (s) => (s < 300 ? "bg-[#4fbfb0]" : "bg-[#ef7370]");
const panel =
  "min-h-[220px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-9 text-[#f3ece2] break-words";

function run(db, r) {
  const m = r.path.match(/^\/users\/(\d+)$/);
  const id = m ? Number(m[1]) : null;
  const found = id !== null ? db.find((u) => u.id === id) : null;

  if (r.path === "/users" && r.method === "GET") return { db, status: 200, text: "OK", body: db };
  if (r.path === "/users" && r.method === "POST") {
    const user = { id: Math.max(0, ...db.map((u) => u.id)) + 1, ...r.body };
    return { db: [...db, user], status: 201, text: "Created", body: user };
  }
  if (id !== null && !found) return { db, status: 404, text: "Not Found", body: { error: "no such user" } };
  if (found && r.method === "GET") return { db, status: 200, text: "OK", body: found };
  if (found && r.method === "PUT") {
    const user = { ...found, ...r.body };
    return { db: db.map((u) => (u.id === id ? user : u)), status: 200, text: "OK", body: user };
  }
  if (found && r.method === "DELETE") {
    return { db: db.filter((u) => u.id !== id), status: 200, text: "OK", body: { deleted: id } };
  }
  return { db, status: 405, text: "Method Not Allowed", body: { error: "not supported" } };
}

export default function RestSandbox() {
  const [db, setDb] = useState(initial);
  const [pick, setPick] = useState(0);
  const [res, setRes] = useState(null);

  const r = requests[pick];

  const send = () => {
    const out = run(db, r);
    setDb(out.db);
    setRes(out);
  };

  return (
    <div className="card p-8 md:p-12">
      <div className="flex flex-wrap items-center gap-3">
        {requests.map((x, i) => (
          <button
            key={i}
            onClick={() => {
              setPick(i);
              setRes(null);
            }}
            className={`rounded-full border-[3px] border-ink px-5 py-2 font-mono text-xl font-bold ${
              i === pick ? "bg-amber shadow-[4px_4px_0_#1d1a19]" : "bg-[#fffdf9]"
            }`}
          >
            {x.method} {x.path}
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={send}
          className="rounded-full border-[3px] border-ink bg-[#4fbfb0] px-8 py-2 text-2xl font-bold shadow-[5px_5px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19]"
        >
          Send ▶
        </button>
        <button
          onClick={() => {
            setDb(initial);
            setRes(null);
          }}
          className="rounded-full border-[3px] border-ink bg-[#fffdf9] px-6 py-2 text-xl font-bold"
        >
          Reset data
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="mb-2 font-display text-3xl font-extrabold">Request →</div>
          <div className={panel}>
            <span className="rounded-md bg-amber px-2 font-bold text-ink">{r.method}</span> {r.path}
            {r.body && <div className="mt-3 text-[#7be0b8]">{JSON.stringify(r.body)}</div>}
          </div>
        </div>
        <div>
          <div className="mb-2 font-display text-3xl font-extrabold">← Response</div>
          <div className={panel}>
            {res === null ? (
              <span className="text-white/60">Press &quot;Send&quot;</span>
            ) : (
              <>
                <span className={`rounded-md px-2 font-bold text-ink ${tone(res.status)}`}>
                  {res.status} {res.text}
                </span>
                <div className="mt-3 text-[#7be0b8]">{JSON.stringify(res.body)}</div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 font-display text-3xl font-extrabold">Database</div>
          <div className={panel}>
            {db.length === 0 ? (
              <span className="text-white/60">empty</span>
            ) : (
              db.map((u) => (
                <div key={u.id}>
                  <span className="text-[#8fb8ff]">{u.id}</span> {u.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
