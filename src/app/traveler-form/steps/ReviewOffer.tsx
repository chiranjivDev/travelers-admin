'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
const ReviewOffer = ({ formData }) => {
  const t = useTranslations('travellerForm.steps.step5');
  const getHandlingOptionsString = (preferences?: any) => {
    if (!preferences) return 'Not specified';
    const options = [
      preferences.secureHandling && t('offerSecureHandling'),
      preferences.expressDelivery && t('offerExpressDelivery'),
      preferences?.preferences === 'basicItemsOnly'
        ? t('acceptBasicItemsOnly')
        : t('acceptAllItems'),
    ].filter(Boolean);

    return options.length > 0 ? options.join(', ') : 'None selected';
  };

  return (
    <div className="bg-[#0f172a] min-h-screen">
      <div className="px-6 py-12">
        <h3 className="text-3xl font-bold mb-12 flex items-center text-white">
          <span className="mr-4 text-4xl filter drop-shadow-lg">✨</span>
          {/* Review Your Travel Offer */}
          {t('title')}
        </h3>

        <div className="space-y-8">
          <Section emoji="🗺️" title={t('tripDetails.title')}>
            <div
              className="bg-[#1e2643]/90 backdrop-blur-sm rounded-lg p-4 shadow-lg ring-1 ring-white/10
              transition-all duration-300
              hover:ring-2 hover:ring-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]
              hover:translate-y-[-2px]"
            >
              <ReviewItem
                label={t('tripDetails.from')}
                value={`${formData.departure.city}, ${formData.departure.country}`}
              />
              <ReviewItem
                label={t('tripDetails.to')}
                value={`${formData.arrival.city}, ${formData.arrival.country}`}
              />

              <ReviewItem
                label={t('tripDetails.travelDate')}
                value={`${formData.departure.date}, ${formData.arrival.date}`}
              />
            </div>
          </Section>

          <Section emoji="🚚" title={t('transportDetails')}>
            <div
              className="bg-[#1e2643]/90 backdrop-blur-sm rounded-lg p-4 shadow-lg ring-1 ring-white/10
              transition-all duration-300
              hover:ring-2 hover:ring-emerald-400/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]
              hover:translate-y-[-2px]"
            >
              <ReviewItem
                label={t('maximumWeight')}
                value={formData.packagePreferences.maxWeight}
              />
            </div>
          </Section>

          <Section emoji="📦" title={t('packageHandling')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-[#1e2756]/90 backdrop-blur-sm rounded-lg p-6 shadow-lg ring-1 ring-blue-500/20
                  transition-all duration-300 cursor-pointer
                  hover:ring-2 hover:ring-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
                  hover:translate-y-[-2px]"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className="p-2 rounded-full bg-blue-500/20 backdrop-blur-xl shadow-inner
                      transition-all duration-300 group-hover:bg-blue-500/30"
                  >
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h5 className="text-lg font-semibold text-white">
                    {/* Collection Options */}
                    {t('collectionOptions')}
                  </h5>
                </div>
                <div className="space-y-3">
                  {getHandlingOptionsString(formData.packagePreferences)
                    .split(', ')
                    .map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400 shadow-glow-blue" />
                        <span className="font-medium text-gray-200">
                          {option}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </Section>

          <Section emoji="💰" title={t('pricing')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: t('baseRate'),
                  value: formData.pricing.baseRate,
                  description: t('standardDeliveryFee'),
                  bgColor: 'bg-[#1e3a3a]',
                  ringColor: 'ring-emerald-500/20',
                  hoverRing: 'hover:ring-emerald-400/50',
                  hoverShadow: 'hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]',
                  iconBg: 'bg-emerald-500/20',
                  textColor: 'text-emerald-400',
                  icon: '💵',
                },
                {
                  title: t('perKgRate'),
                  value: formData.pricing.ratePerKg,
                  description: t('perKgRateDescription'),
                  bgColor: 'bg-[#1e2756]',
                  ringColor: 'ring-blue-500/20',
                  hoverRing: 'hover:ring-blue-400/50',
                  hoverShadow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]',
                  iconBg: 'bg-blue-500/20',
                  textColor: 'text-blue-400',
                  icon: '⚖️',
                },
                {
                  title: t('urgentDelivery'),
                  value: (formData.pricing.baseRate * 0.2).toFixed(2),
                  description: t('urgentDeliveryDescription'),
                  bgColor: 'bg-[#2a1f56]',
                  ringColor: 'ring-purple-500/20',
                  hoverRing: 'hover:ring-purple-400/50',
                  hoverShadow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]',
                  iconBg: 'bg-purple-500/20',
                  textColor: 'text-purple-400',
                  icon: '⚡',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    relative overflow-hidden rounded-xl ${item.bgColor}/90 backdrop-blur-sm
                    shadow-lg ring-1 ${item.ringColor}
                    transition-all duration-300 cursor-pointer
                    hover:ring-2 ${item.hoverRing} ${item.hoverShadow}
                    hover:translate-y-[-2px]
                  `}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div
                          className={`p-2 rounded-full ${item.iconBg} backdrop-blur-xl shadow-inner
                            transition-all duration-300 group-hover:bg-opacity-40`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <h6 className="text-lg font-semibold text-white">
                          {item.title}
                        </h6>
                        <p className="text-sm text-gray-300">
                          {item.description}
                        </p>
                      </div>
                      <div className={`text-2xl font-bold ${item.textColor}`}>
                        ${item.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};
export default ReviewOffer;
interface ReviewItemProps {
  label: string;
  value: string;
}

const ReviewItem = ({ label, value }: ReviewItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="py-4 border-b border-gray-700/20 last:border-b-0"
  >
    <dt className="text-sm font-semibold text-gray-400">{label}</dt>
    <dd className="mt-1 text-base font-medium text-gray-200">
      {value || 'Not specified'}
    </dd>
  </motion.div>
);
interface SectionProps {
  emoji: string;
  title: string;
  children: React.ReactNode;
}

const Section = ({ emoji, title, children }: SectionProps) => (
  <div
    className="bg-[#1a1f35]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg ring-1 ring-white/10
    transition-all duration-300
    hover:ring-2 hover:ring-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
    hover:translate-y-[-2px]"
  >
    <div className="flex items-center space-x-3 mb-6">
      <span
        className="text-2xl filter drop-shadow-lg"
        role="img"
        aria-label={title}
      >
        {emoji}
      </span>
      <h4 className="text-xl font-bold text-white">{title}</h4>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);
