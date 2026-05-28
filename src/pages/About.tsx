import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, Shield, Zap, HeadphonesIcon, Trophy, Globe, Lock, ClipboardList, Route, FileCheck, PackageCheck } from 'lucide-react'
import SEOHead from '../components/SEOHead'

function About() {
  const { t } = useTranslation()

  const features = [
    { 
      icon: Target, 
      title: t('about.mission_title'),
      desc: t('about.mission') 
    },
    {
      icon: Eye,
      title: t('about.vision_title'),
      desc: t('about.vision_desc')
    },
    {
      icon: Award,
      title: t('about.quality_title'),
      desc: t('about.quality_desc')
    },
    {
      icon: Users,
      title: t('about.team_title'),
      desc: t('about.team_desc')
    },
  ]

  const reasons = [
    { icon: Shield, titleKey: 'why.reliability', descKey: 'why.reliability_desc', color: 'text-orange-500', bg: 'bg-orange-500/10 group-hover:bg-orange-500/20' },
    { icon: Zap, titleKey: 'why.speed', descKey: 'why.speed_desc', color: 'text-yellow-500', bg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20' },
    { icon: HeadphonesIcon, titleKey: 'why.support', descKey: 'why.support_desc', color: 'text-blue-500', bg: 'bg-blue-500/10 group-hover:bg-blue-500/20' },
    { icon: Trophy, titleKey: 'why.experience', descKey: 'why.experience_desc', color: 'text-purple-500', bg: 'bg-purple-500/10 group-hover:bg-purple-500/20' },
    { icon: Globe, title: t('about.global_network'),
desc: t('about.global_network_desc'), color: 'text-green-500', bg: 'bg-green-500/10 group-hover:bg-green-500/20' },
    { icon: Lock, title: t('about.cargo_security'),
desc: t('about.cargo_security_desc'), color: 'text-red-500', bg: 'bg-red-500/10 group-hover:bg-red-500/20' },
  ]

  const steps = [
    { icon: ClipboardList, titleKey: 'process.step1', descKey: 'process.step1_desc', number: '01' },
    { icon: Route, titleKey: 'process.step2', descKey: 'process.step2_desc', number: '02' },
    { icon: FileCheck, titleKey: 'process.step3', descKey: 'process.step3_desc', number: '03' },
    { icon: PackageCheck, titleKey: 'process.step4', descKey: 'process.step4_desc', number: '04' },
  ]

  return (
    <>
      <SEOHead
        titleKey="seo.about.title"
        descriptionKey="seo.about.description"
        path="/about"
      /> 
      <div className="bg-[#0a0f1e]">

        {/* About */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('about.title')}</h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">{t('about.description')}</p>
              <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50 p-8">
                  <div className="aspect-square md:aspect-video rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-orange-500 rounded-full"
                        style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      />
                    ))}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      <line x1="15%" y1="20%" x2="29%" y2="45%" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="29%" y1="45%" x2="43%" y2="20%" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="43%" y1="20%" x2="57%" y2="45%" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="57%" y1="45%" x2="71%" y2="20%" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="71%" y1="20%" x2="85%" y2="45%" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                    <div className="text-center z-10">
                      <div className="text-5xl font-black text-orange-500 mb-2">15+</div>
                      <div className="text-slate-400 text-sm">
                        {t('about.years_excellence')}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-orange-500/30 hover:bg-slate-800/80 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors duration-300">
                      <feature.icon size={20} className="text-orange-500" />
                    </div>
                    <h3 className="text-white font-semibold mb-1 text-sm md:text-base">{feature.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent" />
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('why.title')}</h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">{t('about.why_desc')}</p>
              <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 rounded-2xl p-6 md:p-8 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-5 transition-colors duration-300`}>
                    <reason.icon size={24} className={reason.color} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">
                    {'titleKey' in reason ? t(reason.titleKey as string) : reason.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {'descKey' in reason ? t(reason.descKey as string) : reason.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 relative bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 rounded-2xl p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-500/10 to-transparent" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{t('about.cta_title')}</h3>
                  <p className="text-slate-400 text-sm md:text-base">{t('about.cta_desc')}</p>
                </div>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-300 shadow-lg shadow-orange-500/25"
                >
                  {t('about.cta_button')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('process.title')}</h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">{t('about.process_desc')}</p>
              <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
            </motion.div>

            {/* Desktop */}
            <div className="hidden md:block mt-16">
              <div className="relative">
                <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                <div className="grid grid-cols-4 gap-8">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="relative flex flex-col items-center text-center"
                    >
                      <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-full bg-slate-800/80 border-2 border-slate-700/50 flex items-center justify-center hover:border-orange-500/50 transition-all duration-300">
                          <step.icon size={36} className="text-orange-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-black">{step.number}</span>
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-3">{t(step.titleKey)}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{t(step.descKey)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden mt-12">
              <div className="relative pl-8">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-orange-500/30 to-transparent" />
                <div className="flex flex-col gap-10">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-8 top-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <span className="text-white text-xs font-black">{step.number}</span>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                            <step.icon size={20} className="text-orange-500" />
                          </div>
                          <h3 className="text-white font-bold text-base">{t(step.titleKey)}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{t(step.descKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default About