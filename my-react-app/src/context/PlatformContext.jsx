import React, { createContext, useContext, useState, useEffect } from 'react';

const PlatformContext = createContext();

export function detectMobileOS() {
  if (typeof window === 'undefined' || !navigator) return 'ios';
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';

  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';

  return 'ios';
}

export function PlatformProvider({ children }) {
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  });

  const [mobileOS, setMobileOS] = useState(() => detectMobileOS());

  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
      setIsMobileViewport(isMob);
      setMobileOS(detectMobileOS());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic platform selection: 'desktop' on desktop screens, 'ios' or 'android' on mobile screens
  const activePlatform = isMobileViewport ? mobileOS : 'desktop';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-platform', activePlatform);
    root.setAttribute('data-mobile', isMobileViewport ? 'true' : 'false');
  }, [activePlatform, isMobileViewport]);

  return (
    <PlatformContext.Provider
      value={{
        activePlatform,
        isMobileViewport,
        mobileOS
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
