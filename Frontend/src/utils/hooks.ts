import { useEffect, useState, useRef, useCallback } from 'react';

// Mobile device detection hook
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // ensures correct sync on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};



export const useScrollTo = (
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const scrollToTarget = useCallback(() => {
    targetRef.current?.scrollIntoView(options);
  }, [options]);

  return { targetRef, scrollToTarget };
};