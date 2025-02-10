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

// Get Button Text from Step
export const getButtonText = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return 'Continue to Transport Details';
    case 2:
      return 'Continue to Communication';
    case 3:
      return 'Continue to Pricing';
    case 4:
      return 'Continue to Review';
    case 5:
      return 'Submit Offer';
    default:
      return 'Continue';
  }
};
