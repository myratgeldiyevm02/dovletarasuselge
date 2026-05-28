import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Activity, Shield, GitMerge, ChevronRight } from "lucide-react";


interface CardDef {
  key: "card1" | "card2" | "card3";
  icon: React.ElementType;
  accent: string;        // primary glow color
  accentRgb: string;     // for rgba usage
  SecondaryViz: React.FC;
}

// ─── Card 1 Visual — Radar / Tracking ─────────────────────────────────────────

function RadarViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 220 220" className="w-full h-full max-w-[220px] max-h-[220px]" fill="none">
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <filter id="radarGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background circles */}
        {[80, 60, 40, 20].map((r) => (
          <circle key={r} cx="110" cy="110" r={r} stroke="rgba(249,115,22,0.12)" strokeWidth="0.8" />
        ))}

        {/* Center fill */}
        <circle cx="110" cy="110" r="80" fill="url(#radarBg)" />

        {/* Cross-hairs */}
        <line x1="110" y1="30" x2="110" y2="190" stroke="rgba(249,115,22,0.08)" strokeWidth="0.6" />
        <line x1="30" y1="110" x2="190" y2="110" stroke="rgba(249,115,22,0.08)" strokeWidth="0.6" />

        {/* Rotating sweep */}
        <motion.g
          style={{ transformOrigin: "110px 110px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M 110 110 L 110 30 A 80 80 0 0 1 185 155 Z"
            fill="url(#sweepGrad)"
            opacity="0.18"
          />
          <defs>
            <radialGradient id="sweepGrad" cx="0%" cy="100%" r="100%">
              <stop offset="0%" stopColor="rgba(249,115,22,0)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.6)" />
            </radialGradient>
          </defs>
          <line x1="110" y1="110" x2="110" y2="30" stroke="rgba(249,115,22,0.8)" strokeWidth="1.2" filter="url(#radarGlow)" />
        </motion.g>

        {/* Tracking dots */}
        {[
          { cx: 145, cy: 75, delay: 0, size: 3 },
          { cx: 80, cy: 140, delay: 0.8, size: 2.5 },
          { cx: 155, cy: 135, delay: 1.5, size: 2 },
          { cx: 90, cy: 80, delay: 2.2, size: 2.5 },
        ].map((dot, i) => (
          <g key={i}>
            <motion.circle
              cx={dot.cx} cy={dot.cy} r={dot.size + 7}
              style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay }}
            />
            <circle cx={dot.cx} cy={dot.cy} r={dot.size} fill="rgba(249,115,22,0.9)" filter="url(#radarGlow)" />
          </g>
        ))}

        {/* Outer ring ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const x1 = 110 + 77 * Math.cos(angle);
          const y1 = 110 + 77 * Math.sin(angle);
          const x2 = 110 + 82 * Math.cos(angle);
          const y2 = 110 + 82 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(249,115,22,0.3)" strokeWidth="1" />;
        })}
      </svg>

      {/* Signal rings */}
      {[0, 0.6, 1.2].map((d) => (
        <motion.div
          key={d}
          className="absolute rounded-full border"
          style={{ borderColor: "rgba(249,115,22,0.25)", width: "50%", height: "50%" }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: d, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Card 2 Visual — Document / Compliance Scanner ────────────────────────────

function DocViz() {
  const lines = [100, 75, 90, 60, 85, 70];
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[200px] space-y-2 relative">
        {/* Document frame */}
        <div
          className="rounded-lg p-4 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Header bar */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }} />
            <div className="h-1.5 rounded-full bg-blue-400/30 flex-1" />
          </div>

          {/* Data rows */}
          {lines.map((w, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full mb-1.5"
               style={{
                originX: 0,
                width: `${w}%`,
                background:
                  i === 2
                    ? "rgba(59,130,246,0.5)"
                    : "rgba(255,255,255,0.1)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            />
          ))}

          {/* Approval stamp */}
          <motion.div
            className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Verified</span>
          </motion.div>
        </div>

        {/* Flowing data lines below */}
        <div className="space-y-1.5 px-1">
          {[80, 55, 70].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                className="h-px flex-1 rounded"
                style={{ background: `rgba(59,130,246,${0.15 + i * 0.05})` }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
              <div className="text-[8px] font-mono text-blue-400/50">
                {["HS", "CRF", "AWB"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card 3 Visual — Multi-Modal Network Nodes ────────────────────────────────

function NetworkViz() {
  const nodes = [
    { x: 50, y: 20, label: "AIR",  color: "rgba(249,115,22,1)" },
    { x: 15, y: 65, label: "RAIL", color: "rgba(139,92,246,1)"  },
    { x: 85, y: 65, label: "SEA",  color: "rgba(59,130,246,1)"  },
    { x: 50, y: 80, label: "ROAD", color: "rgba(16,185,129,1)"  },
  ];

  const edges = [
    { x1: 50, y1: 20, x2: 15, y2: 65 },
    { x1: 50, y1: 20, x2: 85, y2: 65 },
    { x1: 50, y1: 20, x2: 50, y2: 80 },
    { x1: 15, y1: 65, x2: 85, y2: 65 },
    { x1: 15, y1: 65, x2: 50, y2: 80 },
    { x1: 85, y1: 65, x2: 50, y2: 80 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px] max-h-[200px]">
        <defs>
          <filter id="nodeGlow2">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const x1 = (e.x1 / 100) * 200;
          const y1 = (e.y1 / 100) * 200;
          const x2 = (e.x2 / 100) * 200;
          const y2 = (e.y2 / 100) * 200;
          return (
            <g key={i}>
              <motion.line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.15 }}
              />
              {/* ✅ ИСПРАВЛЕНО: обычный <circle> вместо <motion.circle> */}
              <circle r="2" fill="rgba(249,115,22,0.8)" filter="url(#nodeGlow2)">
                <animateMotion
                  dur={`${2 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${x1} ${y1} L ${x2} ${y2}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Hub center — ИСПРАВЛЕНО */}
<motion.circle
  cx="100" cy="50" r="8"
  fill="rgba(249,115,22,0.15)"
  stroke="rgba(249,115,22,0.5)"
  strokeWidth="0.8"
  style={{ transformOrigin: "100px 50px" }}
  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
  transition={{ duration: 3, repeat: Infinity }}
/>
        <circle cx="100" cy="50" r="3.5" fill="rgba(249,115,22,0.9)" filter="url(#nodeGlow2)" />

        {/* Nodes */}
        {nodes.map((node, i) => {
          const cx = (node.x / 100) * 200;
          const cy = (node.y / 100) * 200;
          return (
            <g key={i}>
              <motion.circle
                cx={cx} cy={cy} r={12}
                fill={node.color.replace("1)", "0.08)")}
                stroke={node.color.replace("1)", "0.4)")}
                strokeWidth="0.8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "backOut" }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
              <circle cx={cx} cy={cy} r="4" fill={node.color} filter="url(#nodeGlow2)" />
              <text x={cx} y={cy + 20} textAnchor="middle" fontSize="7"
                fill="rgba(255,255,255,0.4)" fontFamily="'DM Mono', monospace" letterSpacing="0.08em">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Sync pulse */}
      <motion.div
        className="absolute rounded-full border"
        style={{ borderColor: "rgba(249,115,22,0.2)", width: "30%", height: "30%", top: "14%", left: "50%", transform: "translateX(-50%)" }}
        animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Card Data ─────────────────────────────────────────────────────────────────

const CARDS: CardDef[] = [
  {
    key: "card1",
    icon: Activity,
    accent: "rgba(249,115,22,1)",
    accentRgb: "249,115,22",
    SecondaryViz: RadarViz,
  },
  {
    key: "card2",
    icon: Shield,
    accent: "rgba(59,130,246,1)",
    accentRgb: "59,130,246",
    SecondaryViz: DocViz,
  },
  {
    key: "card3",
    icon: GitMerge,
    accent: "rgba(139,92,246,1)",
    accentRgb: "139,92,246",
    SecondaryViz: NetworkViz,
  },
];

// ─── Tilt Hook ─────────────────────────────────────────────────────────────────

function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ─── Individual Panel ──────────────────────────────────────────────────────────

function OperationPanel({ card, index }: { card: CardDef; index: number }) {
  const { t } = useTranslation();
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const Icon = card.icon;
  const Viz = card.SecondaryViz;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35 }}
        className="group relative h-full"
      >
        {/* Card glow shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, rgba(${card.accentRgb},0.18) 0%, transparent 70%)`,
            filter: "blur(24px)",
            transform: "scale(1.06) translateY(8px)",
          }}
        />

        {/* Main card */}
        <div
          className="relative flex flex-col h-full rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,15,30,0.75)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(28px)",
          }}
        >
          {/* Top accent gradient bar */}
          <motion.div
            className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
          />

          {/* Corner bracket — top left */}
          <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderTop: `1px solid ${card.accent}`, borderLeft: `1px solid ${card.accent}` }} />
          {/* Corner bracket — bottom right */}
          <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderBottom: `1px solid ${card.accent}`, borderRight: `1px solid ${card.accent}` }} />

          {/* Top area — icon + label + status */}
          <div className="px-7 pt-7 pb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Icon container */}
              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: `rgba(${card.accentRgb},0.08)`,
                  border: `1px solid rgba(${card.accentRgb},0.2)`,
                }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3 + index, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `radial-gradient(circle, rgba(${card.accentRgb},0.15) 0%, transparent 70%)` }}
                />
                <Icon size={18} style={{ color: card.accent, filter: `drop-shadow(0 0 6px ${card.accent})` }} />
              </div>

              {/* Title + desc */}
              <div>
                <h3
                  className="text-white font-bold text-lg tracking-[-0.02em] leading-tight mb-2"
                  style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}
                >
                  {t(`operations.${card.key}.title`)}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-light max-w-[260px]">
                  {t(`operations.${card.key}.desc`)}
                </p>
              </div>
            </div>

            {/* Status pill */}
            <div
              className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
              style={{
                background: `rgba(${card.accentRgb},0.08)`,
                border: `1px solid rgba(${card.accentRgb},0.2)`,
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: card.accent }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: card.accent }}>
                {t(`operations.${card.key}.status`)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-7 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

          {/* Visual area */}
          <div className="flex-1 relative px-4 py-5" style={{ minHeight: 200 }}>
            <Viz />
          </div>

          {/* Footer metrics bar */}
          <div
            className="mx-4 mb-4 rounded-xl px-5 py-3.5 flex items-center justify-between gap-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { labelKey: `operations.${card.key}.metric1.label`, value: t(`operations.${card.key}.metric1.value`) },
              { labelKey: `operations.${card.key}.metric2.label`, value: t(`operations.${card.key}.metric2.value`) },
            ].map((m, mi) => (
              <div key={mi} className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-bold tracking-tight"
                  style={{ color: card.accent, fontVariantNumeric: "tabular-nums" }}
                >
                  {m.value}
                </span>
                <span className="text-white/25 text-[10px] uppercase tracking-wider font-medium">
                  {t(m.labelKey)}
                </span>
              </div>
            ))}

            {/* CTA link */}
            <motion.div
              className="ml-auto flex items-center gap-1.5 cursor-pointer group/link"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[11px] font-semibold tracking-wide opacity-40 group-hover/link:opacity-80 transition-opacity" style={{ color: card.accent }}>
                {t("operations.explore")}
              </span>
              <ChevronRight size={12} style={{ color: card.accent }} className="opacity-40 group-hover/link:opacity-80 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Background Grid ───────────────────────────────────────────────────────────

