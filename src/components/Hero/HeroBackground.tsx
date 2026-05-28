import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default function HeroBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const isMobile = useMediaQuery('(max-width: 767px)')
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0a0f1e]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(249,115,22,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.6) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        {[...Array(12)].map((_, i) => (
          <line key={i}
            x1={`${-20 + i * 12}%`} y1="0%"
            x2={`${i * 12}%`} y2="100%"
            stroke="#f97316" strokeWidth="1"
          />
        ))}
      </svg>

      {/* Glow orbs */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }
        }
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-500 rounded-full blur-[120px]"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-600 rounded-full blur-[140px]"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.05, 0.1, 0.05] }
        }
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-orange-400 rounded-full blur-[80px]"
      />

      {/* Floating particles */}
      {!isMobile &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            style={{
              left: `${5 + (i * 47) % 90}%`,
              top: `${10 + (i * 31) % 80}%`,
              opacity: 0.2 + (i % 4) * 0.1,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -20, 0],
                    opacity: [0.15, 0.5, 0.15],
                    scale: [1, 1.5, 1],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 3 + (i % 4),
              delay: (i * 0.3) % 3,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Route lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#f97316" />
          </marker>
        </defs>

        <motion.path
          d="M 0 600 Q 250 400 500 550 T 1000 450"
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          strokeDasharray="8 6"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { pathLength: 1, opacity: 1 }
          }
          transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
        />

        <motion.path
          d="M 100 800 Q 400 600 700 750 T 1000 650"
          fill="none"
          stroke="#f97316"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { pathLength: 1, opacity: 0.6 }
          }
          transition={{ duration: 4, ease: 'easeInOut', delay: 1 }}
        />

        <motion.path
          d="M 0 300 Q 300 200 600 350 T 1000 250"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { pathLength: 1, opacity: 0.4 }
          }
          transition={{ duration: 5, ease: 'easeInOut', delay: 1.5 }}
        />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/40 via-transparent to-[#0a0f1e]/40" />
    </motion.div>
  )
}
