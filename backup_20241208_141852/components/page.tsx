'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Delivery Connect Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500/10 backdrop-blur-3xl rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Connect, Travel & Deliver
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join our community of travelers and senders. Save money on shipping while helping others earn from their travels.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/send-package">
                <motion.button 
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send a Package
                </motion.button>
              </Link>
              <Link href="/become-traveler">
                <motion.button 
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Become a Traveler
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-400">10K+</h3>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-400">15K+</h3>
                <p className="text-gray-400">Deliveries</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-400">50+</h3>
                <p className="text-gray-400">Countries</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A simple and secure way to connect package senders with travelers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "List Your Journey or Package",
                description: "Share your travel plans as a traveler or list your package details as a sender.",
                icon: "✈️"
              },
              {
                title: "Connect & Agree",
                description: "Match with the perfect delivery partner and agree on terms through our secure platform.",
                icon: "🤝"
              },
              {
                title: "Track & Deliver",
                description: "Track your package in real-time and complete the delivery with our secure payment system.",
                icon: "📦"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose DeliveryConnect?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of package delivery with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cost-Effective",
                description: "Save up to 70% on shipping costs compared to traditional services.",
                icon: "💰"
              },
              {
                title: "Secure & Safe",
                description: "Verified users, secure payments, and package insurance for peace of mind.",
                icon: "🔒"
              },
              {
                title: "Eco-Friendly",
                description: "Reduce carbon footprint by utilizing existing travel routes.",
                icon: "🌱"
              },
              {
                title: "Global Network",
                description: "Access to travelers worldwide for international deliveries.",
                icon: "🌍"
              },
              {
                title: "Real-Time Tracking",
                description: "Track your package's journey with live updates and notifications.",
                icon: "📱"
              },
              {
                title: "24/7 Support",
                description: "Dedicated customer support team ready to assist you anytime.",
                icon: "🎯"
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who are already saving money and earning through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/send-package">
                <motion.button 
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Your First Package
                </motion.button>
              </Link>
              <Link href="/browse-trips">
                <motion.button 
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Available Trips
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
