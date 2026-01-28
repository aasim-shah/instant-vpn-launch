import { useEffect, useState } from "react";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Platform Overview", href: "/platform" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Content Hub", href: "/content" },
  ],
  // Community: [
  //   { label: "Discord", href: "/community/discord" },
  //   { label: "Our Team", href: "/community/team" },
  //   { label: "Partners", href: "/partners" },
  // ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "#faq" },
  ],
};

const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, navigate: any, isHomePage: boolean) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const id = href.substring(1);
    
    if (!isHomePage) {
      // If not on home page, navigate to home first with hash
      navigate('/' + href);
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};

export function Footer() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkTheme(isDark);

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

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2">
              <div className="w-20 h-20 flex justify-center items-center">
                <img 
                  src={isDarkTheme ? "/white.png" : "/black.png"} 
                  className="w-full h-full" 
                  alt="FyreWay Logo" 
                /> 
              </div>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The fastest way to launch production-ready VPN infrastructure for mobile 
              apps and SaaS products.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="mailto:info@fyreway.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
                title="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleHashNavigation(e, link.href, navigate, isHomePage)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fyreway. All rights reserved.
          </p>
          {/* <p className="text-sm text-muted-foreground">
            Built with ❤️
          </p> */}
        </div>
      </div>
    </footer>
  );
}
