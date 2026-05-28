import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] text-white relative overflow-hidden">

      {/* glow background */}
      <div className="absolute w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] bottom-[-200px] right-[-200px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        {/* 404 */}
        <h1 className="text-7xl font-bold tracking-widest text-orange-400">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page not found
        </h2>

        <p className="mt-2 text-white/50 max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  )
}
