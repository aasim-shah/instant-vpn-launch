import { useEffect, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Menu } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

// Lazy load AuthModal - 663 lines of code only needed on button click
const AuthModal = lazy(() => import("@/components/AuthModal").then(m => ({ default: m.AuthModal })));

// Lazy load DropdownMenu + icons only needed when authenticated
const LazyProfileDropdown = lazy(() => import("@/components/ProfileDropdown"));

// Lazy import toast so sonner is not in the critical bundle
const showToast = (msg: string) => import("sonner").then(m => m.toast.success(msg));

const baseNavLinks = [
  // { href: "#features", label: "Features", type: "hash" },
  // { href: "#how-it-works", label: "How It Works", type: "hash" },
  { href: "/platform", label: "Platform", type: "route" },
  { href: "#pricing", label: "Pricing", type: "hash" },
  // { href: "/content", label: "Resources", type: "route" },
  { href: "/community", label: "Community", type: "route" },
  { href: "/about", label: "About", type: "route" },
  { href: "/sdk/docs", label: "SDK", type: "route" },
  // { href: "/contact", label: "Contact", type: "route" },
];

const handleHashNavigation = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  navigate: NavigateFunction,
  isHomePage: boolean,
) => {
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

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
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 lg:px-6 xl:px-8">
          <nav className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem] lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center" aria-label="FyreWay home">
              <div className="flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <img 
                  src={isDarkTheme ? "/white.png" : "/black.png"} 
                  className="h-full w-full object-contain"
                  alt="FyreWay Logo"
                  width="96"
                  height="96"
                  loading="eager"
                /> 
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-2">
              {navLinks.map((link) => {
                const isActive = link.type === "route"
                  ? location.pathname === link.href || location.pathname.startsWith(`${link.href}/`)
                  : isHomePage && location.hash === link.href;

                if (link.type === "route") {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
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
                    className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground xl:px-3"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <ThemeToggle />
              {isAuthenticated && user ? (
                <Suspense fallback={<Button variant="outline" size="sm" className="gap-2">Profile</Button>}>
                  <LazyProfileDropdown user={user} onLogout={handleLogout} />
                </Suspense>
              ) : (
                <Button size="sm" className="shadow-sm" onClick={() => setIsAuthModalOpen(true)}>
                  Get Started
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile and tablet navigation */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent
          side="right"
          className="flex h-dvh w-[min(88vw,380px)] flex-col gap-0 overflow-hidden border-l bg-background/95 p-0 backdrop-blur-xl lg:hidden"
        >
          <SheetHeader className="border-b border-border/70 px-5 pb-4 pt-5 text-left">
            <Link
              to="/"
              className="flex w-fit items-center"
              onClick={() => setIsMenuOpen(false)}
              aria-label="FyreWay home"
            >
              <img
                src={isDarkTheme ? "/white.png" : "/black.png"}
                className="h-14 w-14 object-contain"
                alt="FyreWay Logo"
                width="96"
                height="96"
              />
            </Link>
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through FyreWay pages and account actions.
            </SheetDescription>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.type === "route"
                  ? location.pathname === link.href || location.pathname.startsWith(`${link.href}/`)
                  : isHomePage && location.hash === link.href;
                const linkClassName = `flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`;

                if (link.type === "route") {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={linkClassName}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-50" />
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
                    className={linkClassName}
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-border/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="min-w-0 rounded-xl bg-secondary/70 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  variant="destructive"
                  className="h-11 w-full"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="h-11 w-full"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

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
