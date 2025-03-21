export const steps = [
  {
    icon: '📍',
    title: 'What is your travel route?',
  },
  {
    icon: '✈️',
    title: 'Transport Details',
  },
  {
    icon: '💬',
    title: 'Communication',
  },
  {
    icon: '💷',
    title: 'Pricing',
  },
  {
    icon: '✓',
    title: 'Review your offer',
  },
];

export const getButtonText = (
  currentStep: number,
  t: (key: string) => string,
) => {
  switch (currentStep) {
    case 1:
      return t('buttons.continueToTransport');
    case 2:
      return t('buttons.continueToCommunication');
    case 3:
      return t('buttons.continueToPricing');
    case 4:
      return t('buttons.continueToReview');
    case 5:
      return t('buttons.submitOffer');
    default:
      return t('buttons.continue');
  }
};
