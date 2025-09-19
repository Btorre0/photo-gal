import React, { useMemo, useState, useEffect, useCallback } from "react";

const mockPhotos = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1066,
    caption: "morning haze",
    takenAt: "2025-08-12",
    location: "Sonoma, CA",
    tags: ["35mm", "portra400", "fog"],
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1067,
    caption: "coastline",
    takenAt: "2025-06-04",
    location: "Point Reyes, CA",
    tags: ["coast", "nature"],
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1067,
    caption: "night drive",
    takenAt: "2025-02-19",
    location: "LA, CA",
    tags: ["cinematic", "night"],
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1520975922325-24c2f2b8bc29?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1067,
    caption: "soft orange",
    takenAt: "2024-11-09",
    location: "Placentia, CA",
    tags: ["portrait", "50mm"],
  },
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1067,
    caption: "library hush",
    takenAt: "2024-09-01",
    location: "CSUF",
    tags: ["mood", "grain"],
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1526178613816-1a5654550f46?q=80&w=1600&auto=format&fit=crop",
    w: 1600,
    h: 1067,
    caption: "river bend",
    takenAt: "2024-05-27",
    location: "Yosemite, CA",
    tags: ["hike", "water"],
  },
];

function useBreakpoints() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 1024) setCols(3);
      else if (w >= 640) setCols(2);
      else setCols(1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

const Avatar = ({ url }: { url: string }) => (
  <img
    src={url}
    alt="avatar"
    className="h-20 w-20 rounded-full object-cover ring-2 ring-black/5"
  />
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full border border-black/10 text-xs tracking-wide">
    {children}
  </span>
);

const Header = () => (
  <header className="max-w-5xl mx-auto px-4 pt-10 pb-6">
    <div className="flex items-center gap-6">
      <Avatar url="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop" />
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">Beatriz Torres</h1>
        <p className="text-sm text-black/60">@btorre — CSUF • CA</p>
        <p className="mt-2 text-sm max-w-xl">
          Clean, quiet frames. Film & digital. Building tools. 
          <a className="underline ml-1" href="#" target="_blank">sonomacleans.com</a>
        </p>
        <div className="mt-3 flex gap-2">
          <Pill>journal</Pill>
          <Pill>gallery</Pill>
          <Pill>contact</Pill>
        </div>
      </div>
    </div>
  </header>
);

const PhotoCard = ({ p, onOpen }: { p: any; onOpen: (id: string) => void }) => (
  <figure
    className="mb-4 break-inside-avoid cursor-zoom-in group relative"
    onClick={() => onOpen(p.id)}
  >
    <img
      src={p.src}
      alt={p.caption}
      className="w-full rounded-2xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
      loading="lazy"
    />
    <figcaption className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/90 bg-black/40 px-2 py-1 rounded">
      {p.caption} • {p.location} • {new Date(p.takenAt).toLocaleDateString()}
    </figcaption>
  </figure>
);

const Lightbox = ({
  open,
  items,
  currentId,
  onClose,
}: {
  open: boolean;
  items: any[];
  currentId: string | null;
  onClose: () => void;
}) => {
  const index = useMemo(
    () => (currentId ? items.findIndex((i) => i.id === currentId) : -1),
    [currentId, items]
  );
  const [i, setI] = useState(index);
  useEffect(() => setI(index), [index]);

  const prev = useCallback(() => setI((v) => Math.max(0, v - 1)), []);
  const next = useCallback(() => setI((v) => Math.min(items.length - 1, v + 1)), [items.length]);

  if (!open || i < 0) return null;
  const photo = items[i];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between p-4 text-white">
        <button className="text-sm opacity-80 hover:opacity-100" onClick={onClose}>
          close
        </button>
        <div className="text-sm opacity-80">
          {i + 1} / {items.length}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <img src={photo.src} className="max-h-[80vh] max-w-full rounded-xl shadow-lg" />
      </div>
      <div className="p-4 text-white/90 text-sm max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div>
            <div className="font-medium">{photo.caption}</div>
            <div className="opacity-80">
              {photo.location} • {new Date(photo.takenAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {photo.tags?.map((t: string) => (
              <span key={t} className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
        <button
          className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/10 text-white border border-white/20"
          onClick={prev}
          disabled={i === 0}
        >
          ‹
        </button>
        <button
          className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/10 text-white border border-white/20"
          onClick={next}
          disabled={i === items.length - 1}
        >
          ›
        </button>
      </div>
    </div>
  );
};

const Tabs = ({ tab, setTab }: { tab: string; setTab: (t: string) => void }) => (
  <div className="max-w-5xl mx-auto px-4">
    <nav className="flex gap-6 text-sm border-b border-black/10">
      {[
        { id: "gallery", label: "Gallery" },
        { id: "journal", label: "Journal" },
        { id: "collections", label: "Collections" },
      ].map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`py-3 -mb-px border-b-2 transition-all ${
            tab === t.id ? "border-black" : "border-transparent text-black/50 hover:text-black"
          }`}
        >
          {t.label}
        </button>
      ))}
    </nav>
  </div>
);

const Gallery = ({ photos, onOpen }: { photos: any[]; onOpen: (id: string) => void }) => {
  const cols = useBreakpoints();
  // Build Masonry columns
  const columns = useMemo(() => {
    const arr: any[][] = Array.from({ length: cols }, () => []);
    const heights = Array(cols).fill(0);
    for (const p of photos) {
      const aspect = p.h === 0 ? 1 : p.w / p.h;
      const estimatedHeight = 300 / aspect; // heuristic for balancing
      const idx = heights.indexOf(Math.min(...heights));
      arr[idx].push(p);
      heights[idx] += estimatedHeight;
    }
    return arr;
  }, [cols, photos]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col">
            {col.map((p) => (
              <PhotoCard key={p.id} p={p} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const JournalEmpty = () => (
  <div className="max-w-5xl mx-auto px-4 py-24 text-center text-black/60">
    Journal coming soon — add long‑form entries with image sets.
  </div>
);

export default function VSCOProfile() {
  const [tab, setTab] = useState("gallery");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const openLightbox = (id: string) => {
    setCurrentId(id);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // pretend-fetch photos
  const photos = mockPhotos;

  return (
    <main className="min-h-screen bg-[#faf9f7] text-black">
      <Header />
      <Tabs tab={tab} setTab={setTab} />
      {tab === "gallery" && <Gallery photos={photos} onOpen={openLightbox} />}
      {tab === "journal" && <JournalEmpty />}
      {tab === "collections" && <JournalEmpty />}
      <Lightbox open={lightboxOpen} items={photos} currentId={currentId} onClose={closeLightbox} />
      <footer className="max-w-5xl mx-auto px-4 py-10 text-xs text-black/50">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} btorre</span>
          <span>Built with React • Tailwind • no‑framework</span>
        </div>
      </footer>
    </main>
  );
}