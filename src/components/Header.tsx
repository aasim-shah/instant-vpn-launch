import { useEffect, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Lazy load AuthModal - 663 lines of code only needed on button click
const AuthModal = lazy(() => import("@/components/AuthModal").then(m => ({ default: m.AuthModal })));

// Lazy load DropdownMenu + icons only needed when authenticated
const LazyProfileDropdown = lazy(() => import("@/components/ProfileDropdown"));

// Lazy import toast so sonner is not in the critical bundle
const showToast = (msg: string) => import("sonner").then(m => m.toast.success(msg));

const baseNavLinks = [
  { href: "#features", label: "Features", type: "hash" },
  { href: "#how-it-works", label: "How It Works", type: "hash" },
  { href: "#pricing", label: "Pricing", type: "hash" },
  { href: "/platform", label: "Platform", type: "route" },
  { href: "/content", label: "Resources", type: "route" },
  { href: "/community", label: "Community", type: "route" },
  { href: "/about", label: "About", type: "route" },
  { href: "/contact", label: "Contact", type: "route" },
];

const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, navigate: any, isHomePage: boolean) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const id = href.substring(1);
    
    if (!isHomePage) {
      // If not on home page, navigate to home first with hash
      navigate('/' + href);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100; // Account for fixed header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Handle scrolling to hash on page load or hash change
  useEffect(() => {
    if (location.hash && isHomePage) {
      // Wait for page to render
      setTimeout(() => {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100; // Account for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash, isHomePage]);

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkTheme(isDark);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Add Infrastructure link only if authenticated
  const navLinks = isAuthenticated
    ? [
        ...baseNavLinks.slice(0, 3),
        { href: "/infrastructure", label: "Infrastructure", type: "route" },
        ...baseNavLinks.slice(3),
      ]
    : baseNavLinks;

  const handleAuthSuccess = () => {
    showToast("Welcome! You're now signed in.");
  };

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <nav className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-24 h-24 flex justify-center items-center">
                <img 
                  src={isDarkTheme ? "/white.png" : "/black.png"} 
                  className="w-full h-full" 
                  alt="FyreWay Logo"
                  width="96"
                  height="96"
                  loading="eager"
                /> 
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                if (link.type === "route") {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1.5"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleHashNavigation(e, link.href, navigate, isHomePage)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              {isAuthenticated && user ? (
                <Suspense fallback={<Button variant="outline" size="sm" className="gap-2">Profile</Button>}>
                  <LazyProfileDropdown user={user} onLogout={handleLogout} />
                </Suspense>
              ) : (
                <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
                 Get In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="border-t border-border py-4 md:hidden">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  if (link.type === "route") {
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1.5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleHashNavigation(e, link.href, navigate, isHomePage);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  );
                })}
                <div className="flex flex-col gap-2 pt-4">
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs">{user.email}</p>
                      </div>
                     
                      <Button 
                        variant="destructive" 
                        className="justify-start" 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="justify-start" 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal - lazy loaded */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
          />
        </Suspense>
      )}
    </>
  );
}
