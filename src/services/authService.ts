import { api } from '@/lib/api';

const RBAC_API_URL = `${import.meta.env.VITE_RBAC_API_URL}` || 'https://rbac-api.fyreway.com/api/v1';;


export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  website?: string;
  location?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string | number;
  location?: string;
  profile?: string | null;
  roleCollection?: string | null;
  organization?: {
    _id: string;
    name: string;
    email: string;
  };
  applications?: Array<{
    _id: string;
    name: string;
    accessKey: string | null;
    status: string;
  }>;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string | null;
  body?: {
    token?: string;
    accessToken?: string;
    customer?: {
      id?: string;
      _id?: string;
      name: string;
      email: string;
      phone?: string | number;
      website?: string;
      location?: string;
    };
    user?: User;
  };
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string | null;
  body?: {
    token?: string;
    accessToken?: string;
    user?: User;
  };
  data?: {
    token?: string;
    accessToken?: string;
    user?: User;
  };
}

export const authService = {
  // Register new customer
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      `${RBAC_API_URL}/api/v1/website/register-customer`,
      data
    );
    
    // Just return the response, let the caller handle token storage
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      `${RBAC_API_URL}/api/v1/auth/login`,
      data
    );
    
    const responseData = response.data;
    
    // Store token if login successful
    if (responseData.success) {
      // Handle different response structures
      const token = responseData.body?.accessToken || responseData.body?.token || responseData.data?.accessToken || responseData.data?.token;
      const user = responseData.body?.user || responseData.data?.user;
      
      if (token && user) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone?.toString(),
          location: user.location,
        }));
      }
    }
    
    return responseData;
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
