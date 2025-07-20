'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NFT {
  id: number
  name: string
  description: string
  image: string
  tokenId: string
  contractAddress: string
  rarity: 'common' | 'rare' | 'legendary'
  mintDate: string
}

interface Transaction {
  id: string
  type: 'mint' | 'transfer' | 'purchase'
  nftName: string
  date: string
  txHash: string
  status: 'confirmed' | 'pending' | 'failed'
}

interface WalletInfo {
  address: string
  connected: boolean
  balance: string
}

// Mock NFT data
const mockNFTs: NFT[] = [
  {
    id: 1,
    name: 'Urban Rider #001',
    description: 'First edition skateboard track NFT featuring the main bowl',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
    tokenId: '1',
    contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
    rarity: 'legendary',
    mintDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Street Session #042',
    description: 'Commemorative NFT from the 2024 Street Competition',
    image: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg',
    tokenId: '42',
    contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
    rarity: 'rare',
    mintDate: '2024-02-20'
  },
  {
    id: 3,
    name: 'Community Badge #156',
    description: 'Special badge for active community members',
    image: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg',
    tokenId: '156',
    contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
    rarity: 'common',
    mintDate: '2024-03-10'
  }
]

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'mint',
    nftName: 'Community Badge #156',
    date: '2024-03-10',
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'mint',
    nftName: 'Street Session #042',
    date: '2024-02-20',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'mint',
    nftName: 'Urban Rider #001',
    date: '2024-01-15',
    txHash: '0x567890abcdef1234567890abcdef1234567890ab',
    status: 'confirmed'
  }
]

