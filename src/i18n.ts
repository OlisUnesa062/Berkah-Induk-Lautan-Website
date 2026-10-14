// Semua teks situs (kecuali hero) per bahasa. Bahasa Indonesia adalah bahasa utama.
// Struktur `en` wajib sama dengan `id` (dicek oleh TypeScript lewat `typeof id`).

export type Lang = "id" | "en";

export const LANGS: Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id";

/** URL tiap bahasa. Indonesia di root, Inggris di /en. */
export const LANG_PATH: Record<Lang, string> = { id: "/", en: "/en" };

export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "id";
}

// Nama layanan sengaja tetap istilah industri (dipakai juga di Indonesia dan dicari apa adanya).
export const SERVICE_TITLES = ["Manning Agent", "Ship Broker", "Ship Management", "Port Agent"] as const;

const id = {
  seo: {
    title: "Berkah Induk Lautan | Manning Agent & Agen Awak Kapal Indonesia",
    description:
      "Manning agent Indonesia untuk rekrutmen dan penempatan awak kapal (ABK) sesuai MLC 2006 dan STCW, tanpa biaya bagi pelaut. Melayani juga ship broker, ship management, dan port agent.",
    ogLocale: "id_ID",
    inLanguage: "id-ID",
    keywords: [
      "Manning agent Indonesia",
      "Agen awak kapal",
      "Penyalur ABK",
      "Rekrutmen pelaut",
      "Crewing agency",
      "Ship broker",
      "Ship management",
      "Keagenan pelabuhan",
    ],
  },
  nav: {
    home: "Beranda",
    about: "Tentang Kami",
    services: "Layanan",
    contact: "Kontak",
    cta: "Hubungi Kami",
    brandLabel: "Beranda Berkah Induk Lautan",
    toggle: "Buka atau tutup menu",
    main: "Navigasi utama",
    language: "Pilih bahasa",
  },
  strip: {
    corridor: "KORIDOR MARITIM INDONESIA",
    pills: ["MANNING AWAK KAPAL", "OPERASIONAL ARMADA", "KEAGENAN PELABUHAN"],
    gateway: "Gerbang Selat Sunda & Selat Malaka",
  },
  intro: {
    meta: "PERUSAHAAN JASA MARITIM TERPADU",
    pre: "KAMI ADALAH",
    words: [
      {
        gloss: "Keberkahan",
        meaning:
          "Kebaikan yang kian bertambah ketika dibagikan. Setiap pelayaran yang kami dukung berawal dari ketulusan, agar rezeki sampai kepada pelaut, pemilik kapal, dan keluarga yang menanti di darat.",
      },
      {
        gloss: "Asal yang Melindungi",
        meaning:
          "Sumber yang merawat dan menaungi. Layaknya kapal induk di jantung armada, kami adalah pangkalan yang kokoh, tempat awak kapal dan mitra selalu dapat kembali.",
      },
      {
        gloss: "Samudra Tanpa Batas",
        meaning:
          "Perairan luas yang mempersatukan bangsa-bangsa. Laut Nusantara adalah akar kami, dan cakrawala dunia adalah tujuan setiap pelayaran.",
      },
    ],
    hint: "Ketuk atau arahkan kursor ke setiap kata untuk melihat maknanya",
    lead:
      "BIL adalah manning agent dan mitra maritim tepercaya asal Indonesia bagi pemilik kapal, perusahaan manajemen kapal, dan penyewa kapal di sepanjang jalur laut strategis Indonesia hingga mancanegara.",
    sub:
      "Ketika dipercaya sebagai agen untuk awak kapal, kapal, maupun muatan Anda, kami hadir sebagai kantor pusat di darat yang mendampingi setiap mil laut pelayaran.",
    chips: ["Manning Agent", "Keagenan Kapal", "Layanan Pelabuhan", "Dukungan Kargo"],
  },
  about: {
    imageAlt: "Kapal pesiar berlayar di laut lepas",
    chipTitle: "Pelaut Indonesia",
    chipText: "Berkarier bersama operator kapal di seluruh dunia",
    eyebrow: "SIAPA KAMI",
    title1: "Selamat datang di BIL.",
    title2: "Mitra Anda di lautan.",
    lead:
      "Pelayaran yang hebat berawal dari orang-orang yang tepat. Berkah Induk Lautan menghubungkan pelaut Indonesia yang kompeten dengan operator kapal di seluruh dunia.",
    body:
      "Sebagai manning agent sekaligus mitra maritim terpadu, kami memadukan pendekatan yang mengutamakan manusia dengan keahlian yang andal. Kami menangani rekrutmen awak kapal, logistik penempatan, kepatuhan regulasi, hingga keagenan pelabuhan agar kapal Anda beroperasi secara optimal.",
    pillars: [
      {
        title: "Mengutamakan Manusia",
        text: "Rekrutmen yang etis, kesejahteraan awak yang adil, dan penempatan yang transparan.",
      },
      {
        title: "Kemitraan Tepercaya",
        text: "Hubungan jangka panjang dengan prinsipal internasional dan pemilik kapal.",
      },
    ],
    cta: "Mari arungi masa depan bersama",
    link: "Lihat layanan kami",
  },
  why: {
    eyebrow: "KEUNGGULAN BIL",
    title1: "Mengapa prinsipal",
    title2: "memilih kami.",
    sub1: "Lebih dari sekadar penyedia jasa.",
    sub2: "Mitra maritim yang berkomitmen penuh pada keberhasilan operasional armada Anda.",
    items: [
      {
        title: "Awak siap bergabung",
        text: "Pelaut kompeten yang telah melalui seleksi ketat, dinyatakan layak secara medis, dan siap ditempatkan segera di rute pelayaran internasional.",
        highlight: "Terseleksi & Lolos Uji Medis",
      },
      {
        title: "Satu titik kontak",
        text: "Koordinasi operasional yang langsung dan jelas sepanjang waktu. Mitra maritim yang selalu sigap merespons kapan pun kapal Anda membutuhkan.",
        highlight: "Layanan Operasional 24/7",
      },
      {
        title: "Kontrak sesuai MLC",
        text: "Ketentuan kerja yang adil dan transparan, disusun sepenuhnya sesuai Maritime Labour Convention 2006 dan hukum maritim internasional.",
        highlight: "Standar Etis & Legal 100%",
      },
      {
        title: "Tanpa biaya bagi pelaut",
        text: "Rekrutmen etis tanpa hambatan finansial. Penempatan berbasis kompetensi, dan pelaut tidak pernah dibebani biaya apa pun.",
        highlight: "Kebijakan Bebas Biaya",
      },
    ],
  },
  visual: {
    mapAlt: "Peta dunia dengan jalur pelayaran global",
    badge: "KEUNGGULAN NUSANTARA • KORIDOR PELAYARAN STRATEGIS",
    title: "Menghubungkan Kekuatan Maritim Indonesia dengan Cakrawala Dunia.",
    text: "Menjaga kesejahteraan pelaut, mempercepat kesiapan armada, dan menghadirkan layanan sandar kapal yang lancar di sepanjang koridor Indo-Pasifik.",
    port: "PELABUHAN TANJUNG PRIOK & ALUR LAUT KEPULAUAN INDONESIA",
  },
  services: {
    eyebrow: "LAYANAN KAMI",
    title1: "Solusi maritim",
    title2: "terpadu.",
    accent: "Satu BIL.",
    sub1: "Solusi praktis untuk awak,",
    sub2: "kapal, dan bisnis Anda.",
    items: [
      {
        tag: "LAYANAN UTAMA",
        text: "Awak yang tepat, siap untuk pelayaran berikutnya.",
        detail:
          "Sebagai manning agent Indonesia, kami menghubungkan pelaut kompeten, baik perwira maupun rating, dengan operator kapal di seluruh dunia. Layanan crewing kami mencakup pencarian dan seleksi kandidat, koordinasi dokumen serta sertifikat, hingga penempatan awak kapal (ABK), dengan proses rekrutmen yang adil dan tanpa biaya bagi pelaut.",
        metrics: ["1.200+ Pelaut Terverifikasi", "Bebas Biaya Penempatan", "Bersertifikasi MLC 2006 & STCW"],
        option: "Manning Agent (Rekrutmen & Penempatan Awak Kapal)",
      },
      {
        tag: "PERANTARA KOMERSIAL",
        text: "Mempertemukan kapal dengan peluang yang tepat.",
        detail:
          "Kami mendampingi pemilik dan operator kapal dalam menjajaki peluang jual beli maupun sewa (charter) kapal, menjembatani komunikasi antarpihak, serta mengoordinasikan setiap tahap transaksi maritim.",
        metrics: ["Pencocokan Charter & Jual Beli", "Penghubung Komersial Langsung", "Koordinasi Transaksi Lintas Selat"],
        option: "Ship Broker (Charter & Jual Beli Kapal)",
      },
      {
        tag: "TEKNIS & OPERASIONAL",
        text: "Operasional andal, ketenangan sepenuhnya.",
        detail:
          "Layanan manajemen kapal kami mendukung koordinasi operasional kapal, kebutuhan awak, perencanaan perawatan, dan pemenuhan regulasi. Diskusikan bersama kami solusi yang disesuaikan dengan kebutuhan armada Anda.",
        metrics: ["Perawatan Preventif", "Kepatuhan Regulasi Negara Bendera", "Dukungan Audit Keselamatan & ISM"],
        option: "Ship Management (Operasional & Perawatan Armada)",
      },
      {
        tag: "KEAGENAN & PERIZINAN PELABUHAN",
        text: "Sandar kapal lancar, dari kedatangan hingga keberangkatan.",
        detail:
          "Kami mengoordinasikan kebutuhan kunjungan kapal di pelabuhan, komunikasi dengan pihak setempat, dokumentasi, serta dukungan kapal, sehingga pemilik, nakhoda, dan operator dapat menjalani proses kedatangan dan keberangkatan secara efisien.",
        metrics: ["Pengurusan Sandar & Bea Cukai 24/7", "Pengaturan Bunker & Perbekalan", "Logistik Pergantian Awak & Husbandry"],
        option: "Port Agent (Keagenan & Perizinan Pelabuhan)",
      },
    ],
    featuredCta: "Jelajahi solusi crewing & rekrutmen",
    detailLink: "Lihat detail layanan",
    learnMore: (name: string) => `Selengkapnya tentang ${name}`,
    note: "Mendampingi perjalanan Anda, dari kontak pertama hingga pelabuhan berikutnya.",
  },
  stats: {
    eyebrow: "DAMPAK TERUKUR",
    title: "Berlandaskan Standar Maritim Internasional",
    numberLocale: "id-ID",
    items: [
      { label: "Pelaut Kompeten", sub: "Kumpulan talenta aktif dan terverifikasi, siap berlayar ke seluruh dunia" },
      { label: "Kepatuhan MLC 2006", sub: "Patuh sepenuhnya pada standar ketenagakerjaan maritim internasional" },
      { label: "Kunjungan Pelabuhan Global", sub: "Koordinasi operasional langsung di berbagai koridor laut utama" },
      { label: "Dukungan Operasional", sub: "Pendampingan berkelanjutan dari darat ke kapal, termasuk layanan husbandry" },
    ],
  },
  contact: {
    eyebrow: "MARI RENCANAKAN PELAYARAN BERSAMA",
    title1: "Peluang Anda berikutnya",
    title2: "menanti di ",
    accent: "cakrawala.",
    lead:
      "Sampaikan kebutuhan Anda secara singkat, dan tim operasional kami akan segera menindaklanjuti dengan langkah-langkah yang terstruktur untuk kapal, awak, maupun muatan Anda.",
    name: "Nama lengkap",
    email: "Email kantor",
    company: "Nama perusahaan / kapal",
    service: "Kebutuhan layanan",
    servicePlaceholder: "Pilih layanan",
    message: "Ceritakan kebutuhan pelayaran atau kapal Anda",
    submit: "Kirim permintaan",
    success: "✓ Terima kasih. Pesan Anda telah kami terima dan tim kami akan segera menghubungi Anda.",
    channels: [
      { sub: "01 / TELEPON & OPERASIONAL", title: "Saluran Operasional Langsung", text: "Informasi telepon segera tersedia" },
      { sub: "02 / SURAT ELEKTRONIK", title: "Layanan Chartering & Manning", text: "Informasi email segera tersedia" },
      { sub: "03 / LOKASI KANTOR", title: "Kantor Pusat Indonesia", text: "Informasi alamat segera tersedia" },
    ],
    notice:
      "Detail kontak resmi akan ditampilkan setelah dikonfirmasi oleh BIL. Dukungan operasional tersedia 24/7 untuk kapal aktif.",
  },
  footer: {
    tagline: "MITRA MARITIM TEPERCAYA ANDA",
    rights: "Hak cipta dilindungi undang-undang.",
    top: "Kembali ke atas",
  },
  modal: {
    eyebrow: "LAYANAN MARITIM BIL",
    cta: "Diskusikan kebutuhan Anda",
    close: "Tutup detail layanan",
  },
};

