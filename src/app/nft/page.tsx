import Navigation from '@/components/Navigation'
import NFTDashboard from '@/components/NFTDashboard/NFTDashboard'

export const metadata = {
  title: 'NFT Dashboard - Urban Skate Track',
  description: 'Manage your Urban Skate Track NFT collection, mint new tokens, and view transaction history.',
}

export default function NFTPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            NFT DASHBOARD
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover, collect, and manage your Urban Skate Track NFTs. 
            Each token represents your unique connection to our skateboarding community.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Unique Artwork
            </h3>
            <p className="text-gray-600 text-sm">
              Each NFT features original artwork inspired by our skateboard track and community
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Exclusive Benefits
            </h3>
            <p className="text-gray-600 text-sm">
              NFT holders get special privileges, event access, and community voting rights
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="text-3xl mb-4">⛓️</div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Blockchain Verified
            </h3>
            <p className="text-gray-600 text-sm">
              All NFTs are minted on Ethereum blockchain ensuring authenticity and ownership
            </p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <NFTDashboard />
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              About Our NFTs
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                Urban Skate Track NFTs are more than just digital collectibles. 
                They represent membership in our community and support for our mission 
                to provide free, accessible skateboarding facilities.
              </p>
              <p className="text-sm">
                Each NFT is carefully designed to capture the essence of skateboarding 
                culture and the unique character of our track. From legendary rare pieces 
                to community badges, there's something for every supporter.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-black mb-4">
              Getting Started
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-black">Connect Wallet</h4>
                  <p className="text-gray-600 text-sm">
                    Connect your MetaMask or compatible Web3 wallet
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-black">Mint Your First NFT</h4>
                  <p className="text-gray-600 text-sm">
                    Start with a Track Supporter NFT for just 0.01 ETH
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-black">Enjoy Benefits</h4>
                  <p className="text-gray-600 text-sm">
                    Access exclusive events and community features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
