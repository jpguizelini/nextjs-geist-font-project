import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import TrackInfoSection from '@/components/TrackInfoSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrackInfoSection />
    </main>
  )
}
