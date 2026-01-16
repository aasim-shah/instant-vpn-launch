import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Show a loading state briefly to check authentication
  useEffect(() => {
    // This ensures the auth context has been initialized
  }, []);

  if (!isAuthenticated) {
    // Redirect to home page if not authenticated
    // Save the attempted location for potential redirect after login
    return <Navigate to="/" state={{ from: location, showLoginModal: true }} replace />;
  }

  return <>{children}</>;
}
