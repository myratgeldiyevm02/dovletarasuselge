import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Share2, Link as LinkIcon, Send, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/services' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
]

const socials = [
  { icon: Globe, href: 'https://www.dovletaraduselge.com.tm', label: 'Website' },
  { icon: Send, href: '#', label: 'Telegram' },
  { icon: LinkIcon, href: '#', label: 'LinkedIn' },
  { icon: Share2, href: '#', label: 'Share' },
]

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative bg-slate-900/80 border-t border-slate-800/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]/50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="DöwletAra Logo"
                className="w-40 h-auto brightness-0 invert filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] "
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              {t('footer.company_desc')}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="w-9 h-9 bg-slate-800 hover:bg-orange-500 border border-slate-700/50 hover:border-orange-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t('footer.links')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-orange-500 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-orange-500/0 group-hover:bg-orange-500 rounded-full transition-all duration-200" />
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t('footer.contacts')}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <div className="flex items-start gap-3 text-slate-400 group">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-orange-500/10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200">
                    <Phone size={14} className="text-orange-500" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+99365398338"
                      className="hover:text-orange-500 transition-colors duration-200 text-sm"
                    >
                      +993 65 39 83 38
                    </a>
                    <a
                      href="tel:+99364398338"
                      className="hover:text-orange-500 transition-colors duration-200 text-sm pl-0.5"
                    >
                      +993 64 39 83 38
                    </a>
                    <a
                      href="tel:+989055048338"
                      className="hover:text-orange-500 transition-colors duration-200 text-sm pl-0.5"
                    >
                      +98 905 504 83 38
                    </a>

                  </div>
                </div>
              </li>
              {/* Emails */}
              <li>
                <div className="flex items-start gap-3 text-slate-400 group">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-orange-500/10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200">
                    <Mail size={14} className="text-orange-500" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <a
                      href="mailto:dovletaraduselge@sanly.tm"
                      className="hover:text-orange-500 transition-colors duration-200 text-sm"
                    >
                      dovletaraduselge@sanly.tm
                    </a>

                    <a
                      href="mailto:sohratorazgylyjow5@mail.com"
                      className="hover:text-orange-500 transition-colors duration-200 text-sm pl-0.5"
                    >
                      sohratorazgylyjow5@mail.com
                    </a>
                  </div>
                </div>
              </li>
              <li>
              <div className="group flex items-start gap-3 text-slate-400 pt-1">
                <div className="relative shrink-0">
                   <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="relative w-9 h-9 bg-slate-800 border border-slate-700 group-hover:border-orange-500/50 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md">
                    <MapPin size={15} className="text-orange-500 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                    {t('footer.location') || '745010'}
                  </span>
                  <span className="text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {t('footer.address')}
                  </span>
                </div>
              </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-center">
            © {new Date().getFullYear()} Döwletara Düşelge Logistics. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer