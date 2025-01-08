export interface BaseFormProps {
  formData: TravelerFormData;
  onUpdateFormData: (update: Partial<TravelerFormData>) => void;
}

export interface ReviewFormProps extends BaseFormProps {
  onSubmit: () => void;
}

export interface PricingData {
  baseRate: number;
  perKgRate: number;
  urgentDeliveryRate: number;
  specialHandlingRate: number;
}

export interface LocationData {
  city: string;
  country: string;
}

export interface TravelDates {
  isRecurring?: boolean;
  recurringPattern?: string;
  specificDate?: string;
  transportNumber?: string;
}

export interface TransportCapacity {
  maxWeight: string;
  acceptedSizes?: string[];
  transportType?: string;
  vehicleDetails?: string;
}

export interface HandlingPreferences {
  acceptsShippedPackages: boolean;
  willPickup: boolean;
  meetAtAirport: boolean;
  willDeliver: boolean;
  specialInstructions?: string;
}

export interface PackagePreferences {
  acceptedItems: string[];
  flexibilityLevel: 'all' | 'selective' | 'basic';
}

export interface TravelerFormData {
  origin?: LocationData;
  destination?: LocationData;
  travelDates?: TravelDates;
  transportCapacity?: TransportCapacity;
  packagePreferences?: PackagePreferences;
  handlingPreferences?: HandlingPreferences;
  pricing?: {
    baseRate: number;
    perKgRate: number;
    urgentDeliveryRate: number;
    specialHandlingRate: number;
  };
}