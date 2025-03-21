'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown,
  FiPackage,
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiGlobe,
  FiClock,
  FiMessageCircle,
} from 'react-icons/fi';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import GlowingCard from '@/components/ui/GlowingCard';
import { useTranslations } from 'next-intl';

const HowItWorksPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('HowItWorks');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const steps = [
    {
      title: t('steps.connect'),
      description: t('steps.connectDescription'),
      icon: <FiUsers className="w-8 h-8" />,
      color: 'bg-blue-500 dark:bg-blue-600',
    },
    {
      title: t('steps.package'),
      description: t('steps.packageDescription'),
      icon: <FiPackage className="w-8 h-8" />,
      color: 'bg-green-500 dark:bg-green-600',
    },
    {
      title: t('steps.track'),
      description: t('steps.trackDescription'),
      icon: <FiMapPin className="w-8 h-8" />,
      color: 'bg-purple-500 dark:bg-purple-600',
    },
    {
      title: t('steps.save'),
      description: t('steps.saveDescription'),
      icon: <FiDollarSign className="w-8 h-8" />,
      color: 'bg-orange-500 dark:bg-orange-600',
    },
  ];

  const categories = [
    { id: 'general', name: t('categories.general'), icon: <FiGlobe /> },
    {
      id: 'security',
      name: t('categories.securitySafety'),
      icon: <FiShield />,
    },
    {
      id: 'shipping',
      name: t('categories.shippingDelivery'),
      icon: <FiPackage />,
    },
    {
      id: 'payment',
      name: t('categories.paymentsRewards'),
      icon: <FiDollarSign />,
    },
    {
      id: 'support',
      name: t('categories.supportCommunication'),
      icon: <FiMessageCircle />,
    },
    { id: 'process', name: t('categories.processTimeline'), icon: <FiClock /> },
  ];

  const faqs = {
    general: [
      {
        question: t('faqs.general.q1'),
        answer: t('faqs.general.a1'),
      },
      {
        question: t('faqs.general.q2'),
        answer: t('faqs.general.a2'),
      },
      {
        question: t('faqs.general.q3'),
        answer: t('faqs.general.a3'),
      },
      {
        question: t('faqs.general.q4'),
        answer: t('faqs.general.a4'),
      },
      {
        question: t('faqs.general.q5'),
        answer: t('faqs.general.a5'),
      },
    ],
    security: [
      {
        question: t('faqs.security.q1'),
        answer: t('faqs.security.a1'),
      },
      {
        question: t('faqs.security.q2'),
        answer: t('faqs.security.a2'),
      },
      {
        question: t('faqs.security.q3'),
        answer: t('faqs.security.a3'),
      },
      {
        question: t('faqs.security.q4'),
        answer: t('faqs.security.a4'),
      },
      {
        question: t('faqs.security.q5'),
        answer: t('faqs.security.a5'),
      },
    ],
    shipping: [
      {
        question: t('faqs.shipping.q1'),
        answer: t('faqs.shipping.a1'),
      },
      {
        question: t('faqs.shipping.q2'),
        answer: t('faqs.shipping.a2'),
      },
      {
        question: t('faqs.shipping.q3'),
        answer: t('faqs.shipping.a3'),
      },
      {
        question: t('faqs.shipping.q4'),
        answer: t('faqs.shipping.a4'),
      },
      {
        question: t('faqs.shipping.q5'),
        answer: t('faqs.shipping.a5'),
      },
    ],

    payment: [
      {
        question: t('faqs.payment.q1'),
        answer: t('faqs.payment.a1'),
      },
      {
        question: t('faqs.payment.q2'),
        answer: t('faqs.payment.a2'),
      },
      {
        question: t('faqs.payment.q3'),
        answer: t('faqs.payment.a3'),
      },
      {
        question: t('faqs.payment.q4'),
        answer: t('faqs.payment.a4'),
      },
      {
        question: t('faqs.payment.q5'),
        answer: t('faqs.payment.a5'),
      },
    ],
    support: [
      {
        question: t('faqs.support.q1'),
        answer: t('faqs.support.a1'),
      },
      {
        question: t('faqs.support.q2'),
        answer: t('faqs.support.a2'),
      },
      {
        question: t('faqs.support.q3'),
        answer: t('faqs.support.a3'),
      },
    ],

    process: [
      {
        question: t('faqs.process.q1'),
        answer: t('faqs.process.a1'),
      },
      {
        question: t('faqs.process.q2'),
        answer: t('faqs.process.a2'),
      },
      {
        question: t('faqs.process.q3'),
        answer: t('faqs.process.a3'),
      },
    ],
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
              {t('howItWorks')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t('howItWorksDescription')}
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
              <div
                className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 transform transition-all duration-300 hover:scale-110`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
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
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            {t('platformStatistics')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('platformStatisticsDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlowingCard label={t('averageSavings')} value={150.0} />
          <GlowingCard label={t('activeTravelers')} value="5,000+" />
          <GlowingCard label={t('successfulDeliveries')} value="10,000+" />
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
          <h2 className="text-4xl font-bold mb-4 text-white">{t('faq')}</h2>
          <p className="text-gray-400">{t('faqDescription')}</p>
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
                    <span className="font-medium text-white">
                      {faq.question}
                    </span>
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
  );
};

export default HowItWorksPage;
