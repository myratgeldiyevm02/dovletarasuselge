import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight, X } from 'lucide-react'

// ─── Stock photo URLs from Unsplash (free, no API needed) ───────────────────
const GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    label: 'Railway Freight',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    label: 'Container Port',
  },
  {
    url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
    label: 'Cargo Crane',
  },
  {
    url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
    label: 'Freight Train',
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    label: 'Logistics Hub',
  },
]

// ─── Типы ────────────────────────────────────────────────────────────────────
interface Photo {
  url: string
  label: string
}

// ─── Компонент лайтбокс ──────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.95)' }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <X size={18} />
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Image */}
        <motion.img
          key={index}
          loading='lazy'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={photos[index].url.replace('w=800', 'w=1400')}
          alt={photos[index].label}
          className="max-w-5xl max-h-[80vh] w-full h-full object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <ChevronRight size={22} />
        </button>

        {/* Label */}
        <div className="absolute bottom-8 text-white/50 text-sm tracking-widest uppercase">
          {photos[index].label} — {index + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Главный компонент ───────────────────────────────────────────────────────
export default function MediaShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [videoError, setVideoError] = useState(false)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const prevSlide = () =>
    setActiveSlide((i) => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)
  const nextSlide = () =>
    setActiveSlide((i) => (i + 1) % GALLERY_PHOTOS.length)

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#0a0f1e', paddingTop: '100px', paddingBottom: '120px' }}
    >
      {/* Atmospheric orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '10%', top: '20%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '5%', bottom: '15%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-orange-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.15em]">
              {/* Добавь ключ в переводы или оставь хардкод */}
              Our Operations
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            See Us{' '}
            <span
              className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.3))' }}
            >
              In Action
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto font-light">
            Real infrastructure. Real capacity. Real results across 45+ countries.
          </p>
        </motion.div>

        {/* ── Video Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden mb-6"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,15,30,0.8)',
          }}
        >
          
          
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/video-poster.jpg"
            className="w-full aspect-video object-cover"
            style={{ filter: 'brightness(0.75)' }}
            onError={() => setVideoError(true)}
          >
            <source src="/videos/operations.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full aspect-video flex items-center justify-center text-white/40 text-sm"
            style={{
              background:
                'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(59,130,246,0.12))',
            }}
          >
            Video unavailable
          </div>
        )}
         

         

          {/* Video overlay controls */}
          <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                onClick={toggleVideo}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(249,115,22,0.85)', backdropFilter: 'blur(8px)' }}
              >
                {isPlaying
                  ? <Pause size={15} className="text-white" />
                  : <Play size={15} className="text-white ml-0.5" />
                }
              </button>
              <span className="text-white/50 text-xs tracking-widest uppercase">
                Live Operations Feed
              </span>
            </div>

            {/* Duration badge */}
            <div
              className="ml-auto text-white/40 text-xs font-mono tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            >
              HD · LOOP
            </div>
          </div>
        </motion.div>

        {/* ── Photo Gallery Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Main slider */}
          <div className="relative rounded-2xl overflow-hidden mb-3" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <AnimatePresence mode="wait">
              <motion.img
                loading="lazy"
                key={activeSlide}
                src={GALLERY_PHOTOS[activeSlide].url}
                alt={GALLERY_PHOTOS[activeSlide].label}
                className="w-full object-cover cursor-pointer"
                style={{ height: '320px' }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIdx(activeSlide)}
              />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 50%)' }} />

            {/* Label */}
            <div className="absolute bottom-4 left-5 text-white/70 text-sm font-medium tracking-wide">
              {GALLERY_PHOTOS[activeSlide].label}
            </div>

            {/* Nav arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2">
            {GALLERY_PHOTOS.map((photo, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveSlide(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  height: '72px',
                  border: i === activeSlide
                    ? '2px solid rgba(249,115,22,0.8)'
                    : '2px solid rgba(255,255,255,0.06)',
                  opacity: i === activeSlide ? 1 : 0.55,
                }}
              >
                <img
                  loading='lazy'
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
                {i === activeSlide && (
                  <div className="absolute inset-0"
                    style={{ background: 'rgba(249,115,22,0.15)' }} />
                )}
              </motion.button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {GALLERY_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeSlide ? 20 : 6,
                  height: 6,
                  background: i === activeSlide ? '#f97316' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          photos={GALLERY_PHOTOS}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => ((i ?? 0) - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)}
          onNext={() => setLightboxIdx((i) => ((i ?? 0) + 1) % GALLERY_PHOTOS.length)}
        />
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0f1e 0%, transparent 100%)' }}
      />
    </section>
  )
}
