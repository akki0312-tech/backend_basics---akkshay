"use client";
import { useState } from "react";

const presets = [
  {
    label: "user",
    src: `{ name: "Asha", age: 21, tags: ["js", "node"] }`,
    value: () => ({ name: "Asha", age: 21, tags: ["js", "node"] }),
  },
  {
    label: "with a function",
    src: `{ name: "Asha", greet() { return "hi" } }`,
    value: () => ({ name: "Asha", greet() { return "hi"; } }),
  },
  {
    label: "with undefined",
    src: `{ name: "Asha", nickname: undefined }`,
    value: () => ({ name: "Asha", nickname: undefined }),
  },
  {
    label: "with a Date",
    src: `{ joined: new Date("2026-01-15") }`,
    value: () => ({ joined: new Date("2026-01-15T10:00:00Z") }),
  },
];

const GOOD = `{"name":"Asha","age":21}`;
const BAD = `{name: 'Asha',}`;

const panel =
  "min-h-[140px] rounded-2xl border-[3px] border-ink bg-[#221f1c] p-6 font-mono text-[22px] leading-9 text-[#f3ece2] break-words";

function Choice({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-[3px] border-ink px-6 py-2 font-mono text-xl font-bold ${
        active ? "bg-[#8b5cd6] text-white shadow-[4px_4px_0_#1d1a19]" : "bg-[#fffdf9]"
      }`}
    >
      {children}
    </button>
  );
}

export default function SerializeSandbox() {
  const [pick, setPick] = useState(0);
  const [text, setText] = useState(GOOD);
  const [result, setResult] = useState(null);

  const p = presets[pick];
  const out = JSON.stringify(p.value());

  const parse = () => {
    try {
      const v = JSON.parse(text);
      setResult({ ok: true, value: JSON.stringify(v, null, 2) });
    } catch (e) {
      setResult({ ok: false, value: `${e.name}: ${e.message}` });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="card p-8 md:p-12">
        <div className="font-display text-3xl font-extrabold">Serialize: object → text</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-xl text-ink/75">pick an object</span>
          {presets.map((x, i) => (
            <Choice key={x.label} active={pick === i} onClick={() => setPick(i)}>
              {x.label}
            </Choice>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xl font-bold">In your code</div>
            <div className={panel}>{p.src}</div>
          </div>
          <div>
            <div className="mb-2 text-xl font-bold">JSON.stringify(...)</div>
            <div className={`${panel} text-[#7be0b8]`}>{out}</div>
          </div>
        </div>
      </div>

      <div className="card p-8 md:p-12">
        <div className="font-display text-3xl font-extrabold">Deserialize: text → object</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setText(BAD);
              setResult(null);
            }}
            className="rounded-full border-[3px] border-ink bg-[#fbd5d5] px-6 py-2 font-mono text-xl font-bold"
          >
            Break it
          </button>
          <button
            onClick={() => {
              setText(GOOD);
              setResult(null);
            }}
            className="rounded-full border-[3px] border-ink bg-[#fffdf9] px-6 py-2 font-mono text-xl font-bold"
          >
            Reset
          </button>
          <button
            onClick={parse}
            className="ml-auto rounded-full border-[3px] border-ink bg-[#4fbfb0] px-8 py-2 text-2xl font-bold shadow-[5px_5px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19]"
          >
            JSON.parse ▶
          </button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xl font-bold">Text you received (edit me)</div>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult(null);
              }}
              spellCheck={false}
              className={`${panel} w-full resize-none text-[#f3ece2] outline-none`}
            />
          </div>
          <div>
            <div className="mb-2 text-xl font-bold">Result</div>
            <div className={panel}>
              {result === null ? (
                <span className="text-white/60">Press &quot;JSON.parse&quot; to see the result</span>
              ) : (
                <pre className={`whitespace-pre-wrap ${result.ok ? "text-[#7be0b8]" : "text-[#ff8f8f]"}`}>
                  {result.value}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
