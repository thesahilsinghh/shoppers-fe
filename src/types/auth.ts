export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    phone_number?: string;
    address?: string;
    role?:string;
  }
  
  export interface VerifyOTPData {
    email: string;
    otp: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    userId?: string;
    accessToken?: string;
    user?: any;
  }