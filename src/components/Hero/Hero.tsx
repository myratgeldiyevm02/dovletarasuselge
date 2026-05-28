import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import MovingTrain from './MovingTrain'
import FlyingPlane from './FlyingPlane'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      <FlyingPlane />
      <HeroContent />
      <MovingTrain />
    </section>
  )
}
