"use client";
import { useEffect, useState } from "react";
import { chapters } from "./chapters";

export default function Sidebar() {
  const [active, setActive] = useState(chapters[0].id);
  const [open, setOpen] = useState(null);

  const setSidebar = (v) => {
    setOpen(v);
    document.documentElement.dataset.sidebar = v ? "open" : "closed";
  };

  useEffect(() => {
    const onScroll = () => {
      let current = chapters[0].id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => setSidebar(true)}
        className={`fixed left-3 top-4 z-50 rounded-lg border-2 border-ink bg-chip px-4 py-2 text-2xl font-bold ${
          open === null ? "md:hidden" : open ? "hidden" : ""
        }`}
        aria-label="Open chapters"
      >
        ☰
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[340px] overflow-y-auto border-r border-white/10 bg-side px-[15px] py-6 transition-transform duration-300 ${
          open === null ? "-translate-x-full md:translate-x-0" : open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-dashed border-white/25 px-2 pb-5">
          <div className="flex h-12 w-12 items-end justify-end bg-chip p-1 font-display text-2xl font-extrabold leading-none text-[#2a2a2a]">
            BE
          </div>
          <div>
            <div className="font-display text-xl font-bold leading-tight text-white">Backend Basics</div>
            <div className="text-base text-white/70">ProCode Club</div>
          </div>
          <button
            onClick={() => setSidebar(false)}
            className="ml-auto rounded-md border border-white/20 px-3 py-1.5 text-xl text-white/80 hover:bg-white/10"
            aria-label="Collapse sidebar"
          >
            «
          </button>
        </div>
        <nav className="mt-5 flex flex-col gap-1">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={() => window.innerWidth < 768 && setSidebar(false)}
              className={`flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-xl font-semibold text-white ${
                active === c.id ? "border-amber bg-[#2a2418]" : "border-transparent"
              }`}
            >
              <span className={`font-mono text-base ${active === c.id ? "text-amber" : "text-white/60"}`}>{c.num}</span>
              {c.title}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
