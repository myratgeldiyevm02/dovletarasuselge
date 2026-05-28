import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  ArrowUpRight,
  Radio,
  TrendingUp,
  Package,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HubNode {
  id: string;
  labelKey: string;
  x: number; // % of SVG viewBox width (0–100)
  y: number; // % of SVG viewBox height (0–100)
  tier: "mega" | "primary" | "secondary";
  regionKey: string;
}

interface RouteEdge {
  from: string;
  to: string;
  type: "air" | "sea" | "rail";
  active: boolean;
}

interface RegionStat {
  regionKey: string;
  hubs: number;
  shipments: string;
  growth: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HUB_NODES: HubNode[] = [
  // Mega hubs
  { id: "shg", labelKey: "network.hubs.shanghai",    x: 76,  y: 34,  tier: "mega",      regionKey: "asia" },
  { id: "dxb", labelKey: "network.hubs.dubai",        x: 57,  y: 41,  tier: "mega",      regionKey: "middleeast" },
  { id: "fra", labelKey: "network.hubs.frankfurt",    x: 48,  y: 24,  tier: "mega",      regionKey: "europe" },
  { id: "nyc", labelKey: "network.hubs.newyork",      x: 20,  y: 29,  tier: "secondary", regionKey: "americas" },
  {
    id: "asg",
    labelKey: "network.hubs.ashgabat",
    x: 58,
    y: 36,
    tier: "mega",
    regionKey: "centralasia"
  },
  {
    id: "tkb",
    labelKey: "network.hubs.turkmenbashi",
    x: 53,
    y: 36,
    tier: "mega",
    regionKey: "centralasia"
  },

  // Primary hubs
  { id: "sin", labelKey: "network.hubs.singapore",   x: 74,  y: 52,  tier: "primary",   regionKey: "asia" },
  { id: "hkg", labelKey: "network.hubs.hongkong",    x: 76,  y: 41,  tier: "primary",   regionKey: "asia" },
  { id: "ist", labelKey: "network.hubs.istanbul",    x: 54,  y: 29,  tier: "primary",   regionKey: "europe" },
  { id: "msc", labelKey: "network.hubs.moscow",      x: 58,  y: 19,  tier: "primary",   regionKey: "europe" },
  { id: "lax", labelKey: "network.hubs.losangeles",  x: 10,  y: 34,  tier: "primary",   regionKey: "americas" },
  { id: "jnb", labelKey: "network.hubs.johannesburg",x: 53,  y: 66,  tier: "primary",   regionKey: "africa" },

  // Secondary hubs
  { id: "ams", labelKey: "network.hubs.amsterdam",   x: 46,  y: 21,  tier: "secondary", regionKey: "europe" },
  { id: "bom", labelKey: "network.hubs.mumbai",      x: 63,  y: 44,  tier: "secondary", regionKey: "asia" },
  { id: "nrt", labelKey: "network.hubs.tokyo",       x: 82,  y: 31,  tier: "secondary", regionKey: "asia" },
  { id: "gru", labelKey: "network.hubs.saopaulo",    x: 28,  y: 66,  tier: "secondary", regionKey: "americas" },
  { id: "cai", labelKey: "network.hubs.cairo",       x: 54,  y: 38,  tier: "secondary", regionKey: "africa" },
];

const ROUTE_EDGES: RouteEdge[] = [
  { from: "shg", to: "fra", type: "rail",  active: true  },
  { from: "shg", to: "dxb", type: "air",   active: true  },
  { from: "dxb", to: "fra", type: "air",   active: true  },
  { from: "fra", to: "nyc", type: "air",   active: true  },
  { from: "shg", to: "sin", type: "sea",   active: true  },
  { from: "sin", to: "dxb", type: "sea",   active: false },
  { from: "nyc", to: "lax", type: "air",   active: false },
  { from: "dxb", to: "jnb", type: "air",   active: false },
  { from: "fra", to: "msc", type: "rail",  active: false },
  { from: "hkg", to: "nrt", type: "air",   active: false },
  { from: "fra", to: "ams", type: "rail",  active: false },
  { from: "dxb", to: "bom", type: "air",   active: false },
  { from: "nyc", to: "gru", type: "air",   active: false },
  { from: "dxb", to: "cai", type: "air",   active: false },
  { from: "shg", to: "hkg", type: "sea",   active: false },
  { from: "tkb", to: "dxb", type: "sea", active: true },
  { from: "tkb", to: "fra", type: "rail", active: true },
  { from: "tkb", to: "msc", type: "rail", active: true },
  { from: "tkb", to: "shg", type: "sea", active: true },
];

const REGION_STATS: RegionStat[] = [
  { regionKey: "centralasia", hubs: 5, shipments: "950K", growth: "+36%" },
  { regionKey: "asia",         hubs: 6, shipments: "820K", growth: "+18%" },
  { regionKey: "europe",       hubs: 5, shipments: "540K", growth: "+12%" },
  { regionKey: "americas",     hubs: 3, shipments: "390K", growth: "+9%"  },
  { regionKey: "middleeast",   hubs: 2, shipments: "280K", growth: "+24%" },
  { regionKey: "africa",       hubs: 2, shipments: "120K", growth: "+31%" },
]

const ROUTE_COLORS = {
  air:  { stroke: "rgba(249,115,22,0.7)",  glow: "rgba(249,115,22,0.3)"  },
  sea:  { stroke: "rgba(59,130,246,0.7)",  glow: "rgba(59,130,246,0.3)"  },
  rail: { stroke: "rgba(139,92,246,0.7)",  glow: "rgba(139,92,246,0.3)"  },
};

const TIER_CONFIG = {
  mega:      { r: 7,   pulse: 14, opacity: 1.0,  ringCount: 2 },
  primary:   { r: 4.5, pulse: 9,  opacity: 0.85, ringCount: 1 },
  secondary: { r: 3,   pulse: 6,  opacity: 0.6,  ringCount: 0 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNodeById(id: string) {
  return HUB_NODES.find((n) => n.id === id)!;
}

function toSvgCoords(node: HubNode, vw = 1000, vh = 500) {
  return { cx: (node.x / 100) * vw, cy: (node.y / 100) * vh };
}

// Bezier control point for curved routes
function curvedPath(
  x1: number, y1: number,
  x2: number, y2: number,
  curvature = 0.25
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * curvature;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

// ─── Animated Route Component ─────────────────────────────────────────────────

const AnimatedRoute = React.memo(function AnimatedRoute({ edge, index }: {
  edge: RouteEdge;
  index: number;
}) {
  const from = getNodeById(edge.from);
  const to = getNodeById(edge.to);
  const { cx: x1, cy: y1 } = toSvgCoords(from);
  const { cx: x2, cy: y2 } = toSvgCoords(to);
  const d = curvedPath(x1, y1, x2, y2, edge.type === "sea" ? 0.15 : 0.28);
  const colors = ROUTE_COLORS[edge.type];
  const dashPattern = edge.type === "rail" ? "6 3" : edge.type === "sea" ? "10 5" : "4 6";

  return (
    <g>
      {/* Glow layer */}
      <motion.path
        d={d}
        stroke={colors.glow}
        strokeWidth={edge.active ? 4 : 2}
        fill="none"
        filter="url(#routeGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: edge.active ? 0.8 : 0.3 }}
        transition={{ duration: 2.5, delay: index * 0.12, ease: "easeInOut" }}
      />
      {/* Base path */}
      <motion.path
        d={d}
        stroke={colors.stroke}
        strokeWidth={edge.active ? 1.5 : 0.8}
        fill="none"
        strokeDasharray={dashPattern}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: edge.active ? 1 : 0.4 }}
        transition={{ duration: 2.5, delay: index * 0.12, ease: "easeInOut" }}
      />
      {/* Travelling packet — only on active routes */}
      {edge.active && (
        <motion.circle r={2.5} fill={colors.stroke} filter="url(#routeGlow)">
          <animateMotion
            dur={`${3.5 + index * 0.4}s`}
            repeatCount="indefinite"
            path={d}
          />
        </motion.circle>
      )}
    </g>
  );
});


const HubNodeComp = React.memo(function HubNodeComp({ node, index, onHover }: {
  node: HubNode;
  index: number;
  onHover: (id: string | null) => void;
}) {
  const { cx, cy } = toSvgCoords(node);
  const cfg = TIER_CONFIG[node.tier];

  return (
    <g
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer" }}
    >
      {/* Pulse rings for mega/primary */}
      {Array.from({ length: cfg.ringCount }).map((_, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={cfg.pulse}
          stroke={node.tier === "mega" ? "rgba(249,115,22,0.5)" : "rgba(59,130,246,0.4)"}
          strokeWidth={0.8}
          fill="none"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.8, 0, 0.8] }}
          transition={{
            duration: 3 + i * 0.8,
            repeat: Infinity,
            delay: index * 0.3 + i * 1.2,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}

      {/* Core dot */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={cfg.r}
        fill={node.tier === "mega" ? "rgba(249,115,22,0.95)" : node.tier === "primary" ? "rgba(96,165,250,0.9)" : "rgba(148,163,184,0.7)"}
        filter={node.tier !== "secondary" ? "url(#nodeGlow)" : undefined}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: cfg.opacity }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.06, ease: "backOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Label — only mega & primary */}
      {node.tier !== "secondary" && (
        <motion.text
          x={cx + cfg.r + 5}
          y={cy + 3}
          fontSize={node.tier === "mega" ? 9 : 7.5}
          fill="rgba(255,255,255,0.7)"
          fontFamily="'DM Mono', monospace"
          letterSpacing="0.04em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + index * 0.06 }}
        >
          {node.id.toUpperCase()}
        </motion.text>
      )}
    </g>
  );
});

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const val = useMotionValue(0);
  const spring = useSpring(val, { stiffness: 60, damping: 20 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) val.set(target);
  }, [isInView, target, val]);

  useEffect(() =>
    spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    }),
  [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Region Stat Card ─────────────────────────────────────────────────────────

function RegionCard({ stat, index }: { stat: RegionStat; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="group relative rounded-xl p-4 flex flex-col gap-3 overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Hover accent */}
      <motion.div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)" }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-white/35">
          {t(`network.regions.${stat.regionKey}`)}
        </span>
        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
          <TrendingUp size={10} />
          {stat.growth}
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-xl font-bold text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
            {stat.shipments}
          </div>
          <div className="text-[10px] text-white/30 mt-0.5">{t("network.label.shipments")}</div>
        </div>
        <div className="text-right">
          <div className="text-base font-semibold text-orange-400">{stat.hubs}</div>
          <div className="text-[10px] text-white/30">{t("network.label.hubs")}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Live Feed Ticker ─────────────────────────────────────────────────────────

const LIVE_EVENTS_KEYS = [
  "network.live.event1",
  "network.live.event2",
  "network.live.event3",
  "network.live.event4",
  "network.live.event5",
];

function LiveFeed() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % LIVE_EVENTS_KEYS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-full overflow-hidden"
      style={{
        background: "rgba(10,15,30,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        maxWidth: "100%",
      }}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{t("network.live.label")}</span>
      </div>
      <div className="w-px h-3 bg-white/10 shrink-0" />
      <div className="overflow-hidden flex-1 min-w-0">
        <motion.div
          key={current}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-[11px] text-white/50 truncate"
        >
          {t(LIVE_EVENTS_KEYS[current])}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Legend Item ──────────────────────────────────────────────────────────────

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-px" style={{ background: color }} />
      <span className="text-[10px] text-white/35 uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GlobalNetwork() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  const hoveredNode = hoveredHub ? HUB_NODES.find((n) => n.id === hoveredHub) : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0f1e", paddingTop: "120px", paddingBottom: "140px" }}
    >
      {/* ── Atmosphere ── */}