function BackgroundGrid() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.032]">
        <defs>
          <pattern id="opsgrid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#opsgrid)" />
      </svg>

      {/* Horizontal scan line */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.15) 40%, rgba(59,130,246,0.15) 60%, transparent 100%)" }}
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// ─── Floating Orbs ─────────────────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <>
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ left: "5%", top: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(249,115,22,0.055) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ right: "5%", top: "30%", width: 450, height: 450, background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ left: "40%", bottom: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.045) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function OperationalExcellence() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0f1e", paddingTop: "130px", paddingBottom: "150px" }}
    >
      {/* Background */}
      <BackgroundGrid />
      <FloatingOrbs />

      {/* Top blend */}
      <div className="absolute top-0 inset-x-0 h-40 pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, #0a0f1e 0%, transparent 100%)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 gap-6">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3"
          >
            {/* Left line */}
            <motion.div
              className="h-px w-12 hidden sm:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6))" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <div
              className="px-4 py-1.5 rounded-full flex items-center gap-2"
              style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.18)" }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-orange-500"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-orange-400 text-[11px] font-bold uppercase tracking-[0.18em]">
                {t("operations.eyebrow")}
              </span>
            </div>
            <motion.div
              className="h-px w-12 hidden sm:block"
              style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.6), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-white"
            style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}
          >
            {t("operations.title")}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="max-w-xl text-white/38 text-base sm:text-lg leading-relaxed font-light"
          >
            {t("operations.subtitle")}
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), rgba(59,130,246,0.5), transparent)" }}
          />
        </div>

        {/* ── Panels Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((card, i) => (
            <OperationPanel key={card.key} card={card} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-white font-semibold text-[15px] tracking-[-0.01em]">
              {t("operations.cta.title")}
            </span>
            <span className="text-white/30 text-[13px]">{t("operations.cta.subtitle")}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Secondary */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {t("operations.cta.secondary")}
            </motion.button>

            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(249,115,22,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              {t("operations.cta.primary")}
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none z-0"
        style={{ background: "linear-gradient(to top, #0a0f1e 0%, transparent 100%)" }} />
    </section>
  );
}