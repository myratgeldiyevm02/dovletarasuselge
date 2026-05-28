import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Container,
  Plane,
  Ship,
  Train,
  Warehouse,
  Globe,
  BarChart3,
  ArrowUpRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceCard {
  key: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  stats: { key: string; value: string }[];
  tags: string[];
}

interface StatItem {
  key: string;
  value: string;
  icon: React.ElementType;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICE_CARDS: ServiceCard[] = [
  {
    key: "air",
    icon: Plane,
    accentColor: "from-orange-500 to-amber-400",
    glowColor: "rgba(249,115,22,0.15)",
    borderColor: "rgba(249,115,22,0.25)",
    stats: [
      { key: "routes", value: "180+" },
      { key: "delivery", value: "24–72h" },
    ],
    tags: ["express", "priority"],
  },
  {
    key: "sea",
    icon: Ship,
    accentColor: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59,130,246,0.15)",
    borderColor: "rgba(59,130,246,0.25)",
    stats: [
      { key: "ports", value: "320+" },
      { key: "capacity", value: "50k TEU" },
    ],
    tags: ["fcl", "lcl"],
  },
  {
    key: "rail",
    icon: Train,
    accentColor: "from-violet-500 to-purple-400",
    glowColor: "rgba(139,92,246,0.15)",
    borderColor: "rgba(139,92,246,0.25)",
    stats: [
      { key: "corridors", value: "12" },
      { key: "coverage", value: "45 countries" },
    ],
    tags: ["china-europe", "fast"],
  },
  {
    key: "warehouse",
    icon: Warehouse,
    accentColor: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.15)",
    borderColor: "rgba(16,185,129,0.25)",
    stats: [
      { key: "sqm", value: "200k m²" },
      { key: "locations", value: "28" },
    ],
    tags: ["bonded", "3pl"],
  },
  {
    key: "customs",
    icon: Globe,
    accentColor: "from-rose-500 to-pink-400",
    glowColor: "rgba(244,63,94,0.15)",
    borderColor: "rgba(244,63,94,0.25)",
    stats: [
      { key: "countries", value: "90+" },
      { key: "clearance", value: "99.8%" },
    ],
    tags: ["ai-docs", "duty"],
  },
  {
    key: "analytics",
    icon: BarChart3,
    accentColor: "from-sky-500 to-indigo-400",
    glowColor: "rgba(14,165,233,0.15)",
    borderColor: "rgba(14,165,233,0.25)",
    stats: [
      { key: "tracking", value: "Real-time" },
      { key: "accuracy", value: "99.6%" },
    ],
    tags: ["live", "ai"],
  },
];

