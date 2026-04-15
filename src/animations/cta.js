import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCtaAnimations() {
  const block = document.querySelector('[data-parallax-block]');
  if (!block) return;

  // Scale-in effect
  gsap.from(block, {
    scale: 0.92,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: block,
      start: 'top 80%',
    },
  });

  // Glow pulse on scroll
  gsap.to(block, {
    boxShadow: '0 0 120px rgba(var(--primary-rgb), 0.12)',
    ease: 'none',
    scrollTrigger: {
      trigger: block,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 2,
    },
  });
}
