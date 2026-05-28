import GlobalNetwork from '../components/GlobalNetwork'
import Hero from '../components/Hero/Hero'
import Stats from '../components/Hero/Stats'
import OperationalExcellence from '../components/Operationalexcellence'
import ServicesPreview from '../components/ServicesPreview'
import MediaShowcase from '../components/MediaShowcase'

export default function Home() {
  return (
    <div className="bg-[#0a0f1e]">
      <Hero />
      <Stats />
      <ServicesPreview />
      <MediaShowcase />
      <GlobalNetwork />
      <OperationalExcellence />
    </div>
  )
}