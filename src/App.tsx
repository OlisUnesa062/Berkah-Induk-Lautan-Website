import { FormEvent, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds the `in` class to a wrapper once it scrolls into view (fires once). */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Counts up to the numeric part of a value like "1,200+" or "24/7" once visible. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : "";
  const hasComma = match ? match[1].includes(",") : false;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || suffix.includes("/") || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  const shown = n === null ? target : n;
  const text = hasComma ? shown.toLocaleString("en-US") : String(shown);
  return <span ref={ref} aria-label={value}>{match && !suffix.includes("/") ? text + suffix : value}</span>;
}

type IconName = "arrow" | "crew" | "ship" | "anchor" | "shield" | "chat" | "check" | "globe" | "compass" | "phone" | "mail" | "pin" | "clock" | "award";

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    crew: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0112 0v3M16 4a3 3 0 010 6M18 14a5 5 0 013 5v2" /></>,
    ship: <><path d="M3 15l9-4 9 4-3 6H6zM6 13V6h12v7M9 6V3h6v3M12 11v10M2 22q3-2 5 0t5 0 5 0 5 0" /></>,
    anchor: <><circle cx="12" cy="5" r="3" /><path d="M12 8v13M7 11h10M3 14v3a9 9 0 0018 0v-3M1 16l2-2 3 2M18 16l3-2 2 2" /></>,
    shield: <><path d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6zM8 12l3 3 5-6" /></>,
    chat: <><path d="M21 11a9 9 0 01-9 9H3l2-5a9 9 0 1116-4zM8 10h8M8 14h5" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="M7 12l3 3 7-7" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 6h14M5 18h14" /></>,
    compass: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
  };
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const slides = [
  {
    src: "https://images.unsplash.com/photo-1580166463495-ab4d21922c22?auto=format&fit=crop&w=3840&q=95",
    alt: "Kapal tanker kargo di laut lepas HD",
    caption: "CRUDE & PRODUCT TANKERS",
    tint: "linear-gradient(90deg, rgba(0, 32, 58, 0.88) 0%, rgba(0, 60, 96, 0.52) 42%, rgba(0, 24, 42, 0.2) 78%), linear-gradient(0deg, rgba(0, 28, 48, 0.72), transparent 40%)",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=3840&q=95",
    alt: "Kapal kargo kontainer internasional HD membelah laut lepas",
    caption: "CONTAINER CARGO FLEET",
    tint: "linear-gradient(90deg, rgba(0, 38, 66, 0.9) 0%, rgba(0, 75, 115, 0.55) 42%, rgba(4, 30, 50, 0.22) 78%), linear-gradient(0deg, rgba(0, 32, 54, 0.75), transparent 42%)",
  },
  {
    src: "https://images.unsplash.com/photo-1722450132734-a2e503bd0751?auto=format&fit=crop&w=3840&q=95",
    alt: "Kapal samudra melaju di laut biru",
    caption: "BULK CARRIERS & TANKERS",
    tint: "linear-gradient(90deg, rgba(4, 36, 62, 0.9) 0%, rgba(8, 72, 110, 0.52) 44%, rgba(6, 32, 52, 0.2) 80%), linear-gradient(0deg, rgba(2, 26, 46, 0.7), transparent 38%)",
  },
  {
    src: "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?auto=format&fit=crop&w=3840&q=95",
    alt: "Pelabuhan kargo logistik dan kapal kontainer HD",
    caption: "PORT CARGO LOGISTICS",
    tint: "linear-gradient(90deg, rgba(2, 34, 58, 0.88) 0%, rgba(10, 68, 104, 0.5) 44%, rgba(4, 30, 50, 0.18) 80%), linear-gradient(0deg, rgba(2, 28, 48, 0.68), transparent 38%)",
  },
  {
    src: "https://images.unsplash.com/photo-1634638026221-4c1c4cf9f881?auto=format&fit=crop&w=3840&q=95",
    alt: "Kapal tanker energi LNG samudra HD",
    caption: "ENERGY & LNG CARRIERS",
    tint: "linear-gradient(90deg, rgba(8, 30, 50, 0.9) 0%, rgba(16, 60, 92, 0.5) 44%, rgba(8, 34, 54, 0.2) 78%), linear-gradient(0deg, rgba(4, 24, 42, 0.72), transparent 40%)",
  },
];

