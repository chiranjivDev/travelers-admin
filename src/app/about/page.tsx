'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiGlobe,
  FiUsers,
  FiTruck,
  FiShield,
  FiStar,
  FiArrowRight,
  FiCheck,
  FiDollarSign,
  FiHeart,
} from 'react-icons/fi';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const AboutPage = () => {
  const t = useTranslations('AboutUs');
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Global Network"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div className="text-center" {...fadeInUp}>
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring' }}
              className="mb-8"
            >
              <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <FiPackage className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t('title')}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {' '}
                {t('delivery')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              {t('description')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: <FiUsers />,
                  label: t('stats.users.label'),
                  sublabel: t('stats.users.sublabel'),
                },
                {
                  icon: <FiGlobe />,
                  label: t('stats.countries.label'),
                  sublabel: t('stats.countries.sublabel'),
                },
                {
                  icon: <FiTruck />,
                  label: t('stats.deliveries.label'),
                  sublabel: t('stats.deliveries.sublabel'),
                },
                {
                  icon: <FiStar />,
                  label: t('stats.rating.label'),
                  sublabel: t('stats.rating.sublabel'),
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl text-blue-400 mb-3">{stat.icon}</div>
                  <div className="text-white font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/package-bg.jpg"
            alt="Global Travel Network"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/95 to-[#1e293b]/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('howItWorks.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: t('howItWorks.connect'),
                description: t('howItWorks.connectDescription'),
                icon: <FiUsers />,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                title: t('howItWorks.match'),
                description: t('howItWorks.matchDescription'),
                icon: <FiCheck />,
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                title: t('howItWorks.deliver'),
                description: t('howItWorks.deliverDescription'),
                icon: <FiTruck />,
                color: 'from-orange-500 to-red-500',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative rounded-xl bg-gray-900/60 backdrop-blur-xl p-8 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{step.description}</p>
                      <div className="text-3xl text-blue-400">{step.icon}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="/traveler-bg.jpg"
            alt="Modern Delivery"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('benefits.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiDollarSign />,
                title: t('benefits.costEffective'),
                description: t('benefits.costEffectiveDescription'),
              },
              {
                icon: <FiHeart />,
                title: t('benefits.ecoFriendly'),
                description: t('benefits.ecoFriendlyDescription'),
              },
              {
                icon: <FiShield />,
                title: t('benefits.secureSafe'),
                description: t('benefits.secureSafeDescription'),
              },
              {
                icon: <FiGlobe />,
                title: t('benefits.globalReach'),
                description: t('benefits.globalReachDescription'),
              },
              {
                icon: <FiUsers />,
                title: t('benefits.communityDriven'),
                description: t('benefits.communityDrivenDescription'),
              },
              {
                icon: <FiTruck />,
                title: t('benefits.flexibleDelivery'),
                description: t('benefits.flexibleDeliveryDescription'),
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-px rounded-xl bg-gradient-to-b from-blue-500/20 to-purple-500/20"
              >
                <div className="relative rounded-xl bg-gray-900/60 backdrop-blur-xl p-8 h-full">
                  <div className="text-3xl text-blue-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=100"
            alt="Team Collaboration"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/95 to-[#1e293b]/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('successStories.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {t('successStories.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: t('successStories.stories.0.quote'),
                author: t('successStories.stories.0.author'),
                role: t('successStories.stories.0.role'),
                image:
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
              },
              {
                quote: t('successStories.stories.1.quote'),
                author: t('successStories.stories.1.author'),
                role: t('successStories.stories.1.role'),
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
              },
            ].map((story, index) => (
              <motion.div
                key={story.author}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0">
                  <Image
                    src={story.image}
                    alt={story.author}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                </div>
                <div className="relative p-8">
                  <p className="text-xl text-white mb-6 italic">
                    "{story.quote}"
                  </p>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {story.author}
                    </p>
                    <p className="text-blue-400">{story.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?auto=format&fit=crop&w=2400&q=100"
            alt="Global Connections"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  {t('cta.travel')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200"
                >
                  {t('cta.send')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
