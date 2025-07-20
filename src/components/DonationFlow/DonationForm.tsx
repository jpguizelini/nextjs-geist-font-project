'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PixPayment from './PixPayment'
import CryptoPayment from './CryptoPayment'

const donationSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least $1'),
  paymentMethod: z.enum(['pix', 'crypto', 'card'], {
    required_error: 'Please select a payment method',
  }),
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

type DonationFormData = z.infer<typeof donationSchema>

const steps = [
  { id: 1, title: 'Amount', description: 'Choose donation amount' },
  { id: 2, title: 'Method', description: 'Select payment method' },
  { id: 3, title: 'Details', description: 'Enter your information' },
  { id: 4, title: 'Payment', description: 'Complete donation' },
]

const predefinedAmounts = [10, 25, 50, 100, 250, 500]

export default function DonationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    mode: 'onChange',
  })

  const watchedValues = watch()

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setValue('amount', amount)
    setCustomAmount('')
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setValue('amount', numValue)
      setSelectedAmount(null)
    }
  }

  const onSubmit = (data: DonationFormData) => {
    console.log('Donation submitted:', data)
    // Handle donation submission
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return watchedValues.amount && watchedValues.amount > 0
      case 2:
        return watchedValues.paymentMethod
      case 3:
        return watchedValues.email && watchedValues.name && !errors.email && !errors.name
      default:
        return true
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center ${
                step.id < steps.length ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step.id
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id}
              </div>
              {step.id < steps.length && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-black' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-black">
            {steps[currentStep - 1].title}
          </h3>
          <p className="text-gray-600 text-sm">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Amount Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">
                  Choose Your Donation Amount
                </h2>
                <p className="text-gray-600 mb-6">
                  Your support helps us maintain and improve our skateboard track for the community.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 border-2 text-lg font-semibold transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">
                  Select Payment Method
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose how you'd like to make your ${watchedValues.amount} donation.
                </p>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value="pix"
                      {...register('paymentMethod')}
                      className="mr-4"
                    />
                    <div>
                      <div className="font-semibold">PIX Payment</div>
                      <div className="text-sm text-gray-600">
                        Instant payment via Brazilian PIX system
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value="crypto"
                      {...register('paymentMethod')}
                      className="mr-4"
                    />
                    <div>
                      <div className="font-semibold">Cryptocurrency</div>
                      <div className="text-sm text-gray-600">
                        Pay with Bitcoin, Ethereum, or other cryptocurrencies
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="mr-4"
                    />
                    <div>
                      <div className="font-semibold">Credit Card</div>
                      <div className="text-sm text-gray-600">
                        Pay securely with your credit or debit card
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">
                  Your Information
                </h2>
                <p className="text-gray-600 mb-6">
                  We'll send you a confirmation receipt for your donation.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment Processing */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {watchedValues.paymentMethod === 'pix' && (
                <PixPayment amount={watchedValues.amount} />
              )}
              {watchedValues.paymentMethod === 'crypto' && (
                <CryptoPayment amount={watchedValues.amount} />
              )}
              {watchedValues.paymentMethod === 'card' && (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Credit Card Payment
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Credit card integration would be implemented here with a secure payment processor.
                  </p>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <p className="text-gray-600">
                      This is a demo. In production, this would integrate with Stripe, PayPal, or another payment processor.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className={`px-6 py-3 font-semibold transition-colors ${
                canProceedToNext()
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Complete Donation
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
