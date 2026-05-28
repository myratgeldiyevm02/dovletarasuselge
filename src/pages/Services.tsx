import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Truck, Warehouse, FileCheck, Train, Car, ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

function Services() {
  const { t } = useTranslation()

  const services = [
    { icon: Truck, key: 'cargo', color: 'from-orange-500/20 to-orange-600/5', border: 'hover:border-orange-500/40', iconBg: 'bg-orange-500/10 group-hover:bg-orange-500/20' },
    { icon: Warehouse, key: 'warehouse', color: 'from-blue-500/20 to-blue-600/5', border: 'hover:border-blue-500/40', iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20' },
    { icon: FileCheck, key: 'customs', color: 'from-green-500/20 to-green-600/5', border: 'hover:border-green-500/40', iconBg: 'bg-green-500/10 group-hover:bg-green-500/20' },
    { icon: Train, key: 'railway', color: 'from-purple-500/20 to-purple-600/5', border: 'hover:border-purple-500/40', iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20' },
    { icon: Car, key: 'road', color: 'from-yellow-500/20 to-yellow-600/5', border: 'hover:border-yellow-500/40', iconBg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20' },
  ]

  const countries = [
    { name: 'Turkmenistan', flag: '🇹🇲', hub: true },
    { name: 'Russia', flag: '🇷🇺', hub: false },
    { name: 'China', flag: '🇨🇳', hub: false },
    { name: 'Kazakhstan', flag: '🇰🇿', hub: false },
    { name: 'Uzbekistan', flag: '🇺🇿', hub: false },
    { name: 'Turkey', flag: '🇹🇷', hub: false },
    { name: 'UAE', flag: '🇦🇪', hub: false },
    { name: 'Afghanistan', flag: '🇦🇫', hub: false },
    { name: 'Iran', flag: '🇮🇷', hub: false },
    { name: 'Germany', flag: '🇩🇪', hub: false },
    { name: 'Poland', flag: '🇵🇱', hub: false },
    { name: 'Belarus', flag: '🇧🇾', hub: false },
    { name: 'Azerbaijan', flag: '🇦🇿', hub: false },
    { name: 'Kyrgyzstan', flag: '🇰🇬', hub: false },
    { name: 'Tajikistan', flag: '🇹🇯', hub: false },
  ]

  const corridors = [
    {
      from: t('countries.turkmenistan'),
      to: t('countries.china'),
      type: t('corridors.railway_road'),
      days: t('corridors.days_12_15'),
    },
    {
      from: t('countries.turkmenistan'),
      to: t('countries.russia'),
      type: t('corridors.road_railway'),
      days: t('corridors.days_7_10'),
    },
    {
      from: t('countries.turkmenistan'),
      to: t('countries.turkey'),
      type: t('corridors.road_transport'),
      days: t('corridors.days_10_14'),
    },
    {
      from: t('countries.turkmenistan'),
      to: t('countries.uae'),
      type: t('corridors.air_road'),
      days: t('corridors.days_5_7'),
    },
  ]

  return (
    <>
      <SEOHead
        titleKey="seo.services.title"
        descriptionKey="seo.services.description"
        path="/services"
      />
      <div className="bg-[#0a0f1e]">

      {/* Services */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('services.title')}</h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">Comprehensive logistics solutions tailored to your business needs</p>
            <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {services.map((service, i) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative bg-slate-800/50 border border-slate-700/50 ${service.border} rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 transition-colors duration-300`}>
                    <service.icon size={24} className="text-orange-500" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{t(`services.${service.key}`)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{t(`services.${service.key}_desc`)}</p>
                  <div className="flex items-center gap-2 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                    Learn more <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative bg-orange-500 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden hover:bg-orange-400 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/50 to-orange-600/50" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-xl mb-3">Need a custom solution?</h3>
                  <p className="text-orange-100 text-sm leading-relaxed">Contact us and we will design a logistics plan specifically for your business.</p>
                </div>
                <Link to="/contact" className="mt-6 flex items-center gap-2 text-white font-semibold">
                  Get in touch <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t('routes.title')}</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">{t('routes.subtitle')}</p>
            <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-16">
            {countries.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                  ${country.hub
                    ? 'bg-orange-500/10 border-orange-500/40 hover:border-orange-500'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-orange-500/30 hover:bg-slate-800/80'
                  }`}
              >
                {country.hub && (
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                )}
                <span className="text-2xl md:text-3xl">{country.flag}</span>
                <span className={`text-xs font-medium text-center leading-tight ${country.hub ? 'text-orange-400' : 'text-slate-300'}`}>
                  {country.name}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-orange-500" />
              {t('corridors.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {corridors.map((corridor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-400 text-xs font-semibold uppercase tracking-wide">{corridor.type}</span>
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{corridor.from}</div>
                  <div className="text-slate-500 text-xs mb-1">↓</div>
                  <div className="text-white font-semibold text-sm mb-3">{corridor.to}</div>
                  <div className="text-slate-400 text-xs bg-slate-800/50 rounded-lg px-3 py-1.5 inline-block">{corridor.days}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  )
}

export default Services
