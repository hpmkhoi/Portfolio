import React, { useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
  lenis: Lenis | null;
  velocity: number;
}

const ScrollContext = createContext<ScrollContextType>({ lenis: null, velocity: 0 });

export const useScrollVelocity = () => useContext(ScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    lenis.on('scroll', (e: { velocity: number }) => {
      ScrollTrigger.update();
      setVelocity(e.velocity);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance, velocity }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
