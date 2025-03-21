'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

export interface TripDetails {
  id: string;
  traveler: string;
  route: {
    from: string;
    to: string;
    stops?: string[];
  };
  dates: {
    departure: string;
    arrival: string;
    flexibility: number;
  };
  preferences: {
    maxWeight: number;
    maxSize: string;
    acceptedTypes: string[];
    restrictions: string[];
  };
  capacity: {
    available: number;
    taken: number;
  };
  pricing: {
    base: number;
    perKg: number;
    insurance: number;
    express: number;
  };
  stats: {
    completedDeliveries: number;
    rating: number;
    reviewCount: number;
  };
  pricingStructure?: {
    base: number;
    insurance: number;
    priority: number;
    tracking: number;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'sender' | 'traveler';
  avatar: string;
  status: 'online' | 'offline' | 'away';
  isTyping: boolean;
  lastSeen: Date;
  rating?: number;
  deliveryCount?: number;
  successRate?: number;
  preferredRoutes?: string[];
  languages?: string[];
  verificationLevel?: 'basic' | 'verified' | 'premium';
  activeTrip?: TripDetails;
  badges?: {
    id: string;
    name: string;
    icon: string;
    description: string;
  }[];
}

export interface Package {
  id: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered';
  weight: number;
  dimensions: string;
  description: string;
  category?: string;
  insurance?: boolean;
  priority?: boolean;
  tracking?: boolean;
  specialInstructions?: string;
  photos?: string[];
  history?: {
    timestamp: Date;
    status: string;
    location?: string;
    note?: string;
  }[];
  requirements?: {
    handling: string[];
    temperature?: {
      min: number;
      max: number;
    };
    fragile: boolean;
    hazardous: boolean;
  };
  negotiation?: {
    currentOffer?: {
      price: number;
      date: string;
      services: string[];
      note?: string;
    };
    history: {
      timestamp: Date;
      sender: string;
      offer: {
        price: number;
        date: string;
        services: string[];
        note?: string;
      };
    }[];
  };
}

export interface Message {
  id: string;
  senderId: string;
  type: 'text' | 'package' | 'location' | 'file' | 'offer' | 'trip';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  metadata?: any;
}
export const MOCK_TRIP: TripDetails = {
  id: 'trip-123',
  traveler: 'traveler-456',
  route: {
    from: 'Amsterdam',
    to: 'Paris',
    stops: ['Brussels'],
  },
  dates: {
    departure: '2024-12-24',
    arrival: '2024-12-25',
    flexibility: 2,
  },
  preferences: {
    maxWeight: 20,
    maxSize: '60x40x30 cm',
    acceptedTypes: ['electronics', 'clothing', 'documents', 'gifts'],
    restrictions: ['no food', 'no liquids'],
  },
  capacity: {
    available: 15,
    taken: 5,
  },
  pricing: {
    base: 30,
    perKg: 2,
    insurance: 5,
    express: 10,
  },
  stats: {
    completedDeliveries: 87,
    rating: 4.9,
    reviewCount: 45,
  },
};
export const MOCK_PACKAGE: Package = {
  id: 'pkg-789',
  origin: 'Amsterdam',
  destination: 'Paris',
  date: '2024-12-25',
  price: 50,
  status: 'pending',
  weight: 2.5,
  dimensions: '30x20x15 cm',
  description: 'Small gift package, handle with care',
  category: 'Gift',
  insurance: false,
  priority: false,
  tracking: false,
  specialInstructions: 'Please handle with extra care, contains fragile items',
  photos: [
    'https://example.com/package1.jpg',
    'https://example.com/package2.jpg',
  ],
  history: [
    {
      timestamp: new Date('2024-12-21T08:00:00'),
      status: 'created',
      note: 'Package registered in system',
    },
  ],
  requirements: {
    handling: ['keep upright', 'no stacking'],
    temperature: {
      min: 15,
      max: 25,
    },
    fragile: true,
    hazardous: false,
  },
  negotiation: {
    history: [],
  },
};
export const USERS = {
  SENDER: {
    id: 'sender-1',
    name: 'John (Sender)',
    role: 'sender',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'online',
    isTyping: false,
  } as User,
  TRAVELER: {
    id: 'traveler-1',
    name: 'Alice (Traveler)',
    role: 'traveler',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    status: 'online',
    isTyping: false,
    activeTrip: {
      id: 'trip-1',
      route: 'Amsterdam → Paris',
      date: '2024-12-25',
      capacity: '20kg',
      price: 40,
      pricingStructure: {
        base: 40,
        insurance: 5,
        priority: 10,
        tracking: 3,
      },
    },
  } as User,
};

interface SimpleChatContextType {
  messages: Message[];
  currentUser: User | null;
  otherUser: User | null;
  activePackage: Package | null;
  sendMessage: (
    content: string,
    type?: Message['type'],
    metadata?: any,
  ) => void;
  setUserTyping: (isTyping: boolean) => void;
  markMessageAsRead: (messageId: string) => void;
  updatePackageStatus: (status: Package['status']) => void;
  setCurrentUser: (user: User | null) => void;
  updatePackage: (updates: Partial<Package>) => void;
  updateTripDetails: (updates: Partial<TripDetails>) => void;
}

const SimpleChatContext = createContext<SimpleChatContextType | undefined>(
  undefined,
);

export function SimpleChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [activePackage, setActivePackage] = useState<Package | null>(
    MOCK_PACKAGE,
  );

