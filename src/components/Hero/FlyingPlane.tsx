import { motion } from 'framer-motion'

export default function FlyingPlane() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ x: '110vw', y: '-5vh' }}
        animate={{ x: '-10vw', y: '25vh' }}
        transition={{ duration: 18, repeat: Infinity, repeatDelay: 8, ease: 'linear' }}
        className="absolute top-0 right-0"
      >
        {/* Trail */}
        <motion.div
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatDelay: 8 }}
          className="absolute right-full top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-transparent to-white/20"
        />

        {/* Plane SVG */}
        <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]" style={{ transform: 'rotate(195deg)' }}>
          <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
          <path d="M8 24 L36 14 L32 24 L36 34 Z" fill="#e2e8f0" opacity="0.9" />
          <path d="M32 14 L36 14 L34 24 Z" fill="#cbd5e1" opacity="0.7" />
          <path d="M32 34 L36 34 L34 24 Z" fill="#cbd5e1" opacity="0.7" />
          <path d="M12 24 L20 20 L22 24 L20 28 Z" fill="#94a3b8" opacity="0.6" />
          <circle cx="33" cy="24" r="1.5" fill="#f97316" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Second smaller plane */}
      <motion.div
        initial={{ x: '105vw', y: '5vh' }}
        animate={{ x: '-5vw', y: '35vh' }}
        transition={{ duration: 25, repeat: Infinity, repeatDelay: 15, ease: 'linear', delay: 10 }}
        className="absolute top-0 right-0 opacity-40"
      >
        <svg width="28" height="28" viewBox="0 0 48 48" style={{ transform: 'rotate(195deg)' }}>
          <path d="M8 24 L36 14 L32 24 L36 34 Z" fill="#e2e8f0" />
          <path d="M12 24 L20 20 L22 24 L20 28 Z" fill="#94a3b8" />
        </svg>
      </motion.div>
    </div>
  )
}