export default function NFTDashboard() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [userNFTs, setUserNFTs] = useState<NFT[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [connecting, setConnecting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [minting, setMinting] = useState(false)
  const [activeTab, setActiveTab] = useState<'nfts' | 'mint' | 'history'>('nfts')

  const connectWallet = async () => {
    setConnecting(true)
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        if (accounts.length > 0) {
          setWalletInfo({
            address: accounts[0],
            connected: true,
            balance: '2.5847'
          })
          
          // Load user's NFTs
          setLoading(true)
          await new Promise(resolve => setTimeout(resolve, 2000))
          setUserNFTs(mockNFTs)
          setTransactions(mockTransactions)
          setLoading(false)
        }
      } else {
        // MetaMask not installed - show mock connection for demo
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setWalletInfo({
          address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
          connected: true,
          balance: '2.5847'
        })
        
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUserNFTs(mockNFTs)
        setTransactions(mockTransactions)
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletInfo(null)
    setUserNFTs([])
    setTransactions([])
  }

  const mintNFT = async () => {
    if (!walletInfo) return
    
    setMinting(true)
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Add new NFT to collection
      const newNFT: NFT = {
        id: userNFTs.length + 1,
        name: `Track Supporter #${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        description: 'Special NFT for track supporters and donors',
        image: 'https://images.pexels.com/photos/1263347/pexels-photo-1263347.jpeg',
        tokenId: String(userNFTs.length + 1),
        contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
        rarity: 'common',
        mintDate: new Date().toISOString().split('T')[0]
      }
      
      setUserNFTs([...userNFTs, newNFT])
      
      // Add transaction record
      const newTransaction: Transaction = {
        id: String(transactions.length + 1),
        type: 'mint',
        nftName: newNFT.name,
        date: newNFT.mintDate,
        txHash: '0x' + Math.random().toString(16).substring(2, 66),
        status: 'confirmed'
      }
      
      setTransactions([newTransaction, ...transactions])
      
      alert('NFT minted successfully!')
    } catch (error) {
      console.error('Minting failed:', error)
      alert('Failed to mint NFT. Please try again.')
    } finally {
      setMinting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      case 'rare': return 'text-purple-600 bg-purple-100'
      case 'common': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (!walletInfo) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-black mb-6">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-8">
            Connect your Web3 wallet to view your NFT collection, mint new tokens, 
            and track your transaction history.
          </p>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-8">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Urban Skate Track NFTs
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Collect unique digital assets that represent your connection to our 
              skateboarding community. Each NFT tells a story and grants special privileges.
            </p>
            
            <button
              onClick={connectWallet}
              disabled={connecting}
              className={`px-8 py-3 font-semibold transition-colors ${
                connecting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {connecting ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Connecting...
                </div>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>

          <div className="text-left bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              Supported Wallets
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• MetaMask</li>
              <li>• WalletConnect</li>
              <li>• Coinbase Wallet</li>
              <li>• Trust Wallet</li>
            </ul>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wallet Info Header */}
      <div className="bg-black text-white p-6 rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">NFT Dashboard</h2>
            <p className="text-gray-300 text-sm">
              <strong>Address:</strong> {formatAddress(walletInfo.address)}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Balance:</strong> {walletInfo.balance} ETH
            </p>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'nfts', label: 'My NFTs', count: userNFTs.length },
          { id: 'mint', label: 'Mint New' },
          { id: 'history', label: 'Transaction History', count: transactions.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* My NFTs Tab */}
        {activeTab === 'nfts' && (
          <motion.div
            key="nfts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-gray-600">Loading your NFTs...</p>
              </div>
            ) : userNFTs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  No NFTs Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You don't have any Urban Skate Track NFTs yet. 
                  Start by minting your first one!
                </p>
                <button
                  onClick={() => setActiveTab('mint')}
                  className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
                >
                  Mint Your First NFT
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-black">{nft.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRarityColor(nft.rarity)}`}>
                          {nft.rarity}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{nft.description}</p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Token ID: #{nft.tokenId}</div>
                        <div>Minted: {nft.mintDate}</div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-gray-100 text-black px-3 py-2 text-sm hover:bg-gray-200 transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 bg-black text-white px-3 py-2 text-sm hover:bg-gray-800 transition-colors">
                          Transfer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Mint New Tab */}
        {activeTab === 'mint' && (
          <motion.div
            key="mint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-black mb-6">
                Mint New NFT
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-black mb-4">
                  Track Supporter Collection
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Mint a special NFT to show your support for the Urban Skate Track community. 
                  Each NFT is unique and grants you special privileges within our ecosystem.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Mint Price:</span>
                    <div>0.01 ETH (~$20)</div>
                  </div>
                  <div>
                    <span className="font-medium">Supply:</span>
                    <div>Unlimited</div>
                  </div>
                  <div>
                    <span className="font-medium">Benefits:</span>
                    <div>Community access</div>
                  </div>
                  <div>
                    <span className="font-medium">Rarity:</span>
                    <div>Common</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  NFT Benefits
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Exclusive access to community events</li>
                  <li>• Voting rights on track improvements</li>
                  <li>• Special discounts on merchandise</li>
                  <li>• Priority booking for private sessions</li>
                </ul>
              </div>

              <button
                onClick={mintNFT}
                disabled={minting}
                className={`w-full py-4 font-semibold transition-colors ${
                  minting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {minting ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Minting NFT...
                  </div>
                ) : (
                  'Mint NFT (0.01 ETH)'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Transaction History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black">
                  Transaction History
                </h3>
                <p className="text-gray-600 text-sm">
                  Your NFT-related transactions on the blockchain
                </p>
              </div>
              
              {transactions.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">📜</div>
                  <h4 className="font-semibold text-black mb-2">
                    No Transactions Yet
                  </h4>
                  <p className="text-gray-600">
                    Your transaction history will appear here once you start minting or trading NFTs.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="capitalize font-medium text-black">
                              {tx.type}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tx.status)}`}>
                              {tx.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">
                            {tx.nftName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {tx.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <a
                            href={`https://etherscan.io/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View on Etherscan
                          </a>
                          <p className="text-gray-500 text-xs mt-1">
                            {formatAddress(tx.txHash)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
