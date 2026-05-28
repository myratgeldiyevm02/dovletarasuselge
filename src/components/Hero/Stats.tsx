import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Clock, Package, Warehouse } from 'lucide-react'

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest) + suffix
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const stats = [
  { icon: Globe, value: 15, suffix: '+', labelKey: 'stats.countries', desc: 'Active trade destinations' },
  { icon: Clock, value: 10, suffix: '+', labelKey: 'stats.experience', desc: 'In international logistics' },
  { icon: Package, value: 5000, suffix: '+', labelKey: 'stats.deliveries', desc: 'Successfully completed' },
  { icon: Warehouse, value: 3, suffix: '', labelKey: 'stats.warehouses', desc: 'Modern storage facilities' },
]

export default function Stats() {
  const { t } = useTranslation()

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      <div className="absolute inset-0 bg-slate-900/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group text-center bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-slate-800/80"
            >
              <div className="w-12 h-12 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <stat.icon size={24} className="text-orange-500" />
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-orange-500 mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-sm md:text-base mb-1">{t(stat.labelKey)}</div>
              <div className="text-slate-500 text-xs md:text-sm">{stat.desc}</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-orange-500/0 group-hover:bg-orange-500/60 rounded-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
