import React, { createContext, useContext,useEffect,useState } from 'react';
import type {ReactNode} from 'react';
import axios from 'axios';
import type { RegisterData, VerifyOTPData, LoginData, AuthResponse } from '../types/auth';

interface AuthContextType {
  user: any;
  loading: boolean;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  verifyOTP: (otpData: VerifyOTPData) => Promise<AuthResponse>;
  login: (loginData: LoginData) => Promise<AuthResponse>;
  resendOTP: (email: string) => Promise<AuthResponse>;
  logout: () => void;
    isAuthenticated:boolean;
  checkAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3000';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otpData: VerifyOTPData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', otpData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', loginData);
      const { user, accessToken } = response.data;
      setUser(user);
      await checkAuth();
      localStorage.setItem('accessToken', accessToken);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get('/auth/profile');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      console.log('Not authenticated:', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  
  const logout = async (): Promise<void> => {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.log('Logout API call failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      console.log('✅ User logged out locally');
    }
  };
  
  const refreshUser = async (): Promise<void> => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data);
      console.log('✅ User data refreshed');
    } catch (error) {
      console.error('❌ Failed to refresh user data:', error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    verifyOTP,
    login,
    resendOTP,
    logout,
    checkAuth,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};