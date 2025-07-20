'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CryptoPaymentProps {
  amount: number
}

interface WalletInfo {
  address: string
  balance: string
  connected: boolean
}

export default function CryptoPayment({ amount }: CryptoPaymentProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  // Mock wallet addresses for different cryptocurrencies
  const cryptoAddresses = {
    ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
    bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  }

  const connectWallet = async () => {
    setConnecting(true)
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        // Request account access
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        if (accounts.length > 0) {
          // Get balance (mock for demo)
          const mockBalance = (Math.random() * 10).toFixed(4)
          
          setWalletInfo({
            address: accounts[0],
            balance: mockBalance,
            connected: true
          })
        }
      } else {
        // MetaMask not installed - show mock connection for demo
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setWalletInfo({
          address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e',
          balance: '2.5847',
          connected: true
        })
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
    setPaymentStatus('idle')
    setTransactionHash('')
  }

  const sendPayment = async () => {
    if (!walletInfo) return
    
    setPaymentStatus('pending')
    
    try {
      // In a real implementation, this would interact with the blockchain
      // For demo purposes, we'll simulate a transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66)
      setTransactionHash(mockTxHash)
      setPaymentStatus('success')
      
    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('error')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">
          Cryptocurrency Payment
        </h2>
        <p className="text-gray-600">
          Connect your wallet to donate ${amount} in cryptocurrency
        </p>
      </div>

      {!walletInfo ? (
        /* Wallet Connection */
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-black mb-4">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Connect your cryptocurrency wallet to proceed with the donation. 
              We support MetaMask and other Web3 wallets.
            </p>
            
            <button
              onClick={connectWallet}
              disabled={connecting}
              className={`w-full py-3 px-4 font-semibold transition-colors ${
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

          {/* Alternative Payment Methods */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              Alternative Crypto Donations
            </h4>
            <p className="text-blue-700 text-sm mb-3">
              You can also send donations directly to our wallet addresses:
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Ethereum (ETH):</span>
                <br />
                <code className="bg-white px-2 py-1 rounded text-xs">
                  {cryptoAddresses.ethereum}
                </code>
              </div>
              <div>
                <span className="font-medium">Bitcoin (BTC):</span>
                <br />
                <code className="bg-white px-2 py-1 rounded text-xs">
                  {cryptoAddresses.bitcoin}
                </code>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Wallet Connected */
        <div className="max-w-md mx-auto">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-green-800">
                Wallet Connected
              </h3>
              <button
                onClick={disconnectWallet}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Disconnect
              </button>
            </div>
            <p className="text-green-700 text-sm mb-2">
              <strong>Address:</strong> {formatAddress(walletInfo.address)}
            </p>
            <p className="text-green-700 text-sm">
              <strong>Balance:</strong> {walletInfo.balance} ETH
            </p>
          </div>

          {paymentStatus === 'idle' && (
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-black mb-4">
                Donation Details
              </h4>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Donation Amount:</span>
                  <span className="font-semibold">${amount} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated ETH:</span>
                  <span className="font-semibold">~{(amount / 2000).toFixed(6)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span className="font-semibold">~0.002 ETH</span>
                </div>
              </div>
              
              <button
                onClick={sendPayment}
                className="w-full bg-black text-white py-3 px-4 font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Donation
              </button>
            </div>
          )}

          {paymentStatus === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
              <motion.div
                className="inline-block w-8 h-8 border-4 border-yellow-300 border-t-yellow-600 rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h4 className="font-semibold text-yellow-800 mb-2">
                Processing Transaction
              </h4>
              <p className="text-yellow-700 text-sm">
                Please confirm the transaction in your wallet and wait for blockchain confirmation.
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h4 className="font-semibold text-green-800 mb-2">
                Donation Successful!
              </h4>
              <p className="text-green-700 text-sm mb-4">
                Thank you for your ${amount} donation to Urban Skate Track!
              </p>
              <div className="bg-white p-3 rounded border">
                <p className="text-xs text-gray-600 mb-1">Transaction Hash:</p>
                <code className="text-xs break-all">{transactionHash}</code>
              </div>
              <p className="text-green-600 text-xs mt-2">
                View on Etherscan: 
                <a 
                  href={`https://etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline ml-1"
                >
                  {formatAddress(transactionHash)}
                </a>
              </p>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
              <div className="text-red-600 text-4xl mb-4">✗</div>
              <h4 className="font-semibold text-red-800 mb-2">
                Transaction Failed
              </h4>
              <p className="text-red-700 text-sm mb-4">
                There was an error processing your donation. Please try again.
              </p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">
            Security Notice
          </h4>
          <p className="text-gray-600 text-xs">
            Always verify the recipient address before sending cryptocurrency. 
            Transactions are irreversible. We recommend starting with a small test transaction.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
