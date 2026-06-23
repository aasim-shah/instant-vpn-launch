import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, ShieldAlert, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const helpfulLinks = [
  { label: "Pricing", to: "/#pricing" },
  { label: "Platform", to: "/platform" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* Icon badge */}
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
          <ShieldAlert className="h-8 w-8" aria-hidden />
        </div>

        {/* Headline */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>
        <p className="bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold leading-none text-transparent sm:text-5xl">
          Page not found
        </p>
        <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on a secure path.
        </p>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" aria-hidden />
              Return home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Go back
          </Button>
        </div>

        {/* Helpful links */}
        <div className="mt-12 w-full border-t border-border pt-8">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" aria-hidden />
            Or try one of these popular pages
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {helpfulLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