  const getRoomId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join('-');
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('chat_room_')) {
        const roomMessages = JSON.parse(e.newValue || '[]');
        if (
          currentUser &&
          otherUser &&
          e.key === `chat_room_${getRoomId(currentUser.id, otherUser.id)}`
        ) {
          setMessages(roomMessages);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentUser, otherUser]);

  useEffect(() => {
    if (currentUser) {
      const newOtherUser =
        currentUser.role === 'sender' ? USERS.TRAVELER : USERS.SENDER;
      setOtherUser(newOtherUser);

      const roomId = getRoomId(currentUser.id, newOtherUser.id);
      const storedMessages = localStorage.getItem(`chat_room_${roomId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([]);
      }
    } else {
      setOtherUser(null);
      setMessages([]);
    }
  }, [currentUser]);

  const sendMessage = useCallback(
    (content: string, type: Message['type'] = 'text', metadata?: any) => {
      if (!currentUser || !otherUser) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        type,
        content,
        timestamp: new Date(),
        status: 'sent',
        metadata,
      };

      const roomId = getRoomId(currentUser.id, otherUser.id);

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, newMessage];
        localStorage.setItem(
          `chat_room_${roomId}`,
          JSON.stringify(newMessages),
        );
        return newMessages;
      });

      setOtherUser((prev) => (prev ? { ...prev, isTyping: true } : null));

      setTimeout(() => {
        setOtherUser((prev) => (prev ? { ...prev, isTyping: false } : null));
      }, 1000);

      setTimeout(() => {
        const deliveredMessage = { ...newMessage, status: 'delivered' };
        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === newMessage.id ? deliveredMessage : msg,
          );
          localStorage.setItem(`chat_room_${roomId}`, JSON.stringify(updated));
          return updated;
        });
      }, 500);

      setTimeout(() => {
        const readMessage = { ...newMessage, status: 'read' };
        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === newMessage.id ? readMessage : msg,
          );
          localStorage.setItem(`chat_room_${roomId}`, JSON.stringify(updated));
          return updated;
        });
      }, 1000);
    },
    [currentUser, otherUser],
  );

  const markMessageAsRead = useCallback(
    (messageId: string) => {
      if (!currentUser || !otherUser) return;

      const roomId = getRoomId(currentUser.id, otherUser.id);
      setMessages((prev) => {
        const updated = prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: 'read' } : msg,
        );
        localStorage.setItem(`chat_room_${roomId}`, JSON.stringify(updated));
        return updated;
      });
    },
    [currentUser, otherUser],
  );

  const setUserTyping = (isTyping: boolean) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, isTyping });
    }
  };

  const updatePackageStatus = (status: Package['status']) => {
    if (activePackage) {
      const updatedPackage = {
        ...activePackage,
        status,
        history: [
          ...(activePackage.history || []),
          {
            timestamp: new Date(),
            status,
            note: `Package status updated to ${status}`,
          },
        ],
      };
      setActivePackage(updatedPackage);
    }
  };

  const updatePackage = (updates: Partial<Package>) => {
    if (activePackage) {
      setActivePackage({ ...activePackage, ...updates });
    }
  };

  const updateTripDetails = (updates: Partial<TripDetails>) => {
    if (otherUser?.role === 'traveler' && otherUser.activeTrip) {
      setOtherUser({
        ...otherUser,
        activeTrip: { ...otherUser.activeTrip, ...updates },
      });
    }
  };

  return (
    <SimpleChatContext.Provider
      value={{
        messages,
        currentUser,
        otherUser,
        activePackage,
        sendMessage,
        setUserTyping,
        markMessageAsRead,
        updatePackageStatus,
        setCurrentUser,
        updatePackage,
        updateTripDetails,
      }}
    >
      {children}
    </SimpleChatContext.Provider>
  );
}

export function useSimpleChat() {
  const context = useContext(SimpleChatContext);
  if (!context) {
    throw new Error('useSimpleChat must be used within SimpleChatProvider');
  }
  return context;
}