// Teks hero per bahasa: indeks mengikuti urutan `slides` (1 gambar = 1 bahasa).
const heroTexts = [
  {
    lang: "id",
    tagline: "Bersama Mengarungi Peluang Tanpa Batas",
    line1: "Menghubungkan insan, kapal, dan peluang terbaik.",
    line2: "Pelayaran Anda berikutnya dimulai bersama mitra yang bisa dipercaya.",
  },
  {
    lang: "en",
    tagline: "Navigating Boundless Opportunities Together",
    line1: "Connecting exceptional people, vessels, and opportunities.",
    line2: "Your next voyage starts with a partner you can trust.",
  },
  {
    lang: "zh",
    tagline: "携手扬帆，共赴无限机遇",
    line1: "连接卓越的人才、船舶与机遇。",
    line2: "您的下一次航程，从值得信赖的伙伴开始。",
  },
  {
    lang: "ja",
    tagline: "共に航海へ、無限の可能性を切り拓く",
    line1: "優れた人材、船舶、そして機会をつなぎます。",
    line2: "次の航海は、信頼できるパートナーとともに始まります。",
  },
  {
    lang: "es",
    tagline: "Navegando Juntos Hacia Oportunidades Sin Límites",
    line1: "Conectamos personas excepcionales, buques y oportunidades.",
    line2: "Su próximo viaje comienza con un socio de confianza.",
  },
];

// Arti nama perusahaan, muncul sebagai kartu saat tiap kata di-hover / di-tap / di-fokus.
const introWords = [
  {
    word: "BERKAH",
    phonetic: "/bər·kah/",
    gloss: "Blessing",
    meaning:
      "A blessing that multiplies as it is shared. Every voyage we support begins with sincerity, so that good fortune reaches seafarers, shipowners, and the families waiting ashore.",
  },
  {
    word: "INDUK",
    phonetic: "/in·duk/",
    gloss: "The Origin That Protects",
    meaning:
      "The source that nurtures and shelters. Like the mother ship at the heart of a fleet, we are the steady home base that our crews and partners can always return to.",
  },
  {
    word: "LAUTAN",
    phonetic: "/lau·tan/",
    gloss: "The Boundless Ocean",
    meaning:
      "The open water that joins nations together. Indonesia's seas are our roots, and the world's horizons are where every journey is meant to arrive.",
  },
];

const heroEffects = ["blur", "rise", "wipe", "flip", "zoom", "drift"] as const;

// Efek pergantian GAMBAR hero. Hapus/ubah isi daftar ini untuk memilih efek yang dipakai.
// Kalau hanya 1 efek di daftar, efek itu selalu dipakai (tidak acak).
// Definisi animasinya ada di index.css pada blok "Hero image transitions".
const heroImageEffects = ["fade", "wipe", "diagonal", "circle", "zoom"] as const;

const services: {
  title: string;
  icon: IconName;
  tag: string;
  text: string;
  detail: string;
  metrics: string[];
}[] = [
  {
    title: "Manning Agent",
    icon: "crew",
    tag: "PRIMARY CORE CAPABILITY",
    text: "The right people. Ready for your next voyage.",
    detail: "We connect qualified Indonesian seafarers with vessel operators worldwide. Our crewing support covers candidate selection, document coordination, and crew deployment, with fair recruitment and no fees charged to seafarers.",
    metrics: ["1,200+ Verified Crew Pool", "Zero Placement Fee Policy", "MLC 2006 & STCW Certified"]
  },
  {
    title: "Ship Broker",
    icon: "globe",
    tag: "COMMERCIAL BROKERAGE",
    text: "Connecting vessels with the right opportunities.",
    detail: "We support shipowners and operators in exploring vessel and chartering opportunities, facilitating communication between parties and coordinating the next steps of a maritime transaction.",
    metrics: ["Chartering & Sales Matching", "Direct Commercial Liaison", "Cross-Strait Deal Coordination"]
  },
  {
    title: "Ship Management",
    icon: "ship",
    tag: "TECHNICAL & OPERATIONS",
    text: "Reliable operations. Complete peace of mind.",
    detail: "Our ship management services support the coordination of vessel operations, crew requirements, maintenance planning, and compliance needs. Speak with us about a solution tailored to your fleet.",
    metrics: ["Preventive Maintenance", "Flag State Regulatory Compliance", "Safety & ISM Auditing Support"]
  },
  {
    title: "Port Agent",
    icon: "anchor",
    tag: "PORT HUSBANDRY & CLEARANCE",
    text: "Seamless port calls, from arrival to departure.",
    detail: "We coordinate port-call requirements, local communications, documentation, and vessel support to help owners, masters, and operators navigate arrival and departure efficiently.",
    metrics: ["24/7 Berth & Customs Clearance", "Bunkering & Provisions Dispatch", "Crew Change & Husbandry Logistics"]
  },
];

