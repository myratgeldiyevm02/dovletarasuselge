import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import FloatingCards from './FloatingCards'

export default function HeroContent() {
  const { t } = useTranslation()
  const words = t('hero.headline').split(' ')
  const stats = t('hero.context_ministats', {
  returnObjects: true,
}) as { value: string; label: string }[]

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 items-center min-h-[80vh]">

          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8 w-fit"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-medium tracking-wide">{t('hero.context_title')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
            >
              {words.map((word, i) => (
                <span key={i}>
                  {i === 2 || i === 3
                    ? <span className="text-orange-500 relative">
                        {word}
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500/40 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                        />
                      </span>
                    : <span>{word}</span>
                  }
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              {t('hero.subheadline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-orange-500/50 text-slate-300 hover:text-white font-semibold rounded-xl hover:-translate-y-0.5 hover:bg-white/5 transition-all duration-300"
              >
                {t('hero.cta_secondary')}
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-slate-800/60"
            >
              {stats.map((s: any, i: number) => {
                return (
                  <div key={i}>
                    <div className="text-2xl font-black text-orange-500">{s.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:flex justify-end">
            <FloatingCards />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-slate-600 hover:text-orange-500 transition-colors cursor-pointer"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </>
  )
}
