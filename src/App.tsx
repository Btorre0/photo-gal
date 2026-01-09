import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Photo = { id: string; src: string };

const BASE = import.meta.env.BASE_URL; // GitHub Pages safe (/photo-gal/)
const img = (file: string) => `${BASE}gallery/${file}`;

const PHOTOS: Photo[] = [
  { id: "anotherover", src: img("anotherover.png") },
  { id: "bearcarving", src: img("bearcarving.png") },
  { id: "blurry", src: img("blurry.png") },
  { id: "carnival", src: img("carnival.png") },
  { id: "cfa", src: img("cfa.png") },
  { id: "closerSF", src: img("closerSF.png") },
  { id: "csuf_Mc", src: img("csuf_Mc.png") },
  { id: "CSUF", src: img("CSUF.png") },
  { id: "CSUFPalmTrees", src: img("CSUFPalmTrees.png") },
  { id: "CSUFParkingStructure", src: img("CSUFParkingStructure.png") },
  { id: "darkroad", src: img("darkroad.JPG") },
  { id: "downtown", src: img("downtown.png") },
  { id: "examat6am", src: img("examat6am.png") },
  { id: "garden", src: img("garden.png") },
  { id: "gym", src: img("gym.png") },
  { id: "highway", src: img("highway.png") },
  { id: "kettlemen", src: img("kettlemen.png") },
  { id: "memorial", src: img("memorial.png") },
  { id: "MorePalms", src: img("MorePalms.png") },
  { id: "overlook", src: img("overlook.png") },
  { id: "plane", src: img("plane.JPG") },
  { id: "plazasonoma", src: img("plazasonoma.png") },
  { id: "rain", src: img("rain.png") },
  { id: "rainbowSF", src: img("rainbowSF.png") },
  { id: "ranch", src: img("ranch.png") },
  { id: "SFgoldenAfar", src: img("SFgoldenAfar.png") },
  { id: "sonoma", src: img("sonoma.png") },
  { id: "sonomahills", src: img("sonomahills.png") },
  { id: "sunset", src: img("sunset.png") },
  { id: "sunsetatCSUF", src: img("sunsetatCSUF.png") },
  { id: "titanseatbranch", src: img("titanseatbranch.png") },
  { id: "tree", src: img("tree.png") },
];

function useLockScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lock]);
}

const LogoMark = () => (
  <div className="mark" aria-label="BTA logo">
    <div className="mark__ring" />
    <div className="mark__letters">BTA</div>
  </div>
);

export default function App() {
  const photos = useMemo(() => PHOTOS, []);

  const [introStage, setIntroStage] = useState<"idle" | "enter" | "exit">("idle");

  // lightbox
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useLockScroll(open);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIntroStage("enter"));
    const t = window.setTimeout(() => setIntroStage("exit"), 900);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.min(photos.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="bta">
      {/* Intro overlay */}
      <div
        className={`intro ${introStage === "enter" ? "intro--enter" : ""} ${
          introStage === "exit" ? "intro--exit" : ""
        }`}
        aria-hidden
      >
        <div className="intro__mark">
          <LogoMark />
          <div className="intro__sub">photo archive</div>
        </div>
      </div>

      {/* Top bar */}
      <header className="topbar">
        <div className="topbar__inner">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <LogoMark />
            <div className="brand__meta">
              <div className="brand__name">BTA</div>
              <div className="brand__tag">photo archive</div>
            </div>
          </button>

          <div className="topbar__right">
            <span className="hint">tap to open</span>
            <span className="dot">•</span>
            <span className="hint">esc to close</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="wrap">
        <div className="titleRow">
          <h1 className="title">Gallery</h1>
          <div className="count">{photos.length} items</div>
        </div>

        {/* VSCO-ish grid */}
        <section className="grid">
          {photos.map((p, i) => (
            <button key={p.id} className="tile" onClick={() => openAt(i)} aria-label="Open photo">
              <img className="tile__img" src={p.src} alt="" loading="lazy" />
              <span className="tile__sheen" aria-hidden />
            </button>
          ))}
        </section>

        <footer className="foot">
          <span>© {new Date().getFullYear()} BTA</span>
          <span className="foot__sep">•</span>
          <span>React + Vite</span>
        </footer>
      </main>

      {/* Lightbox */}
      {open && (
        <div className="lb" role="dialog" aria-modal="true">
          <button className="lb__backdrop" onClick={() => setOpen(false)} aria-label="Close" />

          <div className="lb__top">
            <button className="lb__btn" onClick={() => setOpen(false)}>
              Close
            </button>
            <div className="lb__count">
              {index + 1} / {photos.length}
            </div>
          </div>

          <div className="lb__stage">
            <img className="lb__img" src={photos[index].src} alt="" />
          </div>

          <button
            className="lb__nav lb__nav--left"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            className="lb__nav lb__nav--right"
            onClick={() => setIndex((i) => Math.min(photos.length - 1, i + 1))}
            disabled={index === photos.length - 1}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
