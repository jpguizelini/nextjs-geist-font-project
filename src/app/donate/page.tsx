import Navigation from '@/components/Navigation'
import DonationForm from '@/components/DonationFlow/DonationForm'

export const metadata = {
  title: 'Donate - Urban Skate Track',
  description: 'Support our skateboard track community with a donation. Choose from PIX, cryptocurrency, or credit card payments.',
}

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            SUPPORT OUR COMMUNITY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your donation helps us maintain our facilities, organize events, and keep the 
            skateboarding community thriving. Every contribution makes a difference.
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-bold text-black mb-2">$25</div>
            <div className="text-gray-600 text-sm">
              Covers basic maintenance supplies for one week
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-bold text-black mb-2">$100</div>
            <div className="text-gray-600 text-sm">
              Funds a beginner skateboarding workshop
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl font-bold text-black mb-2">$500</div>
            <div className="text-gray-600 text-sm">
              Helps purchase new equipment and safety gear
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <DonationForm />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Why Your Support Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold mb-2">Community Access</h3>
                <p className="text-gray-300 text-sm">
                  We keep our track free and accessible to everyone, regardless of economic background. 
                  Your donations help us maintain this commitment to the community.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Safety & Maintenance</h3>
                <p className="text-gray-300 text-sm">
                  Regular maintenance, safety inspections, and equipment updates ensure 
                  a safe environment for skaters of all skill levels.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Events & Programs</h3>
                <p className="text-gray-300 text-sm">
                  From competitions to beginner workshops, we organize events that bring 
                  the community together and help new skaters learn.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Future Growth</h3>
                <p className="text-gray-300 text-sm">
                  Your support helps us plan for expansion, new features, and improved 
                  facilities to serve our growing community better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
