"use client";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[5px] bg-[#4a3438]">
      <div
        className="h-full"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg,#ef7370,#f5b942,#5bc9a8,#5b8def,#8b5cd6)",
        }}
      />
    </div>
  );
}
