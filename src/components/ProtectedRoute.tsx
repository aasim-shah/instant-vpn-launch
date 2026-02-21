import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to home page if not authenticated
    // Save the attempted location for potential redirect after login
    return <Navigate to="/" state={{ from: location, showLoginModal: true }} replace />;
  }

  return <>{children}</>;
}