export type Translation = typeof id;

const en: Translation = {
  seo: {
    title: "Berkah Induk Lautan | Indonesian Manning Agent & Crewing Agency",
    description:
      "Indonesian manning agent for MLC 2006 and STCW-compliant crew recruitment and placement, with zero fees to seafarers. Also providing ship broker, ship management and port agency services.",
    ogLocale: "en_US",
    inLanguage: "en-US",
    keywords: [
      "Indonesian manning agent",
      "Manning agency Indonesia",
      "Crewing agency",
      "Seafarer recruitment",
      "Crew management",
      "Ship broker",
      "Ship management",
      "Port agency",
    ],
  },
  nav: {
    home: "Home",
    about: "About Us",
    services: "Our Services",
    contact: "Contact",
    cta: "Let's Talk",
    brandLabel: "Berkah Induk Lautan home",
    toggle: "Toggle navigation",
    main: "Main navigation",
    language: "Choose language",
  },
  strip: {
    corridor: "INDONESIA MARITIME CORRIDOR",
    pills: ["CREW MANNING", "FLEET OPERATIONS", "PORT AGENCY"],
    gateway: "Sunda & Malacca Straits Gateway",
  },
  intro: {
    meta: "FULL SERVICE MARITIME AGENCY",
    pre: "WE ARE",
    words: [
      {
        gloss: "Blessing",
        meaning:
          "A blessing that multiplies as it is shared. Every voyage we support begins with sincerity, so that good fortune reaches seafarers, shipowners, and the families waiting ashore.",
      },
      {
        gloss: "The Origin That Protects",
        meaning:
          "The source that nurtures and shelters. Like the mother ship at the heart of a fleet, we are the steady home base our crews and partners can always return to.",
      },
      {
        gloss: "The Boundless Ocean",
        meaning:
          "The open water that joins nations together. Indonesia's seas are our roots, and the world's horizons are where every journey is meant to arrive.",
      },
    ],
    hint: "Tap or hover over each word to discover its meaning",
    lead:
      "BIL is a trusted Indonesian manning agent and maritime partner for shipowners, ship managers, and charterers along Indonesia's vital sea lanes and beyond.",
    sub:
      "Once appointed as your agent for crew, vessel, or cargo, we become your dedicated onshore headquarters for every nautical mile of the voyage.",
    chips: ["Crew Manning", "Ship Agency", "Port Services", "Cargo Support"],
  },
  about: {
    imageAlt: "Cruise ship sailing on the open sea",
    chipTitle: "Indonesian Seafarers",
    chipText: "Serving with ship operators worldwide",
    eyebrow: "WHO WE ARE",
    title1: "Welcome to BIL.",
    title2: "Your partner at sea.",
    lead:
      "Great voyages begin with the right people. At Berkah Induk Lautan, we connect qualified Indonesian seafarers with ship operators around the world.",
    body:
      "As a manning agent and full-service maritime partner, we combine a people-first approach with dependable expertise. We manage crew recruitment, deployment logistics, regulatory compliance, and port agency so your vessels operate at peak efficiency.",
    pillars: [
      {
        title: "People-First Approach",
        text: "Ethical recruitment, fair crew welfare, and transparent placement.",
      },
      {
        title: "Trusted Partnerships",
        text: "Long-term relationships with international principals and shipowners.",
      },
    ],
    cta: "Let's navigate the future together",
    link: "Explore our services",
  },
  why: {
    eyebrow: "THE BIL DIFFERENCE",
    title1: "Why principals",
    title2: "work with us.",
    sub1: "More than a service provider.",
    sub2: "A dedicated maritime partner invested in your fleet's operational success.",
    items: [
      {
        title: "Ready-to-join crew",
        text: "Qualified seafarers who are rigorously vetted, medically cleared, and prepared for immediate deployment on international trade routes.",
        highlight: "Pre-screened & Medically Cleared",
      },
      {
        title: "One point of contact",
        text: "Clear, direct operational coordination around the clock. A dedicated maritime partner that responds whenever your vessel calls.",
        highlight: "24/7 Dedicated Voyage Desk",
      },
      {
        title: "MLC-compliant contracts",
        text: "Fair, transparent terms drafted in full compliance with the Maritime Labour Convention 2006 and international maritime law.",
        highlight: "100% Ethical & Legal Standards",
      },
      {
        title: "No fees to seafarers",
        text: "Ethical recruitment without financial barriers. Placement is merit-based, and seafarers are never charged a fee.",
        highlight: "Strict Zero-Fee Policy",
      },
    ],
  },
  visual: {
    mapAlt: "World map showing global shipping routes",
    badge: "ARCHIPELAGIC EXCELLENCE • STRATEGIC SHIPPING CORRIDOR",
    title: "Connecting Indonesia's Maritime Power to Global Horizons.",
    text: "Safeguarding seafarer welfare, accelerating fleet readiness, and delivering seamless port calls across the Indo-Pacific corridor.",
    port: "PORT OF TANJUNG PRIOK & ARCHIPELAGIC SEA LANES",
  },
  services: {
    eyebrow: "WHAT WE DO",
    title1: "A complete maritime",
    title2: "partner.",
    accent: "One BIL.",
    sub1: "Practical solutions for your people,",
    sub2: "your vessels, and your business.",
    items: [
      {
        tag: "PRIMARY CORE CAPABILITY",
        text: "The right people. Ready for your next voyage.",
        detail:
          "As an Indonesian manning agent, we connect qualified seafarers, both officers and ratings, with vessel operators worldwide. Our crewing services cover candidate sourcing and selection, document and certificate coordination, and crew deployment, with fair recruitment and no fees charged to seafarers.",
        metrics: ["1,200+ Verified Crew Pool", "Zero Placement Fee Policy", "MLC 2006 & STCW Certified"],
        option: "Manning Agent (Crew Recruitment & Placement)",
      },
      {
        tag: "COMMERCIAL BROKERAGE",
        text: "Connecting vessels with the right opportunities.",
        detail:
          "We support shipowners and operators in exploring vessel sale and chartering opportunities, facilitating communication between parties and coordinating each stage of a maritime transaction.",
        metrics: ["Chartering & Sales Matching", "Direct Commercial Liaison", "Cross-Strait Deal Coordination"],
        option: "Ship Broker (Chartering & Vessel Sales)",
      },
      {
        tag: "TECHNICAL & OPERATIONS",
        text: "Reliable operations. Complete peace of mind.",
        detail:
          "Our ship management services support the coordination of vessel operations, crew requirements, maintenance planning, and regulatory compliance. Speak with us about a solution tailored to your fleet.",
        metrics: ["Preventive Maintenance", "Flag State Regulatory Compliance", "Safety & ISM Auditing Support"],
        option: "Ship Management (Fleet Operations & Maintenance)",
      },
      {
        tag: "PORT HUSBANDRY & CLEARANCE",
        text: "Seamless port calls, from arrival to departure.",
        detail:
          "We coordinate port-call requirements, local communications, documentation, and vessel support, helping owners, masters, and operators handle arrival and departure efficiently.",
        metrics: ["24/7 Berth & Customs Clearance", "Bunkering & Provisions Dispatch", "Crew Change & Husbandry Logistics"],
        option: "Port Agent (Port Husbandry & Clearance)",
      },
    ],
    featuredCta: "Explore crewing & recruitment solutions",
    detailLink: "Explore service details",
    learnMore: (name: string) => `Learn more about ${name}`,
    note: "Supporting your journey, from the first connection to the next port.",
  },
  stats: {
    eyebrow: "MEASURABLE IMPACT",
    title: "Built on International Maritime Standards",
    numberLocale: "en-US",
    items: [
      { label: "Qualified Seafarers", sub: "Active, vetted talent pool ready for global voyages" },
      { label: "MLC 2006 Compliance", sub: "Strict adherence to international maritime labour standards" },
      { label: "Global Port Calls", sub: "Direct operational coordination across major sea corridors" },
      { label: "Operations Support", sub: "Continuous shore-to-vessel dispatch and husbandry assistance" },
    ],
  },
  contact: {
    eyebrow: "LET'S CHART A COURSE TOGETHER",
    title1: "Your next opportunity",
    title2: "is on the ",
    accent: "horizon.",
    lead:
      "Share a few details, and our operations team will follow up promptly with structured next steps for your vessel, crew, or cargo.",
    name: "Full name",
    email: "Work email",
    company: "Company / vessel name",
    service: "How can we help",
    servicePlaceholder: "Select a service",
    message: "Tell us about your voyage or vessel requirements",
    submit: "Send inquiry",
    success: "✓ Thank you. Your message has been received, and our team will be in touch shortly.",
    channels: [
      { sub: "01 / TELEPHONE & OPERATIONS", title: "Direct Operations Line", text: "Phone details coming soon" },
      { sub: "02 / EMAIL", title: "Chartering & Manning Desk", text: "Email details coming soon" },
      { sub: "03 / OFFICE LOCATION", title: "Headquarters, Indonesia", text: "Address details coming soon" },
    ],
    notice:
      "Official contact details will be published once confirmed by BIL. Operational support is available 24/7 for active vessels.",
  },
  footer: {
    tagline: "YOUR TRUSTED MARITIME PARTNER",
    rights: "All rights reserved.",
    top: "Back to top",
  },
  modal: {
    eyebrow: "BIL MARITIME SERVICES",
    cta: "Discuss your needs",
    close: "Close service details",
  },
};

export const translations: Record<Lang, Translation> = { id, en };
