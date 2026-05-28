import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function MovingTrain() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '105%'])

  return (
    <div ref={ref} className="absolute bottom-24 left-0 right-0 overflow-hidden pointer-events-none">
      {/* Track */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

      <motion.div style={{ x }} className="relative flex items-end">
        {/* Glow trail */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 h-4 bg-gradient-to-r from-transparent to-orange-500/20 blur-sm" />

        {/* Train SVG */}
        <svg width="220" height="40" viewBox="0 0 220 40" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
          {/* Locomotive */}
          <rect x="140" y="8" width="70" height="22" rx="3" fill="#1e293b" stroke="#f97316" strokeWidth="0.5" />
          <rect x="200" y="12" width="16" height="14" rx="2" fill="#0f172a" stroke="#f97316" strokeWidth="0.5" />
          <rect x="144" y="4" width="30" height="8" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="0.5" />
          {/* Windows */}
          <rect x="150" y="12" width="8" height="6" rx="1" fill="#f97316" opacity="0.7" />
          <rect x="163" y="12" width="8" height="6" rx="1" fill="#f97316" opacity="0.5" />
          <rect x="176" y="12" width="8" height="6" rx="1" fill="#f97316" opacity="0.3" />
          {/* Wheels */}
          <circle cx="155" cy="32" r="5" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          <circle cx="175" cy="32" r="5" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          <circle cx="203" cy="32" r="5" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          {/* Wagon 1 */}
          <rect x="70" y="10" width="65" height="20" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
          <rect x="76" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.6" />
          <rect x="92" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.6" />
          <rect x="108" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.6" />
          <circle cx="85" cy="32" r="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <circle cx="120" cy="32" r="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          {/* Wagon 2 */}
          <rect x="0" y="10" width="65" height="20" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
          <rect x="6" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.5" />
          <rect x="22" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.5" />
          <rect x="38" y="14" width="10" height="7" rx="1" fill="#0f172a" opacity="0.5" />
          <circle cx="15" cy="32" r="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <circle cx="50" cy="32" r="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          {/* Connector */}
          <rect x="65" y="19" width="5" height="3" fill="#334155" />
          <rect x="135" y="19" width="5" height="3" fill="#334155" />
        </svg>
      </motion.div>
    </div>
  )
}
