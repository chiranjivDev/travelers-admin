'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
const blogPosts = [
  {
    id: 1,
    title: 'How to Make the Most of Your Travel Deliveries',
    excerpt:
      'Learn the best practices for maximizing your earnings and efficiency when delivering packages during your travels.',
    category: 'Traveler Tips',
    date: '2024-01-15',
    image: '/package-bg.jpg',
    slug: 'maximize-travel-deliveries',
  },
  {
    id: 2,
    title: 'Safety Guidelines for International Package Delivery',
    excerpt:
      'Essential safety tips and guidelines to ensure secure and compliant international package delivery.',
    category: 'Safety',
    date: '2024-01-10',
    image: '/traveler-bg.jpg',
    slug: 'safety-guidelines',
  },
  {
    id: 3,
    title: 'Understanding Package Size and Weight Restrictions',
    excerpt:
      'A comprehensive guide to package restrictions and how to properly measure your items.',
    category: 'Sender Tips',
    date: '2024-01-05',
    image: '/hero-bg.jpg',
    slug: 'size-weight-restrictions',
  },
];

export default function BlogPage() {
  const t = useTranslations('Blog');
  const [selectedCategory, setSelectedCategory] = useState(t('posts.allPosts'));
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    t('posts.allPosts'),
    t('posts.travelerTips'),
    t('posts.senderTips'),
    t('posts.safety'),
    t('posts.platformUpdates'),
    t('posts.successStories'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Hero Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Blog Hero"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/95 to-[#1e293b]/95" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {/* DeliveryConnect Blog */}
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              {/* Tips, guides, and updates to help you make the most of
              peer-to-peer delivery */}
              {t('description')}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="relative py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <FiTag className="mr-2" />
                      {post.category}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 mb-4">{post.excerpt}</p>

                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    Read More
                    <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/package-bg.jpg"
                alt="Newsletter Background"
                fill
                className="object-cover opacity-20"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
            </div>

            <div className="relative py-16 px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {/* Stay Updated */}
                  {t('stayUpdated')}
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  {/* Subscribe to our newsletter for the latest delivery tips,
                  traveler stories, and platform updates. */}
                  {t('newsletterDescription')}
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <input
                      type="email"
                      placeholder={t('enterYourEmail')}
                      className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                    >
                      {/* Subscribe */}
                      {t('subscribe')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
