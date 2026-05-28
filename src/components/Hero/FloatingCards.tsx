import { motion } from 'framer-motion'
import { Plane, Train, Ship, Warehouse } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function FloatingCards() {
  const { t } = useTranslation()

  const translations = t('hero.floating_cards', {
    returnObjects: true,
  }) as {
    label: string
    value: string
  }[]

  const cards = [
    {
      icon: Plane,
      color: 'from-orange-500/20 to-orange-600/5',
      border: 'border-orange-500/30',
      delay: 0,
      ...translations[0],
    },
    {
      icon: Train,
      color: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-500/20',
      delay: 0.15,
      ...translations[1],
    },
    {
      icon: Ship,
      color: 'from-cyan-500/20 to-cyan-600/5',
      border: 'border-cyan-500/20',
      delay: 0.3,
      ...translations[2],
    },
    {
      icon: Warehouse,
      color: 'from-purple-500/20 to-purple-600/5',
      border: 'border-purple-500/20',
      delay: 0.45,
      ...translations[3],
    },
  ]

  return (
    <div className="flex flex-col gap-3 w-full max-w-[200px]">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + card.delay }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.5 + i * 0.5,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
            className={`bg-gradient-to-br ${card.color} backdrop-blur-sm border ${card.border} rounded-xl px-4 py-3 flex items-center gap-3`}
          >
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
              <card.icon size={16} className="text-orange-400" />
            </div>

            <div>
              <div className="text-white text-xs font-semibold leading-tight">
                {card.label}
              </div>

              <div className="text-slate-400 text-[11px] mt-0.5">
                {card.value}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}