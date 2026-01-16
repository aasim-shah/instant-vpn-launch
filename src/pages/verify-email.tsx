import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';

interface VerifyResponse {
  success: boolean;
  message?: string;
  error?: string | null;
}

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          setError('No verification token provided');
          setLoading(false);
          return;
        }

        const RBAC_API_URL = `${import.meta.env.VITE_RBAC_API_URL}` || 'https://rbac-api.fyreway.com/api/v1';

        const response = await api.post<VerifyResponse>(
          `${RBAC_API_URL}/api/v1/auth/verify-email`,
          { token }
        );

        if (response.data.success) {
          setSuccess(true);
          setLoading(false);
          toast.success('Email verified successfully!');
          // Redirect to homepage after 3 seconds
          setTimeout(() => {
            navigate('/', { state: { showLoginModal: true } });
          }, 3000);
        } else {
          setError(response.data.message || 'Email verification failed');
          setLoading(false);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Email verification failed. Please try again.';
        setError(errorMessage);
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setResending(true);
    try {
      const response = await authService.resendVerification(email);
      
      if (response.success) {
        toast.success('Verification email sent! Please check your inbox.');
        setEmail('');
      } else {
        toast.error(response.message || 'Failed to resend verification email');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to resend verification email';
      toast.error(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              {loading && (
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              )}
              {success && (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              )}
              {error && !loading && !success && (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {loading && 'Verifying Email'}
              {success && 'Email Verified!'}
              {error && !loading && !success && 'Verification Failed'}
            </CardTitle>
            <CardDescription>
              {loading && 'Please wait while we verify your email address...'}
              {success && 'Your email has been successfully verified. You can now sign in.'}
              {error && !loading && !success && 'We encountered an issue verifying your email.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {loading && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">Processing your verification...</p>
              </div>
            )}

            {success && (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200 text-center">
                    🎉 Your account is now active! Redirecting you to sign in...
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/', { state: { showLoginModal: true } })} 
                  className="w-full"
                >
                  Go to Sign In
                </Button>
              </div>
            )}

            {error && !loading && !success && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>

                {/* Resend Email Section */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Need a new verification link?</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={resending}
                    />
                    <Button 
                      onClick={handleResendEmail}
                      disabled={resending}
                      variant="secondary"
                      className="shrink-0"
                    >
                      {resending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Resend
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
