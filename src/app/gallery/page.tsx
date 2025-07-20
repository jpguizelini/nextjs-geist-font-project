import Navigation from '@/components/Navigation'
import Gallery from '@/components/Gallery'

export const metadata = {
  title: 'Photo Gallery - Urban Skate Track',
  description: 'Explore our collection of skateboarding photos, tricks, events, and community moments.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            PHOTO GALLERY
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capturing the essence of skateboarding culture through the lens. 
            Every trick, every moment, every story told in pixels.
          </p>
        </div>
        
        <Gallery />
      </div>
    </main>
  )
}
