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

// Mock users database for testing
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

  useEffect(() => {
    // Check for stored auth token and validate it
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

  // const login = async (email: string, password: string) => {
  //   // Mock login for demonstration
  //   const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
  //   if (!mockUser || mockUser.password !== password) {
  //     throw new Error('Invalid credentials');
  //   }

  //   const { password: _, ...userWithoutPassword } = mockUser;
  //   setUser(userWithoutPassword);
  //   localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  // };

  // Temporary Implementation for login
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'https://delivery-package.onrender.com/auth/login',
        {
          email,
          password,
        }
      );

      console.log('response from UI, LOGIN', response);

      const { data } = response;
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      // Show success toast after successful login
      toast.success('Login successful! Welcome back.');
    } catch (err) {
      toast.error('Login failed. Please try again.');
      throw new Error('Login failed. Please try again.');
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout successful!');
  };

  // const register = async (email: string, password: string, role: UserRole) => {
  //   // Mock registration
  //   if (MOCK_USERS[email as keyof typeof MOCK_USERS]) {
  //     throw new Error('User already exists');
  //   }

  //   const newUser = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     name: email.split('@')[0],
  //     email,
  //     roles: [role],
  //     activeRole: role,
  //   };

  //   // In a real app, you would make an API call here
  //   setUser(newUser);
  //   localStorage.setItem('user', JSON.stringify(newUser));
  // };

  // Temporary Implementation for signup
  const register = async (
    email: string,
    password: string,
    role: UserRole,
    fullName: string,
    phoneNumber: string
  ) => {
    // const role: UserRole = 'Traveler';
    console.log('role ====>', role);
    try {
      const response = await axios.post(
        'https://delivery-package.onrender.com/users',
        {
          name: fullName,
          email,
          password,
          permissions: role,
          phone: phoneNumber,
        }
      );
      console.log('response from UI, SIGNUP', response);
      const { data } = response;
      // Show success toast after successful registration
      toast.success('Registration successful! Welcome to our platform.');
      // setUser(data);
      // localStorage.setItem('user', JSON.stringify(data));
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
