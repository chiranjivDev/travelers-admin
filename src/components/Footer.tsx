'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  const footerSections = [
    {
      title: t('company.title'),
      links: [
        { name: t('company.aboutUs'), href: '/about' },
        { name: t('company.howItWorks'), href: '/how-it-works' },
        { name: t('company.safety'), href: '/safety' },
        { name: t('company.careers'), href: '/careers' },
        { name: t('company.press'), href: '/press' },
      ],
    },
    {
      title: t('services.title'),
      links: [
        { name: t('services.sendPackage'), href: '/send-package' },
        { name: t('services.browseTrips'), href: '/browse-trips' },
        { name: t('services.becomeTraveler'), href: '/become-traveler' },
        { name: t('services.businessSolutions'), href: '/business' },
      ],
    },
    {
      title: t('support.title'),
      links: [
        { name: t('support.helpCenter'), href: '/help' },
        { name: t('support.contactUs'), href: '/contact' },
        { name: t('support.faqs'), href: '/faq' },
        { name: t('support.termsOfService'), href: '/terms' },
        { name: t('support.privacyPolicy'), href: '/privacy' },
      ],
    },
    {
      title: t('connect.title'),
      links: [
        { name: t('connect.twitter'), href: '#' },
        { name: t('connect.facebook'), href: '#' },
        { name: t('connect.instagram'), href: '#' },
        { name: t('connect.linkedin'), href: '#' },
      ],
    },
  ];

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
              {new Date().getFullYear()} DeliveryConnect.{' '}
              {t('allRightsReserved')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
