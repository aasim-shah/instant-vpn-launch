import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Inline lightweight auth helpers — avoids importing authService → api → axios (~30KB)
const authHelpers = {
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
  getCurrentUser: () => {
    const s = localStorage.getItem('user');
    return s ? JSON.parse(s) : null;
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const authenticated = authHelpers.isAuthenticated();
    console.log("AuthProvider: Checking authentication on mount, authenticated:", authenticated);
    setIsAuthenticated(authenticated);
    if (authenticated) {
      const currentUser = authHelpers.getCurrentUser();
      console.log("AuthProvider: Current user from storage:", currentUser);
      setUser(currentUser);
    }
  }, []);

  const login = (userData: User, token: string) => {
    console.log("AuthProvider: login called with userData:", userData, "and token:", token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    console.log("AuthProvider: User logged in, isAuthenticated:", true);
  };

  const logout = () => {
    console.log("AuthProvider: logout called");
    authHelpers.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
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
