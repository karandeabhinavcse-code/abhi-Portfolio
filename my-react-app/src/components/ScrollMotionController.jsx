import { useEffect, useRef } from 'react';

export default function ScrollMotionController() {
  const lastScrollY = useRef(0);
  const scrollBlur = useRef(0);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // 1. INTERSECTION OBSERVER FOR SECTION ENTRANCES & CARDS
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hud-revealed');
        }
      });
    }, observerOptions);

    // Target main sections & cards
    const targets = document.querySelectorAll('section, .glass-card, .project-card, .skill-card, .cert-card, .education-card');
    targets.forEach((el, idx) => {
      if (!el.classList.contains('hud-reveal')) {
        el.classList.add('hud-reveal');
        // Add staggered delay for child cards
        const staggerClass = `stagger-${(idx % 4) + 1}`;
        el.classList.add(staggerClass);
      }
      revealObserver.observe(el);
    });

    // 2. SCROLL VELOCITY TRACKER FOR BACKGROUND DECORATIVE MOTION BLUR & PARALLAX
    let isScrolling = false;

    const updateMotionBlur = () => {
      // Smooth exponential decay back to 0 (sharp focus)
      scrollBlur.current *= 0.80;
      if (scrollBlur.current < 0.08) {
        scrollBlur.current = 0;
        isScrolling = false;
      }

      const blurVal = Math.min(scrollBlur.current, 5.5); // max 5.5px blur on background
      const stretchVal = 1 + blurVal * 0.012;

      document.documentElement.style.setProperty('--hud-bg-blur', `${blurVal.toFixed(2)}px`);
      document.documentElement.style.setProperty('--hud-bg-stretch', `${stretchVal.toFixed(3)}`);

      if (isScrolling) {
        animFrameId.current = requestAnimationFrame(updateMotionBlur);
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const speed = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      // Subtle parallax offset for background decorative layers
      const parallaxY = currentY * 0.12;
      document.documentElement.style.setProperty('--hud-parallax-y', `${parallaxY.toFixed(1)}px`);

      // Motion blur ONLY triggered on fast scroll
      if (speed > 5) {
        const addedBlur = Math.min(speed * 0.10, 4.5);
        scrollBlur.current = Math.max(scrollBlur.current, addedBlur);

        if (!isScrolling) {
          isScrolling = true;
          animFrameId.current = requestAnimationFrame(updateMotionBlur);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return null;
}
