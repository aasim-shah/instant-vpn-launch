import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  /** How far before the section enters the viewport to start rendering (px) */
  rootMargin?: string;
  /** Minimum height placeholder to prevent CLS */
  minHeight?: string;
}

/**
 * Defers rendering of children until the section is near the viewport.
 * Unlike React.lazy(), this does NOT create separate JS chunks —
 * it simply delays React rendering work to reduce TBT and Speed Index.
 */
export function LazySection({ 
  children, 
  className = "", 
  rootMargin = "200px",
  minHeight = "100px"
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver not supported, render immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div style={{ minHeight }} />}
    </div>
  );
}
