import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  useMutation,
  useLazyQuery,
} from "@apollo/client/react";
import type {
  RegisterData,
  VerifyOTPData,
  LoginData,
  AuthResponse,
} from "../types/auth";
import { Login_M, Logout_M, Register_M, ResendOtp_M, VerifyOtp_M } from "../grapghql/mutations/Login.mutation";
import { GetMe_Q } from "../grapghql/queries/user.queries";

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  const [registerMutation] = useMutation(Register_M);
  const [verifyOtpMutation] = useMutation(VerifyOtp_M);
  const [loginMutation] = useMutation(Login_M);
  const [logoutMutation] = useMutation(Logout_M);
  const [getMeQuery] = useLazyQuery(GetMe_Q);
  const [resendOtp] = useMutation(ResendOtp_M);

  const checkAuth = async (): Promise<void> => {
    try {
      const { data } = await getMeQuery();
      
      if (data?.me?.user) {
        const userData = data.me.user;
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const { data } = await registerMutation({ variables: { createUserInput: userData } });
      return data.register;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otpData: VerifyOTPData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const { data } = await verifyOtpMutation({ variables: { verifyOtpInput: otpData } });
      return data.verifyOtp;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const { data } = await loginMutation({ variables: { loginInput: loginData } });
      const { user: userData, token } = data.login;
      console.log("Login response:", data);
      setUser(userData);
      setIsAuthenticated(true);
      return data.login;
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      throw new Error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout mutation failed:", error);
    } finally {     
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const { data } = await getMeQuery();
      if (data?.me?.user) {
        const userData = data.me.user;
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  const resendOTP = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await resendOtp({ variables: { resendOtpInput: { email } } });
      console.log("OTP resend message:", data.resendOtp);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};