const BOTTOM_STATS: StatItem[] = [
  { key: "shipments", value: "2.4M+", icon: Container },
  { key: "uptime", value: "99.98%", icon: Shield },
  { key: "delivery", value: "< 48h", icon: Clock },
  { key: "partners", value: "1,200+", icon: Zap },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(80px)" }}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function GridLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function AnimatedRouteLine({ d, delay, color }: { d: string; delay: number; color: string }) {
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="1"
      fill="none"
      strokeDasharray="8 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
      transition={{ duration: 3, delay, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
    />
  );
}

// Tilt card hook
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

function ServiceCardComponent({ card, index }: { card: ServiceCard; index: number }) {
  const { t } = useTranslation();
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full cursor-pointer"
      >
        {/* Card glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: card.glowColor, filter: "blur(20px)", transform: "scale(1.05)" }}
        />

        {/* Card body */}
        <div
          className="relative h-full rounded-2xl p-6 flex flex-col gap-5 overflow-hidden transition-all duration-500"
          style={{
            background: "rgba(10,15,30,0.7)",
            border: `1px solid rgba(255,255,255,0.07)`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Animated border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ border: `1px solid ${card.borderColor}` }}
          />

          {/* Top accent line */}
          <motion.div
            className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${card.accentColor} opacity-0 group-hover:opacity-100`}
            transition={{ duration: 0.4 }}
          />

          {/* Icon */}
          <div className="flex items-start justify-between">
            <div className="relative">
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.accentColor} opacity-0 group-hover:opacity-20 blur-xl`}
                transition={{ duration: 0.4 }}
              />
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={22} className={`bg-gradient-to-br ${card.accentColor} bg-clip-text`} style={{ color: "transparent", filter: "drop-shadow(0 0 8px currentColor)" }} />
                  {/* Fallback solid icon */}
                  <span className="sr-only" />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
            >
              <ArrowUpRight size={16} className="text-white/30" />
            </motion.div>
          </div>

          {/* Title & description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-[15px] tracking-[-0.01em] leading-tight">
              {t(`services.cards.${card.key}.title`)}
            </h3>
            <p className="text-white/45 text-[13px] leading-relaxed font-light">
              {t(`services.cards.${card.key}.desc`)}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-auto">
            {card.stats.map((stat) => (
              <div key={stat.key} className="flex flex-col gap-0.5">
                <span className={`text-sm font-bold bg-gradient-to-r ${card.accentColor} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <span className="text-white/30 text-[11px] uppercase tracking-wider font-medium">
                  {t(`services.cards.${card.key}.stats.${stat.key}`)}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {t(`services.tags.${tag}`, tag)}
              </span>
            ))}
          </div>

          {/* Scan-line shimmer */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesPreview() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0f1e", paddingTop: "120px", paddingBottom: "140px" }}
    >
      {/* ── Background atmosphere ── */}
      <GridLines />

      {/* Ambient orbs */}
      <FloatingOrb x="5%" y="10%" size={500} color="rgba(249,115,22,0.06)" delay={0} />
      <FloatingOrb x="70%" y="5%" size={400} color="rgba(59,130,246,0.07)" delay={1.5} />
      <FloatingOrb x="40%" y="60%" size={350} color="rgba(139,92,246,0.05)" delay={3} />
      <FloatingOrb x="85%" y="70%" size={300} color="rgba(249,115,22,0.05)" delay={2} />

      {/* Route lines SVG — continues Hero atmosphere */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedRouteLine d="M-100,200 Q400,100 800,300 T1600,200" delay={0} color="rgba(249,115,22,0.3)" />
        <AnimatedRouteLine d="M-100,600 Q300,500 700,650 T1600,550" delay={1.2} color="rgba(59,130,246,0.25)" />
        <AnimatedRouteLine d="M200,0 Q600,400 1000,200 T1600,500" delay={2.4} color="rgba(139,92,246,0.2)" />
      </svg>

      {/* Seamless top gradient blending with Hero */}
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0f1e 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-20 gap-6">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.15em]">
              {t("services.eyebrow")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.1] text-white"
              style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}
            >
              {t("services.title_line1")}
              <br />
              <span
                className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 30px rgba(249,115,22,0.4))" }}
              >
                {t("services.title_line2")}
              </span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-white/45 text-base sm:text-lg leading-relaxed font-light"
          >
            {t("services.subtitle")}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)" }}
          />
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICE_CARDS.map((card, i) => (
            <ServiceCardComponent key={card.key} card={card} index={i} />
          ))}
        </div>

        {/* ── Bottom Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-2xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(59,130,246,0.1), rgba(255,255,255,0.05))" }}
        >
          <div
            className="rounded-2xl px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-8"
            style={{
              background: "rgba(10,15,30,0.85)",
              backdropFilter: "blur(24px)",
            }}
          >
            {BOTTOM_STATS.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <StatIcon size={13} className="text-orange-500/70" />
                    <span className="text-white/25 text-[11px] uppercase tracking-[0.12em] font-semibold">
                      {t(`services.stats.${stat.key}`)}
                    </span>
                  </div>
                  <span
                    className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.03em]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── CTA Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: "0 0 0 rgba(249,115,22,0)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(249,115,22,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 rgba(249,115,22,0)"; }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            {t("services.cta_primary")}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.6)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
            }}
          >
            {t("services.cta_secondary")}
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0a0f1e 0%, transparent 100%)" }}
      />
    </section>
  );
}