const benefits = [
  {
    number: "01",
    title: "Ready-to-join crew",
    text: "Qualified seafarers, rigorously vetted, medically verified, and prepared for immediate deployment on international trade routes.",
    icon: "crew" as const,
    highlight: "Pre-screened & Medical Cleared"
  },
  {
    number: "02",
    title: "One point of contact",
    text: "Direct, crystal-clear operational coordination around the clock. A dedicated maritime partner that answers whenever your vessel calls.",
    icon: "chat" as const,
    highlight: "24/7 Dedicated Voyage Desk"
  },
  {
    number: "03",
    title: "MLC-compliant contracts",
    text: "Fair, transparent terms designed in full compliance with the Maritime Labour Convention 2006 and international maritime laws.",
    icon: "shield" as const,
    highlight: "100% Ethical & Legal Standards"
  },
  {
    number: "04",
    title: "No fee to seafarers",
    text: "Ethical recruitment without economic barriers. We ensure candidate integrity through merit-based placement with zero seafarer fees.",
    icon: "check" as const,
    highlight: "Strict Zero-Fee Policy"
  },
];

const stats = [
  { value: "1,200+", label: "Qualified Seafarers", sub: "Active, vetted talent pool ready for global voyages" },
  { value: "100%", label: "MLC 2006 Compliance", sub: "Strict adherence to international maritime labor standards" },
  { value: "50+", label: "Global Port Calls", sub: "Direct operational coordination across major sea corridors" },
  { value: "24/7", label: "Operations Support", sub: "Continuous shore-to-vessel dispatch and husbanding assistance" },
];