      {/* Top blend from previous section */}
      <div
        className="absolute top-0 inset-x-0 h-48 pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, #0a0f1e 0%, transparent 100%)" }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          left: "48%", top: "28%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          left: "10%", top: "40%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="netgrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#netgrid)" />
      </svg>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-5">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
                <Radio size={11} className="text-orange-400" />
                <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.15em]">{t("network.eyebrow")}</span>
              </div>
              <LiveFeed />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.1] text-white"
              style={{ fontFamily: "'DM Sans', 'Sora', sans-serif" }}
            >
              {t("network.title_line1")}
              <br />
              <span
                className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent"
                style={{ filter: "drop-shadow(0 0 24px rgba(249,115,22,0.5))" }}
              >
                {t("network.title_line2")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-base leading-relaxed max-w-lg font-light"
            >
              {t("network.subtitle")}
            </motion.p>
          </div>

          {/* Top-right KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-6 shrink-0"
          >
            {[
              { icon: MapPin,   labelKey: "network.kpi.hubs",      value: 48,    suffix: "+"   },
              { icon: Package,  labelKey: "network.kpi.countries",  value: 90,    suffix: "+"   },
              { icon: Zap,      labelKey: "network.kpi.uptime",     value: 99,    suffix: ".9%" },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-white/30">
                    <Icon size={11} />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">{t(kpi.labelKey)}</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <AnimatedNumber target={kpi.value} suffix={kpi.suffix} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Map + Right Panel ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">

          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,15,30,0.7)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
              minHeight: 380,
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-orange-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">{t("network.map.title")}</span>
              </div>
              <div className="flex items-center gap-4">
                <LegendItem color="rgba(249,115,22,0.8)" label={t("network.legend.air")} />
                <LegendItem color="rgba(59,130,246,0.8)"  label={t("network.legend.sea")} />
                <LegendItem color="rgba(139,92,246,0.8)"  label={t("network.legend.rail")} />
              </div>
            </div>

            {/* SVG Map */}
            <div className="relative w-full" style={{ paddingBottom: "50%" }}>
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="mapBg" cx="55%" cy="45%" r="60%">
                    <stop offset="0%" stopColor="rgba(249,115,22,0.06)" />
                    <stop offset="50%" stopColor="rgba(59,130,246,0.04)" />
                    <stop offset="100%" stopColor="rgba(10,15,30,0)" />
                  </radialGradient>
                </defs>

                {/* Background glow */}
                <rect width="1000" height="500" fill="url(#mapBg)" />

                {/* Continent outlines — simplified SVG shapes */}
                <g opacity="0.08" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5">
                  {/* North America */}
                  <path d="M 30 80 L 220 70 L 250 100 L 240 180 L 200 240 L 160 260 L 100 250 L 60 200 L 30 150 Z" />
                  {/* South America */}
                  <path d="M 140 290 L 220 280 L 240 350 L 220 440 L 170 470 L 120 450 L 110 380 L 130 320 Z" />
                  {/* Europe */}
                  <path d="M 400 50 L 530 50 L 560 100 L 540 150 L 480 160 L 440 140 L 390 120 Z" />
                  {/* Africa */}
                  <path d="M 430 200 L 560 190 L 590 280 L 560 400 L 510 450 L 460 430 L 420 350 L 410 270 Z" />
                  {/* Asia */}
                  <path d="M 560 40 L 860 40 L 900 100 L 880 200 L 820 220 L 760 200 L 680 220 L 620 200 L 570 160 L 540 100 Z" />
                  {/* Australia */}
                  <path d="M 760 350 L 890 340 L 910 420 L 860 450 L 790 440 L 750 400 Z" />
                </g>

                {/* Routes */}
                {ROUTE_EDGES.map((edge, i) => (
                  <AnimatedRoute key={`${edge.from}-${edge.to}`} edge={edge} index={i} />
                ))}

                {/* Nodes */}
                {HUB_NODES.map((node, i) => (
                  <HubNodeComp key={node.id} node={node} index={i} onHover={setHoveredHub} />
                ))}
              </svg>

              {/* Hover tooltip */}
              {hoveredNode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 rounded-xl px-4 py-3 pointer-events-none"
                  style={{
                    background: "rgba(10,15,30,0.92)",
                    border: "1px solid rgba(249,115,22,0.25)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">
                    {hoveredNode.id.toUpperCase()} · {t(`network.regions.${hoveredNode.regionKey}`)}
                  </div>
                  <div className="text-white text-sm font-semibold">{t(hoveredNode.labelKey)}</div>
                  <div className="text-white/30 text-[10px] mt-0.5">{t(`network.tier.${hoveredNode.tier}`)}</div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right panel — region stats */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] text-white/25 uppercase tracking-[0.12em] font-semibold mb-1"
            >
              {t("network.regions.label")}
            </motion.div>

            {REGION_STATS.map((stat, i) => (
              <RegionCard key={stat.regionKey} stat={stat} index={i} />
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-1 rounded-xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(59,130,246,0.15))" }}
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full rounded-xl px-4 py-4 flex items-center justify-between"
                style={{ background: "rgba(10,15,30,0.9)", backdropFilter: "blur(16px)" }}
              >
                <div className="text-left">
                  <div className="text-white text-sm font-semibold">{t("network.cta.title")}</div>
                  <div className="text-white/35 text-[11px] mt-0.5">{t("network.cta.subtitle")}</div>
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)" }}
                >
                  <ArrowUpRight size={14} className="text-orange-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom feature strips ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Radio,     titleKey: "network.feature1.title", descKey: "network.feature1.desc" },
            { icon: Package,   titleKey: "network.feature2.title", descKey: "network.feature2.desc" },
            { icon: TrendingUp,titleKey: "network.feature3.title", descKey: "network.feature3.desc" },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
                  <Icon size={16} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-white text-[13px] font-semibold mb-1">{t(feat.titleKey)}</div>
                  <div className="text-white/35 text-[12px] leading-relaxed">{t(feat.descKey)}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-0"
        style={{ background: "linear-gradient(to top, #0a0f1e 0%, transparent 100%)" }} />
    </section>
  );
}