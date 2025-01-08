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
        { name: 'FAQs', href: '/faq' },
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
    <footer className="bg-[#0f172a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Logo and Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                DeliveryConnect
              </motion.div>
            </Link>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              {new Date().getFullYear()} DeliveryConnect. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
