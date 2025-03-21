  'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
  interface DeliveryMethodProps {
  type: 'pickup' | 'delivery';
  value: any;
  onChange: (method: any) => void;
  className?: string;
}

interface LocationDetails {
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

interface PreferredTimes {
  morning?: boolean;
  afternoon?: boolean;
  evening?: boolean;
  specific?: string;
  flexibleDays?: boolean;
  preferredDays?: string[];
}

interface CommunicationPreferences {
  whatsapp?: boolean;
  phone?: boolean;
  email?: boolean;
  inApp?: boolean;
  preferredNumber?: string;
  preferredEmail?: string;
  languagePreference?: string;
}

export interface DeliveryOffer {
  defaultLocation: LocationDetails;
  allowPostalDelivery: boolean;
  preferredTimes: PreferredTimes;
  flexibleLocation: boolean;
  communicationPreferences: CommunicationPreferences;
  notes: string;
  packageHandling?: {
    requiresCarefulHandling: boolean;
    isFragile: boolean;
    specialInstructions?: string;
  };
}
  ${fs.readFileSync('/Users/khosroheidari/Desktop/delivery-package/src/components/DeliveryMethod.tsx', 'utf8')}