const emptyForm = { name: "", email: "", company: "", service: "", message: "" };

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [textSlide, setTextSlide] = useState(0);
  const [textLeaving, setTextLeaving] = useState(false);
  const [fx, setFx] = useState<(typeof heroEffects)[number]>("blur");
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [imgFx, setImgFx] = useState<(typeof heroImageEffects)[number]>("fade");
  const [lastSlide, setLastSlide] = useState(0);

  // Dihitung saat render (bukan di effect) supaya kelas efek sudah benar sejak frame pertama.
  if (slide !== lastSlide) {
    setPrevSlide(lastSlide);
    setLastSlide(slide);
    setImgFx((prev) => {
      const options = heroImageEffects.length > 1 ? heroImageEffects.filter((effect) => effect !== prev) : heroImageEffects;
      return options[Math.floor(Math.random() * options.length)];
    });
  }
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [openWord, setOpenWord] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const introRef = useRevealOnce<HTMLDivElement>();
  const aboutRef = useRevealOnce<HTMLElement>();
  const statsRef = useRevealOnce<HTMLDivElement>();
  const contactRef = useRevealOnce<HTMLDivElement>();

  useEffect(() => {
    if (activeService === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveService(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeService]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [paused]);

  // Gambar lama tetap tampil di belakang sampai gambar baru selesai masuk.
  useEffect(() => {
    if (prevSlide === null) return;
    const timer = window.setTimeout(() => setPrevSlide(null), 2000);
    return () => window.clearTimeout(timer);
  }, [prevSlide, slide]);

  // Ganti teks hero: animasi keluar dulu, lalu bahasa baru masuk dengan efek acak.
  useEffect(() => {
    if (slide === textSlide) return;
    setTextLeaving(true);
    const timer = window.setTimeout(() => {
      setFx((prev) => {
        const options = heroEffects.filter((effect) => effect !== prev);
        return options[Math.floor(Math.random() * options.length)];
      });
      setTextSlide(slide);
      setTextLeaving(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [slide, textSlide]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 56);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--scroll", String(Math.min(1, y / max)));
      document.body.classList.toggle("past-hero", y > window.innerHeight * 0.42);
      // Scrollspy: menu aktif = section terakhir yang puncaknya sudah melewati 35% layar.
      let current = "home";
      for (const id of ["home", "about", "services", "contact"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActiveNav(current);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <>
      <header className={scrolled ? "header scrolled" : "header"}>
        <div className="container nav">
          <a href="#home" className="brand" aria-label="BIL home">
            <img src="/images/bil-logo.png" alt="BIL — Berkah Induk Lautan" />
            <span>BERKAH<br />INDUK LAUTAN</span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label="Toggle navigation">
            {menuOpen ? "✕" : "☰"}
          </button>
          <nav id="main-nav" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            {[["Home", "home"], ["About Us", "about"], ["Our Services", "services"]].map(([label, id]) => (
              <a
                key={id}
                className={activeNav === id ? "active" : undefined}
                aria-current={activeNav === id ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
            <a className="button small" href="#contact" onClick={() => setMenuOpen(false)}>
              {"Let's Talk"} <Icon name="arrow" />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((item, index) => {
            const zoomClass = index % 2 === 0 ? "zoom-in" : "zoom-out";
            const state = index === slide ? `active img-${imgFx}` : index === prevSlide ? "leaving" : "";
            return (
              <div
                className={`hero-slide ${state} ${zoomClass}`}
                key={item.src}
                aria-hidden={index !== slide}
              >
                <img className="hero-image" src={item.src} alt={item.alt} fetchPriority={index === 0 ? "high" : "low"} />
                <div className="hero-overlay" style={{ background: item.tint }} />
              </div>
            );
          })}
          <div className="container hero-content">
            <div className="eyebrow light"><span /> YOUR TRUSTED MARITIME PARTNER</div>
            <p className="hero-kicker">{slides[slide].caption}</p>
            <h1>BERKAH<br />INDUK <span>LAUTAN.</span></h1>
            <div
              key={textSlide}
              className={`hero-lang fx-${fx} ${textLeaving ? "is-out" : "is-in"}`}
              lang={heroTexts[textSlide].lang}
            >
              <p className="tagline">{heroTexts[textSlide].tagline}</p>
              <p className="hero-description">
                {heroTexts[textSlide].line1}
                <br className="desktop-break" /> {heroTexts[textSlide].line2}
              </p>
            </div>
            <div className="hero-actions">
              <a className="button" href="#services">Our Services <Icon name="arrow" /></a>
              <a className="text-link" href="#about">Discover BIL <span>↗</span></a>
            </div>
          </div>
          <div className="hero-controls" role="tablist" aria-label="Hero gallery">
            {slides.map((item, index) => (
              <button
                key={item.caption}
                className={index === slide ? "dot active" : "dot"}
                aria-label={`Show ${item.caption}`}
                aria-selected={index === slide}
                onClick={() => {
                  setPaused(true);
                  setSlide(index);
                }}
              >
                <span className="dot-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="dot-bar" />
              </button>
            ))}
          </div>
          <div className="container hero-bottom">
            <span>INDONESIAN ROOTS. GLOBAL HORIZONS.</span>
            <a href="#about">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </section>

        {/* Maritime Telemetry Corridor Strip */}
        <div className="capabilities">
          <div className="container capabilities-inner">
            <div className="telemetry-badge">
              <span className="telemetry-dot" />
              <span>INDONESIA MARITIME CORRIDOR • 06°12'S 106°48'E</span>
            </div>
            <div className="capabilities-pills">
              <span className="pill"><Icon name="crew" /> CREWING LOGISTICS</span>
              <i />
              <span className="pill"><Icon name="ship" /> FLEET OPERATIONS</span>
              <i />
              <span className="pill"><Icon name="anchor" /> PORT AGENCY</span>
            </div>
            <div className="global-note">
              <Icon name="compass" />
              <span>Sunda & Malacca Straits Gateway</span>
            </div>
          </div>
        </div>

        {/* SECTION 01 / EDITORIAL MANIFESTO */}
        <section className="intro-band">
          <div className="container intro-inner reveal-group" ref={introRef}>
            <div className="editorial-meta rv" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="meta-line" />
              <span className="meta-tag">FULL SERVICE MARITIME AGENCY</span>
              <span className="meta-line" />
            </div>
            <h2 className="intro-title rv" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="intro-pre">WE ARE</span>
              <span className="intro-words">
                {introWords.map((item, index) => (
                  <button
                    type="button"
                    key={item.word}
                    className={openWord === item.word ? `intro-word w${index} open` : `intro-word w${index}`}
                    aria-expanded={openWord === item.word}
                    onClick={() => setOpenWord(openWord === item.word ? null : item.word)}
                    onBlur={() => setOpenWord(null)}
                  >
                    <span className="intro-word-text">{item.word}{index === introWords.length - 1 ? "." : ""}</span>
                    <span className="word-pop" role="tooltip">
                      <span className="word-pop-top">
                        <b>{item.word}</b>
                        <i>{item.phonetic}</i>
                      </span>
                      <span className="word-pop-gloss">{item.gloss}</span>
                      <span className="word-pop-text">{item.meaning}</span>
                    </span>
                  </button>
                ))}
              </span>
            </h2>
            <p className="intro-hint rv" style={{ "--i": 2 } as React.CSSProperties}>
              <span /> Hover each word to discover its meaning
            </p>
            <div className="gold-rule" />
            <p className="intro-lead rv" style={{ "--i": 3 } as React.CSSProperties}>
              BIL is a trusted maritime partner for shipowners, vessel charterers, and cargo interests along Indonesia’s vital maritime routes and beyond.
            </p>
            <p className="intro-sub rv" style={{ "--i": 4 } as React.CSSProperties}>
              When appointed as agents for your vessel, crew, or cargo, we become your dedicated onshore headquarters for every nautical mile of the voyage.
            </p>
            <ul className="intro-chips rv" style={{ "--i": 5 } as React.CSSProperties}>
              {["Crewing", "Ship Agency", "Port Services", "Cargo Support"].map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 02 / WHO WE ARE */}
        <section id="about" className="section container about reveal-group" ref={aboutRef}>
          <div className="about-visual-wrapper rv rv-left">
            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2FwYWwlMjBwZXNpYXJ8ZW58MHx8MHx8fDA%3D"
                alt="Kapal pesiar di laut"
                loading="lazy"
              />
              <div className="about-chip">
                <span className="status-ping" />
                <div>
                  <strong>Indonesian Seafarers</strong>
                  <small>Placed with operators worldwide</small>
                </div>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <div className="eyebrow rv" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="eyebrow-num">01</span> / WHO WE ARE
            </div>
            <h2 className="rv" style={{ "--i": 1 } as React.CSSProperties}>Welcome to BIL.<br /><span>Your partner at sea.</span></h2>
            <p className="about-lead rv" style={{ "--i": 2 } as React.CSSProperties}>
              Great voyages begin with the right people. At Berkah Induk Lautan, we connect qualified Indonesian seafarers with ship operators around the world.
            </p>
            <p className="about-body rv" style={{ "--i": 3 } as React.CSSProperties}>
              From crewing to comprehensive maritime services, we bring a people-first approach, dependable expertise, and a shared commitment to every journey. We coordinate deployment logistics, regulatory compliance, and port calls so your vessels operate with maximum efficiency.
            </p>

            <div className="about-pillars rv" style={{ "--i": 4 } as React.CSSProperties}>
              <div className="pillar-item">
                <div className="pillar-icon"><Icon name="check" /></div>
                <div>
                  <h4>People-First Approach</h4>
                  <p>Ethical recruitment, fair crew welfare, and transparent placement.</p>
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-icon"><Icon name="check" /></div>
                <div>
                  <h4>Trusted Partnerships</h4>
                  <p>Long-term relationships with international principals and shipowners.</p>
                </div>
              </div>
            </div>

            <div className="about-actions-row rv" style={{ "--i": 5 } as React.CSSProperties}>
              <a className="button" href="#contact">
                {"Let's navigate the future together"} <Icon name="arrow" />
              </a>
              <a className="text-link" href="#services">
                Explore capabilities <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 03 / WHY PRINCIPALS WORK WITH US */}
        <section className="why-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-num">02</span> / THE BIL DIFFERENCE
                </div>
                <h2>Why principals<br />work with us.</h2>
              </div>
              <div className="heading-sub-box">
                <p>
                  More than a service provider.<br />A dedicated maritime partner invested in your fleet’s operational success.
                </p>
              </div>
            </div>

            <div className="principles-grid">
              {benefits.map((benefit) => (
                <article className="principle-card" key={benefit.title}>
                  <div className="principle-accent-bar" />
                  <div className="principle-header">
                    <span className="principle-idx">{benefit.number}</span>
                    <div className="principle-icon-box">
                      <Icon name={benefit.icon} />
                    </div>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                  <div className="principle-footer">
                    <span className="principle-badge">{benefit.highlight}</span>
                    <span className="principle-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FULL-WIDTH MARITIME VISUAL BREAK */}
        <section className="maritime-visual-break">
          <img
            className="visual-break-img"
            src="/images/world-map.jpg"
            alt="Peta dunia dengan jalur pelayaran global"
            width={1905}
            height={825}
            loading="lazy"
          />
          <div className="visual-break-overlay" />
          <div className="container visual-break-content">
            <div className="visual-meta-badge">
              <Icon name="compass" />
              <span>ARCHIPELAGIC EXCELLENCE • STRATEGIC SHIPPING CORRIDOR</span>
            </div>
            <h2>Connecting Indonesia’s Maritime Power to Global Horizons.</h2>
            <p>
              Safeguarding seafarer welfare, accelerating fleet readiness, and delivering seamless port calls across the Indo-Pacific corridor.
            </p>
            <div className="visual-coords">
              <span>LAT 06°08'S — LONG 106°53'E</span>
              <span className="coord-dot">•</span>
              <span>PORT OF TANJUNG PRIOK & ARCHIPELAGIC SEA LANES</span>
            </div>
          </div>
        </section>

        {/* SECTION 04 / WHAT WE DO (Asymmetrical Services Grid) */}
        <section id="services" className="section container services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-num">03</span> / WHAT WE DO
              </div>
              <h2>A complete maritime<br />partner. <span>One BIL.</span></h2>
            </div>
            <p>Practical solutions for your people,<br />your vessels, and your business.</p>
          </div>

          <div className="asymmetric-services-grid">
            {/* Featured Manning Agent Card */}
            <div
              className="service-card featured"
              onClick={() => setActiveService(0)}
              role="button"
              tabIndex={0}
              aria-label="Learn more about Manning Agent"
            >
              <div className="featured-card-bg" />
              <div className="featured-card-overlay" />
              <div className="featured-card-body">
                <div className="featured-top-badge">
                  <span className="pulse-glow" />
                  <span>{services[0].tag}</span>
                </div>
                <div className="featured-idx">01</div>
                <h3>{services[0].title}</h3>
                <p className="featured-desc">{services[0].text}</p>
                <div className="featured-metrics-row">
                  {services[0].metrics.map((m) => (
                    <span key={m} className="metric-chip">
                      <Icon name="check" /> {m}
                    </span>
                  ))}
                </div>
                <div className="featured-cta">
                  <span>Explore crewing & recruitment solutions</span>
                  <Icon name="arrow" />
                </div>
              </div>
            </div>

            {/* Sub-cards */}
            <div className="services-sub-column">
              {services.slice(1).map((service, index) => (
                <button
                  className="service-card sub-card"
                  key={service.title}
                  onClick={() => setActiveService(index + 1)}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="sub-card-top">
                    <div className="sub-icon-wrap">
                      <Icon name={service.icon} />
                    </div>
                    <span className="sub-idx">0{index + 2}</span>
                  </div>
                  <span className="sub-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="service-link">
                    <span>Explore service details</span>
                    <Icon name="arrow" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="service-note">
            <span className="status-dot" /> Supporting your journey, from the first connection to the next port.
          </div>
        </section>

        {/* SECTION 05 / EDITORIAL STATS */}
        <section className="stats-section">
          <div className="container reveal-group" ref={statsRef}>
            <div className="stats-intro">
              <div className="eyebrow light">
                <span className="eyebrow-num">04</span> / MEASURABLE IMPACT
              </div>
              <h2>Built on Maritime Standards at Scale</h2>
              <span className="stats-coords" aria-hidden="true">06°12′S — 106°48′E</span>
            </div>
            <div className="stats-grid">
              {stats.map((item, index) => (
                <div className="stat-card reveal-item" style={{ "--i": index } as React.CSSProperties} key={item.label}>
                  <span className="stat-idx" aria-hidden="true">0{index + 1}</span>
                  <div className="stat-value"><CountUp value={item.value} /></div>
                  <div className="stat-title">{item.label}</div>
                  <p className="stat-sub">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 06 / CONTACT & INQUIRY */}
        <section id="contact" className="contact">
          <div className="container reveal-group" ref={contactRef}>
            <div className="contact-top reveal-item">
              <div>
                <div className="eyebrow light">
                  <span className="eyebrow-num">05</span> / LET’S CHART A COURSE TOGETHER
                </div>
                <h2>Your next opportunity<br />is on the <span>horizon.</span></h2>
              </div>
              <p className="contact-lead">
                Share a few details and our operations team will follow up promptly with structured next steps for your vessel, crew, or cargo.
              </p>
            </div>

            <div className="contact-grid">
              <form className="inquiry-form reveal-item" style={{ "--i": 1 } as React.CSSProperties} onSubmit={onSubmit} noValidate={false}>
                <div className="field">
                  <input id="name" name="name" required placeholder=" " value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="field">
                  <input id="email" name="email" type="email" required placeholder=" " value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                  <label htmlFor="email">Work email</label>
                </div>
                <div className="field">
                  <input id="company" name="company" placeholder=" " value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
                  <label htmlFor="company">Company / vessel name</label>
                </div>
                <div className="field select-field">
                  <select id="service" name="service" required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}>
                    <option value="" disabled>Select a service</option>
                    <option value="manning">Manning Agent (Crew Recruitment & Placement)</option>
                    <option value="broker">Ship Broker (Commercial Chartering & Sales)</option>
                    <option value="management">Ship Management (Fleet Operations & Maintenance)</option>
                    <option value="port">Port Agent (Port Husbandry & Clearances)</option>
                  </select>
                  <label htmlFor="service" className="select-label">How can we help</label>
                </div>
                <div className="field field-full">
                  <textarea id="message" name="message" rows={4} required placeholder=" " value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
                  <label htmlFor="message">Tell us about your voyage or vessel requirements</label>
                </div>
                <div className="form-actions">
                  <button className="button" type="submit">Send inquiry <Icon name="arrow" /></button>
                  {sent && <p className="form-success" role="status">✓ Thank you. Your message is received and our desk will be in touch.</p>}
                </div>
              </form>

              <div id="contact-details" className="contact-details-channels reveal-item" style={{ "--i": 2 } as React.CSSProperties}>
                <div className="channel-box">
                  <div className="channel-icon-wrap"><Icon name="phone" /></div>
                  <div>
                    <span className="channel-sub">01 / TELEPHONE & OPERATIONS</span>
                    <h4>Direct Operations Line</h4>
                    <p>Informasi telepon segera tersedia</p>
                  </div>
                </div>

                <div className="channel-box">
                  <div className="channel-icon-wrap"><Icon name="mail" /></div>
                  <div>
                    <span className="channel-sub">02 / ELECTRONIC DISPATCH</span>
                    <h4>Chartering & Manning Desk</h4>
                    <p>Informasi email segera tersedia</p>
                  </div>
                </div>

                <div className="channel-box">
                  <div className="channel-icon-wrap"><Icon name="pin" /></div>
                  <div>
                    <span className="channel-sub">03 / OFFICE LOCATION</span>
                    <h4>Headquarters Indonesia</h4>
                    <p>Informasi alamat segera tersedia</p>
                  </div>
                </div>

                <div className="ops-dispatch-notice">
                  <Icon name="clock" />
                  <span>Detail kontak resmi akan ditampilkan setelah dikonfirmasi oleh BIL. Dukungan operasional beroperasi 24/7 untuk kapal aktif.</span>
                </div>
              </div>
            </div>

            <footer>
              <a className="footer-brand" href="#home">
                <img src="/images/bil-logo.png" alt="BIL" />
                <div className="footer-brand-text">
                  <span className="footer-brand-title">BERKAH INDUK LAUTAN</span>
                  <span className="footer-brand-sub">YOUR TRUSTED MARITIME PARTNER</span>
                </div>
              </a>
              <div className="footer-links">
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#services">Our Services</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-bottom-row">
                <span>2026 © PT Berkah Induk Lautan. All rights reserved.</span>
                <a href="#home" className="footer-top-link">Back to top ↑</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {activeService !== null && (
        <div className="modal-backdrop" onClick={() => setActiveService(null)}>
          <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" autoFocus onClick={() => setActiveService(null)} aria-label="Close service details">✕</button>
            <Icon name={services[activeService].icon} />
            <div className="eyebrow">BIL MARITIME SERVICES</div>
            <h2 id="service-title">{services[activeService].title}</h2>
            <p>{services[activeService].detail}</p>
            <a className="button" href="#contact" onClick={() => setActiveService(null)}>Discuss your needs <Icon name="arrow" /></a>
          </div>
        </div>
      )}
    </>
  );
}
