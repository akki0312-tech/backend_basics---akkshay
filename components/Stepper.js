export const appear = (on) =>
  `transition-all duration-500 ${on ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`;

const btn =
  "rounded-full border-[3px] border-ink px-8 py-3 text-2xl font-bold shadow-[5px_5px_0_#1d1a19] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1d1a19] disabled:opacity-40 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0";

export default function Stepper({ steps, shown, go }) {
  const last = steps.length;
  const step = steps[shown - 1];

  return (
    <>
      <div key={shown} className="card mt-8 animate-[reveal-in_0.4s_ease-out] p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span className={`h-6 w-6 rounded-full border-4 border-ink ${step.dot ?? "bg-[#ef7370]"}`} />
          <span className="rounded-lg bg-ink px-4 py-1.5 font-mono text-lg font-bold text-white">{step.pill}</span>
        </div>
        <h3 className="mt-5 font-display text-4xl font-extrabold md:text-5xl">{step.title}</h3>
        <p className="mt-4 text-2xl leading-relaxed md:text-[28px] md:leading-[1.5]">{step.text}</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => go(shown - 1)} disabled={shown === 1} className={`${btn} bg-[#fffdf9]`}>
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i + 1)}
                aria-label={`Go to step ${i + 1}`}
                className={`h-4 w-4 rounded-full border-[3px] border-ink ${i < shown ? "bg-amber" : "bg-transparent"}`}
              />
            ))}
          </div>
          <span className="font-mono text-lg font-bold">
            {shown} / {last}
          </span>
        </div>
        <button onClick={() => go(shown + 1)} disabled={shown === last} className={`${btn} bg-amber`}>
          Next →
        </button>
      </div>
    </>
  );
}
