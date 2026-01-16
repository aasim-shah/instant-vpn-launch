import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authService, RegisterData, LoginData } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, Mail, User, Phone, Globe, MapPin, Shield, Lock, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTab?: "signup" | "login";
}

export function AuthModal({ isOpen, onClose, onSuccess, defaultTab = "login" }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login">(defaultTab);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showUnverifiedDialog, setShowUnverifiedDialog] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resendingVerification, setResendingVerification] = useState(false);
  const { login: loginContext } = useAuth();

  // Signup form state
  const [signupData, setSignupData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    location: "",
  });

  // Login form state
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(signupData);
      console.log("Registration response:", response);

      if (response.success) {
        // Show verification dialog instead of logging in directly
        setRegisteredEmail(signupData.email);
        setShowVerificationDialog(true);
        
        toast.success("Account created successfully! Please verify your email.");
        
        // Reset form
        setSignupData({
          name: "",
          email: "",
          password: "",
          phone: "",
          website: "",
          location: "",
        });
      } else {
        // Handle error response from API
        const errorMessage = response.error || response.message || "Registration failed. Please try again.";
        
        // Handle specific errors
        if (errorMessage.includes("duplicate key") || errorMessage.includes("E11000")) {
          if (errorMessage.includes("email")) {
            toast.error("This email is already registered. Please use a different email or try logging in.");
          } else if (errorMessage.includes("website")) {
            toast.error("This website is already registered. Please use a different website URL.");
          } else {
            toast.error("An account with this information already exists. Please check your details.");
          }
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      console.error("Registration error:", error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        const errorMessage = errorData.error || errorData.message || "Registration failed. Please try again.";
        
        // Handle specific errors
        if (errorMessage.includes("duplicate key") || errorMessage.includes("E11000")) {
          if (errorMessage.includes("email")) {
            toast.error("This email is already registered. Please use a different email or try logging in.");
          } else if (errorMessage.includes("website")) {
            toast.error("This website is already registered. Please use a different website URL or leave it empty.");
          } else {
            toast.error("An account with this information already exists. Please check your details.");
          }
        } else {
          toast.error(errorMessage);
        }
      } else if (error.request) {
        toast.error("Unable to connect to the server. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(loginData);
      console.log("Login response:", response);

      if (response.success) {
        // Handle success response
        const user = response.body?.user || response.data?.user;
        const token = response.body?.accessToken || response.body?.token || response.data?.accessToken || response.data?.token;
        const message = response.body?.message || response.message;
        
        if (user) {
          // Check if email is verified using isEmailVerified field
          if (user.isEmailVerified === false) {
            console.log("Email not verified, showing dialog");
            setRegisteredEmail(user.email);
            setShowUnverifiedDialog(true);
            setIsLoading(false);
            
            // Show the message from API if available
            if (message && message.includes("verification email has been sent")) {
              toast.info("A new verification email has been sent to your inbox.");
            } else {
              toast.error("Please verify your email address before logging in.");
            }
            return;
          }

          // Email is verified, proceed with login
          if (token) {
            // Update auth context with user data
            loginContext({
              id: user._id || '',
              name: user.name,
              email: user.email,
              phone: user.phone?.toString(),
              location: user.location,
            }, token);
            
            toast.success(`Welcome back, ${user.name}! 👋`);
            
            // Reset form
            setLoginData({
              email: "",
              password: "",
            });

            // Close modal and notify success
            onClose();
            onSuccess?.();
          } else {
            toast.error("Login failed. No authentication token received.");
          }
        } else {
          toast.success(response.message || "Logged in successfully!");
          onClose();
          onSuccess?.();
        }
      } else {
        // Handle error response from API
        const errorMessage = response.error || response.message || "Login failed. Please try again.";
        
        // Handle specific errors
        if (errorMessage.includes("not found") || errorMessage.includes("does not exist")) {
          toast.error("Email not found. Please check your email or create a new account.");
        } else if (errorMessage.includes("not verified") || errorMessage.includes("verification")) {
          // Extract email if possible
          const user = response.body?.user;
          if (user?.email) {
            setRegisteredEmail(user.email);
            setShowUnverifiedDialog(true);
          }
          toast.error("Please verify your email address before logging in.");
        } else if (errorMessage.includes("invalid") || errorMessage.includes("incorrect") || errorMessage.includes("password")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      console.error("Login error:", error);
      
      if (error.response?.data) {
        const errorData = error.response.data;
        const errorMessage = errorData.error || errorData.message || "Login failed. Please try again.";
        const user = errorData.body?.user;
        
        if (errorMessage.includes("not found") || errorMessage.includes("does not exist")) {
          toast.error("Email not found. Please check your email or create a new account.");
        } else if (errorMessage.includes("not verified") || errorMessage.includes("verification")) {
          if (user?.email) {
            setRegisteredEmail(user.email);
            setShowUnverifiedDialog(true);
          }
          toast.error("Please verify your email address before logging in.");
        } else if (errorMessage.includes("invalid") || errorMessage.includes("incorrect") || errorMessage.includes("password")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(errorMessage);
        }
      } else if (error.request) {
        toast.error("Unable to connect to the server. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!registeredEmail) {
      toast.error("No email address available");
      return;
    }

    setResendingVerification(true);
    try {
      const response = await authService.resendVerification(registeredEmail);
      
      if (response.success) {
        toast.success("Verification email sent! Please check your inbox.");
      } else {
        toast.error(response.message || "Failed to resend verification email");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to resend verification email";
      toast.error(errorMessage);
    } finally {
      setResendingVerification(false);
    }
  };

  const handleVerificationDialogClose = () => {
    setShowVerificationDialog(false);
    setRegisteredEmail("");
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] h-[80vh] p-0 overflow-y-scroll">
          <div className="relative">
            {/* Header with gradient background */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background px-6 pt-8 pb-6">
              <div className="absolute inset-0 hero-grid opacity-50" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold">
                    Welcome to <span className="gradient-text">VPN Service</span>
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Sign in to your account or create a new one
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="px-6 py-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signup" | "login")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4 mt-0">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="john@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-primary" />
                        Password <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          disabled={isLoading}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-muted-foreground">Remember me</span>
                      </label>
                      <a href="#" className="text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div> */}

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("signup")}
                      className="text-primary hover:underline font-medium"
                    >
                      Create one now
                    </button>
                  </p>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup" className="space-y-4 mt-0">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-primary" />
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="john@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-primary" />
                        Password <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          disabled={isLoading}
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          disabled={isLoading}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be at least 6 characters long
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        Phone Number <span className="text-xs text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        Website <span className="text-xs text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        value={signupData.website}
                        onChange={(e) => setSignupData({ ...signupData, website: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        Location <span className="text-xs text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="New York, USA"
                        value={signupData.location}
                        onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Verification Dialog - For Registration */}
      <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Check Your Email
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4">
              <div className="space-y-2">
                <p>
                  We've sent a verification link to:
                </p>
                <p className="font-semibold text-foreground">{registeredEmail}</p>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-left">Click the verification link in your email to activate your account</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-left">After verification, you'll be able to sign in and access all features</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Can't find the email? Check your spam folder or use the resend option on the verification page.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleVerificationDialogClose} className="w-full">
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unverified Email Dialog - For Login Attempts */}
      <AlertDialog open={showUnverifiedDialog} onOpenChange={setShowUnverifiedDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950">
              <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Email Not Verified
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4">
              <div className="space-y-2">
                <p>
                  Your email address has not been verified yet:
                </p>
                <p className="font-semibold text-foreground">{registeredEmail}</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg text-sm space-y-3">
                <p className="text-orange-800 dark:text-orange-200 text-left">
                  Please check your email inbox for the verification link. You need to verify your email before you can sign in.
                </p>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-left text-muted-foreground text-xs">
                    Check your spam/junk folder if you don't see the email
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the email?
                </p>
                <Button
                  onClick={handleResendVerification}
                  disabled={resendingVerification}
                  variant="outline"
                  className="w-full"
                >
                  {resendingVerification ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowUnverifiedDialog(false);
              setRegisteredEmail("");
            }}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
