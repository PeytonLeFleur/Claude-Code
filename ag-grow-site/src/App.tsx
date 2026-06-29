import { PageShell } from './components/layout/PageShell'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileContactBar } from './components/layout/MobileContactBar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Hero } from './components/sections/Hero'
import { TrustBar } from './components/sections/TrustBar'
import { Programs } from './components/sections/Programs'
import { WhyTiming } from './components/sections/WhyTiming'
import { Process } from './components/sections/Process'
import { Services } from './components/sections/Services'
import { BeforeAfter } from './components/sections/BeforeAfter'
import { SnowBand } from './components/sections/SnowBand'
import { Story } from './components/sections/Story'
import { ServiceArea } from './components/sections/ServiceArea'
import { Faq } from './components/sections/Faq'
import { Quote } from './components/sections/Quote'

export default function App() {
  return (
    <div className="grain">
      <ScrollProgress />
      <Header />
      <PageShell>
        <Hero />
        <TrustBar />
        <Programs />
        <WhyTiming />
        <Process />
        <Services />
        <BeforeAfter />
        <SnowBand />
        <Story />
        <ServiceArea />
        <Faq />
        <Quote />
      </PageShell>
      <Footer />
      <MobileContactBar />
    </div>
  )
}
