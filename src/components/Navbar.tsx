import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'tk', label: 'TK', flag: '🇹🇲' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
]

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0f1e]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="DöwletAra Logo"
                /* Тройной фильтр: белый логотип -> тонкий черный контур -> глубокое белое свечение */
                className="w-40 h-auto brightness-0 invert filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] "
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className="text-slate-300 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Language Switcher */}
            <div className={`relative ${menuOpen ? 'z-[101]' : 'z-50'}`}> 
              {/* Убедитесь, что у Mobile Menu z-index, например, 100. Тогда тут ставим 101 */}
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-orange-500 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <span className="text-base">
                  {languages.find(l => i18n.language?.startsWith(l.code))?.flag || '🇬🇧'}
                </span>
                <span className="text-sm font-medium uppercase">
                  {i18n.language?.slice(0, 2) || 'EN'}
                </span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden min-w-[120px] z-[110]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLangChange(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center gap-2 ${
                          i18n.language?.startsWith(lang.code)
                            ? 'text-orange-500 bg-orange-500/10 font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-slate-300 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0f1e]/98 backdrop-blur-md border-t border-slate-800/50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-300 hover:text-orange-500 hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <div className="border-t border-slate-800 mt-2 pt-3 flex gap-2 flex-wrap px-4">
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar