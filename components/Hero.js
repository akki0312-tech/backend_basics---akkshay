export default function Hero() {
  return (
    <section className="hero-bg relative flex min-h-screen items-center justify-center overflow-hidden border-b-2 border-ink px-6 text-center">
      <span className="absolute left-[8%] top-[10%] font-mono text-7xl font-bold text-white/15">{"{ }"}</span>
      <span className="absolute left-[4%] top-[42%] font-mono text-4xl font-bold text-white/20">GET</span>
      <span className="absolute left-[24%] top-[70%] font-mono text-8xl font-bold text-white/15">;</span>
      <span className="absolute right-[10%] top-[14%] font-mono text-7xl font-bold text-white/15">{"=>"}</span>
      <span className="absolute bottom-[14%] right-[6%] -rotate-6 font-mono text-4xl font-bold text-white/20">res.send()</span>

      <div className="relative">
        <div className="mx-auto flex h-[130px] w-[130px] items-end justify-end bg-chip p-3 font-display text-[76px] font-extrabold leading-none text-[#2a2a2a]">
          BE
        </div>
        <h1 className="mt-8 font-display text-7xl font-extrabold text-[#fdf3e4] md:text-[104px] md:leading-none">Backend Basics</h1>
        <p className="mx-auto mt-14 max-w-3xl text-3xl leading-snug text-white/80">
          An illustrated, click-and-run textbook for your first real look under the hood of the backend.
        </p>
        <a
          href="#what-is-backend"
          className="mt-10 inline-block rounded-full bg-amber px-12 py-6 text-3xl font-bold text-ink shadow-[6px_6px_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]"
        >
          Start Reading ↓
        </a>
      </div>
    </section>
  );
}
