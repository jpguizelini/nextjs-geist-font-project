'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PixPaymentProps {
  amount: number
}

export default function PixPayment({ amount }: PixPaymentProps) {
  const [qrCode, setQrCode] = useState<string>('')
  const [pixKey, setPixKey] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate QR code generation
    const generatePixPayment = async () => {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate mock PIX key and QR code
      const mockPixKey = `00020126580014BR.GOV.BCB.PIX0136${Math.random().toString(36).substring(2, 15)}520400005303986540${amount.toFixed(2)}5802BR5925Urban Skate Track6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      
      setPixKey(mockPixKey)
      
      // In a real implementation, you would generate an actual QR code
      // For demo purposes, we'll use a placeholder
      setQrCode(`data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <rect x="20" y="20" width="160" height="160" fill="black"/>
          <rect x="40" y="40" width="120" height="120" fill="white"/>
          <rect x="60" y="60" width="80" height="80" fill="black"/>
          <text x="100" y="105" text-anchor="middle" fill="white" font-size="12">PIX QR</text>
        </svg>
      `)}`)
      
      setLoading(false)
    }

    generatePixPayment()
  }, [amount])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <motion.div
          className="inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-gray-600">Generating PIX payment...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-black mb-4">
        PIX Payment
      </h2>
      <p className="text-gray-600 mb-6">
        Scan the QR code or copy the PIX key to complete your ${amount} donation
      </p>

      <div className="bg-white p-6 rounded-lg border-2 border-gray-200 max-w-md mx-auto mb-6">
        {/* QR Code */}
        <div className="mb-6">
          <img
            src={qrCode}
            alt="PIX QR Code"
            className="w-48 h-48 mx-auto border border-gray-200"
          />
        </div>

        {/* PIX Key */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIX Key (Copy and Paste)
          </label>
          <div className="flex">
            <input
              type="text"
              value={pixKey}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 bg-gray-50 text-xs font-mono"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 ml-2 font-semibold transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-left text-sm text-gray-600 space-y-2">
          <p className="font-semibold">How to pay:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your bank app</li>
            <li>Go to PIX section</li>
            <li>Scan the QR code or paste the PIX key</li>
            <li>Confirm the payment details</li>
            <li>Complete the transaction</li>
          </ol>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>Waiting for payment confirmation...</strong>
          <br />
          Your donation will be confirmed automatically once the payment is processed.
        </p>
      </div>

      {/* Support Info */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Having trouble? Contact our support team for assistance.</p>
      </div>
    </motion.div>
  )
}
