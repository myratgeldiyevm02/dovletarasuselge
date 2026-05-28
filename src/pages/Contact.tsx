import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import SEOHead from '../components/SEOHead'

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<null | 'success' | 'error'>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setStatus(null)

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error()
      }

      setStatus('success')

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })

      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone', 'Phone'),
      values: [
        '+993 65 39 83 38',
        '+993 64 39 83 38',
        '+98 905 509 83 38',
      ],
    },
    {
      icon: Mail,
      title: t('contact.email', 'Email'),
      values: [
        'dovletaraduselge@sanly.tm',
        'sohratorazgylyjow5@mail.com',
      ],
    },
    {
      icon: MapPin,
      title: t('footer.location', 'Location'),
      values: [t('footer.address', 'Address')],
    },
  ]

  return (
    <>
      <SEOHead
        titleKey="seo.contact.title"
        descriptionKey="seo.contact.description"
        path="/contact"
      /> 
      <div className="bg-[#0a0f1e] min-h-screen font-sans">
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t('contact.title', 'Contact Us')}
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                {t('contact.subtitle', 'Get in touch with us')}
              </p>
              <div className="mt-4 h-1 w-16 bg-orange-500 rounded-full mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">

              {/* Contact Cards */}
              <div className="flex flex-col gap-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-orange-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <info.icon size={20} className="text-orange-500" />
                    </div>

                    <div>
                      <div className="text-slate-400 text-xs mb-1.5">
                        {info.title}
                      </div>

                      <div className="flex flex-col gap-1">
                        {info.values.map((value, idx) => {
                          const href =
                            info.icon === Phone
                              ? `tel:${value.replace(/\s/g, '')}`
                              : info.icon === Mail
                                ? `mailto:${value}`
                                : '#'

                          return (
                            <a
                              key={idx}
                              href={href}
                              className="text-white font-semibold text-sm hover:text-orange-400 transition-colors"
                            >
                              {value}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Form */}
              <motion.div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 md:p-8">

                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle size={48} className="text-green-500 mb-4" />
                    <h3 className="text-white font-bold text-xl">
                      {t('contact.success', 'Message sent successfully!')}
                    </h3>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {status === 'error' && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-2">
                        <AlertCircle size={18} />
                        {t('contact.error', 'Something went wrong')}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label className="text-slate-400 text-xs mb-1.5 block">
                          {t('contact.name', 'Name')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Myrat Myradov"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 text-xs mb-1.5 block">
                          {t('contact.email', 'Email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.example"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 text-xs mb-1.5 block">
                        {t('contact.phone', 'Phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+993 xx xx xx xx"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 text-xs mb-1.5 block">
                        {t('contact.message', 'Message')}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        placeholder="Hello ..."
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-slate-900/50 border border-slate-700/50 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {t('contact.send', 'Send')}
                          <Send size={16} />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact