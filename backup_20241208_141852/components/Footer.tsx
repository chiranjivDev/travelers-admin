'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Safety', href: '/safety' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Send Package', href: '/send-package' },
        { name: 'Browse Trips', href: '/browse-trips' },
        { name: 'Become a Traveler', href: '/become-traveler' },
        { name: 'Business Solutions', href: '/business' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Twitter', href: '#' },
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'LinkedIn', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              DeliveryConnect
            </motion.div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DeliveryConnect. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
