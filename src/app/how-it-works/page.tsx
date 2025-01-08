'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiPackage, FiUsers, FiMapPin, FiDollarSign, FiShield, FiGlobe, FiClock, FiMessageCircle } from 'react-icons/fi'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import GlowingCard from '@/components/ui/GlowingCard'

const HowItWorksPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('general')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const steps = [
    {
      title: 'Connect',
      description: 'Connect with travelers heading to your destination',
      icon: <FiUsers className="w-8 h-8" />,
      color: 'bg-blue-500 dark:bg-blue-600'
    },
    {
      title: 'Package',
      description: 'Prepare your package and arrange pickup details',
      icon: <FiPackage className="w-8 h-8" />,
      color: 'bg-green-500 dark:bg-green-600'
    },
    {
      title: 'Track',
      description: 'Track your package throughout its journey',
      icon: <FiMapPin className="w-8 h-8" />,
      color: 'bg-purple-500 dark:bg-purple-600'
    },
    {
      title: 'Save',
      description: 'Save money while helping travelers earn rewards',
      icon: <FiDollarSign className="w-8 h-8" />,
      color: 'bg-orange-500 dark:bg-orange-600'
    }
  ]

  const categories = [
    { id: 'general', name: 'General', icon: <FiGlobe /> },
    { id: 'security', name: 'Security & Safety', icon: <FiShield /> },
    { id: 'shipping', name: 'Shipping & Delivery', icon: <FiPackage /> },
    { id: 'payment', name: 'Payments & Rewards', icon: <FiDollarSign /> },
    { id: 'support', name: 'Support & Communication', icon: <FiMessageCircle /> },
    { id: 'process', name: 'Process & Timeline', icon: <FiClock /> }
  ]

  const faqs = {
    general: [
      {
        question: 'How does the platform work for travelers and senders?',
        answer: 'Our platform connects travelers with extra luggage space to senders who need an affordable, fast, and efficient way to send their items. Senders post item requests, and travelers can accept these requests if they have the capacity to carry them. Both parties benefit — travelers earn rewards, and senders save on delivery fees.'
      },
      {
        question: 'Is the platform a licensed and certified service?',
        answer: 'Yes, we operate as a licensed and certified platform, ensuring compliance with legal and regulatory standards. Our certifications include a Trade License and Certificate of Formation, providing transparency, reliability, and user trust.'
      },
      {
        question: 'What are the key benefits of using this platform?',
        answer: 'Our platform offers several advantages: affordable shipping compared to traditional methods, extra income for travelers utilizing unused luggage space, eco-friendly shared shipping system, and flexibility in routes, timings, and delivery preferences.'
      },
      {
        question: 'Can I send items both internationally and intercity?',
        answer: 'Yes, you can send items both intercity and internationally. Our platform connects travelers moving between cities or countries, offering senders a variety of delivery routes for faster and more flexible shipping options.'
      },
      {
        question: 'How do I create an account on the platform?',
        answer: 'Creating an account is simple: download the app or visit the website, sign up using your email or social login, and complete the account setup, which includes verification steps.'
      }
    ],
    security: [
      {
        question: 'How is the safety and security of items ensured during transit?',
        answer: 'We prioritize item security through user verification, ratings & reviews system, and optional insurance for package protection. Both parties rate each other after delivery, encouraging responsible behavior.'
      },
      {
        question: 'How does the platform verify the identity of users?',
        answer: 'To build trust and safety, we require user verification during the account setup process. This includes verifying personal information such as name, email, and, in some cases, government-issued identification.'
      },
      {
        question: 'What happens if an item is lost, stolen, or damaged?',
        answer: 'If an item is lost, stolen, or damaged during delivery, users should file a claim through the platform. Depending on the circumstances, optional insurance (if purchased) may cover these incidents. Claims are reviewed and resolved based on the platform\'s claim policies.'
      },
      {
        question: 'How do you handle disputes between users?',
        answer: 'We have a dedicated dispute resolution team that handles conflicts between users. The team reviews evidence from both parties and works to find fair solutions based on our platform policies.'
      },
      {
        question: 'What security measures are in place for payments?',
        answer: 'We use industry-standard encryption and secure payment processing systems. All financial transactions are protected, and we never store sensitive payment information.'
      }
    ],
    shipping: [
      {
        question: 'What types of items can be sent through the platform?',
        answer: 'The platform allows shipment of personal belongings, documents, electronics, gadgets, clothing, and accessories. However, restricted or prohibited items (such as hazardous materials, illegal goods, or flammable items) are not allowed.'
      },
      {
        question: 'Are there any size or weight limits for items?',
        answer: 'Yes, item size and weight limits depend on the available space provided by the traveler. Travelers specify how much space they have, and senders can choose a traveler that matches their package size and weight needs.'
      },
      {
        question: 'Can I track my package during delivery?',
        answer: 'Yes, senders can track the status of their items in real-time. Our system provides updates on the traveler\'s progress, offering peace of mind and transparency throughout the entire shipping process.'
      },
      {
        question: 'How do I arrange pickup and delivery?',
        answer: 'You can coordinate directly with the traveler through our platform\'s messaging system to arrange convenient pickup and delivery locations and times.'
      },
      {
        question: 'What should I do if my delivery is delayed?',
        answer: 'Contact your traveler through the platform\'s messaging system. If you can\'t reach them, our support team is available 24/7 to help resolve any delivery issues.'
      }
    ],
    payment: [
      {
        question: 'How do payments work on the platform?',
        answer: 'Payments are processed securely through our internal payment system. Senders pay directly via the platform, and all payments are encrypted to ensure user privacy and data protection.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept various payment methods including credit/debit cards, digital wallets, and bank transfers. All payments are processed securely through our platform.'
      },
      {
        question: 'How does the rewards system work?',
        answer: 'Travelers earn rewards for successful deliveries. These rewards can be converted to platform credits or cash. The more deliveries completed, the higher the rewards.'
      },
      {
        question: 'Can I earn bonuses through referrals?',
        answer: 'Yes, users can participate in our referral program. When you invite friends or family who complete their first transaction, both you and the referred user receive bonus rewards.'
      },
      {
        question: 'What happens to my payment if delivery fails?',
        answer: 'If a delivery cannot be completed, we have a refund policy in place. The amount refunded depends on the circumstances and timing of the cancellation.'
      }
    ],
    support: [
      {
        question: 'How can I contact customer support?',
        answer: 'Our customer support team is available 24/7 through multiple channels including live chat, email, and phone. You can also find answers to common questions in our help center.'
      },
      {
        question: 'What if I need to cancel my booking?',
        answer: 'You can cancel your booking through the platform. The refund amount will depend on how close to the delivery date you cancel and our cancellation policy.'
      },
      {
        question: 'How can I report inappropriate behavior?',
        answer: 'Use the report function in the app or contact our support team immediately. We take all reports seriously and investigate thoroughly.'
      }
    ],
    process: [
      {
        question: 'How long does the delivery process usually take?',
        answer: 'Delivery times vary depending on the route and traveler\'s schedule. You can see estimated delivery times when browsing available travelers.'
      },
      {
        question: 'What happens after I book a traveler?',
        answer: 'After booking, you\'ll receive confirmation and can begin coordinating with the traveler through our messaging system.'
      },
      {
        question: 'Can I schedule deliveries in advance?',
        answer: 'Yes, you can book travelers weeks or months in advance, depending on their posted travel schedules.'
      }
    ]
  }

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Connect with travelers, send your packages, and save money. It's that simple!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section with Enhanced Animation */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 transform transition-all duration-300 hover:scale-110`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section with Glowing Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Platform Statistics</h2>
          <p className="text-gray-600 dark:text-gray-300">See how our platform is making a difference</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlowingCard
            label="Average Savings"
            value={150.00}
          />
          <GlowingCard
            label="Active Travelers"
            value="5,000+"
          />
          <GlowingCard
            label="Successful Deliveries"
            value="10,000+"
          />
        </div>
      </div>

      {/* FAQ Section with Categories */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to the most common questions about our platform</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm'
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-indigo-500/50 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/50"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-4 bg-gray-800/50 text-gray-300"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HowItWorksPage
