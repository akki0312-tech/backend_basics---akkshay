"use client";
import { useState } from "react";

function handle(method, path) {
  if (path === "/crash") return { status: 500, text: "Internal Server Error", body: { error: "the server broke" } };
  if (path === "/hello" && method === "GET") return { status: 200, text: "OK", body: { message: "Hello from the backend!" } };
  if (path === "/hello" && method === "POST") return { status: 201, text: "Created", body: { saved: "Asha" } };
  return { status: 404, text: "Not Found", body: { error: "no such route" } };
}

const tone = (s) => (s < 300 ? "bg-[#4fbfb0]" : s < 500 ? "bg-amber" : "bg-[#ef7370]");

function Choice({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-[3px] border-ink px-6 py-2 font-mono text-xl font-bold ${
        active ? "bg-amber shadow-[4px_4px_0_#1d1a19]" : "bg-[#fffdf9]"
      }`}
    >
      {children}
    </button>
  );
}

export default function RequestSandbox() {
  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("/hello");
  const [res, setRes] = useState(null);

  const body = method === "POST" ? `{ "name": "Asha" }` : null;
  const panel = "min-h-[220px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-10 text-[#f3ece2]";

  return (
    <div className="card p-8 md:p-12">
      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-2 text-xl text-ink/75">method</span>
        {["GET", "POST"].map((m) => (
          <Choice key={m} active={method === m} onClick={() => { setMethod(m); setRes(null); }}>
            {m}
          </Choice>
        ))}
        <span className="ml-4 mr-2 text-xl text-ink/75">path</span>
        {["/hello", "/nope", "/crash"].map((p) => (
          <Choice key={p} active={path === p} onClick={() => { setPath(p); setRes(null); }}>
            {p}
          </Choice>
        ))}
        <button
          onClick={() => setRes(handle(method, path))}
          className="ml-auto rounded-full border-[3px] border-ink bg-[#4fbfb0] px-8 py-2 text-2xl font-bold shadow-[5px_5px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19]"
        >
          Send ▶
        </button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-3 font-display text-3xl font-extrabold">Request →</div>
          <div className={panel}>
            <div>
              <span className="rounded-md bg-amber px-2 font-bold text-ink">{method}</span> {path} HTTP/1.1
            </div>
            <div>
              <span className="text-[#8fb8ff]">Host:</span> myapp.com
            </div>
            {body && <div className="mt-3 text-[#7be0b8]">{body}</div>}
          </div>
        </div>
        <div>
          <div className="mb-3 font-display text-3xl font-extrabold">← Response</div>
          <div className={panel}>
            {res === null ? (
              <span className="text-white/60">Press &quot;Send&quot; to see the response</span>
            ) : (
              <>
                <div>
                  HTTP/1.1{" "}
                  <span className={`rounded-md px-2 font-bold text-ink ${tone(res.status)}`}>
                    {res.status} {res.text}
                  </span>
                </div>
                <div className="mt-3 text-[#7be0b8]">{JSON.stringify(res.body)}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
