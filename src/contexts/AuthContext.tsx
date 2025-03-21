'use client';

import { toast } from 'react-toastify';

import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { USER_LOGGED_IN } from '@/app/signup/redux/authActions';
import { persistor } from '@/store/store';
import { clearChatState } from '@/app/chat/redux/chatsSlice';

export type UserRole = 'Sender' | 'Traveler' | 'Admin';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  activeRole: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const MOCK_USERS = {
  'admin@example.com': {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    roles: ['admin', 'sender', 'traveler'] as UserRole[],
    activeRole: 'admin' as UserRole,
  },
  'test.sender@example.com': {
    id: 'sender1',
    name: 'Test Sender',
    email: 'test.sender@example.com',
    password: 'test123',
    roles: ['sender'] as UserRole[],
    activeRole: 'sender' as UserRole,
  },
  'test.traveler@example.com': {
    id: 'traveler1',
    name: 'Test Traveler',
    email: 'test.traveler@example.com',
    password: 'test123',
    roles: ['traveler'] as UserRole[],
    activeRole: 'traveler' as UserRole,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const dispatch = useDispatch();
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
        {
          email,
          password,
        },
      );

      const { data } = response;
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      toast.success('Login successful! Welcome back.');
      dispatch({ type: USER_LOGGED_IN });
    } catch (err) {
      toast.error('Login failed. Please try again.');
      throw new Error('Login failed. Please try again.');
    }
  };

  const logout = async () => {
    setUser(null);
    dispatch(clearChatState());
    persistor.purge();
    localStorage.removeItem('user');

    router.push('/');
    toast.success('Logout successful!');
  };

  const register = async (
    email: string,
    password: string,
    role: UserRole,
    fullName: string,
    phoneNumber: string,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}users`,
        {
          name: fullName,
          email,
          password,
          permissions: role,
          phone: phoneNumber,
        },
      );
      const { data } = response;
      toast.success('Registration successful! Welcome to our platform.');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      throw new Error('Registration failed. Please try again.');
    }
  };

  const switchRole = (role: UserRole) => {
    if (user && user.roles.includes(role)) {
      const updatedUser = { ...user, activeRole: role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, switchRole, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
