import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.2 });

  // Badge
  tl.from('.hero__badge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Title split into chars
  const titleEl = hero.querySelector('.hero__title');
  if (titleEl) {
    const split = new SplitType(titleEl, { types: 'chars, words' });
    tl.from(split.chars, {
      y: 80,
      opacity: 0,
      rotateX: -40,
      stagger: 0.02,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.4');
  }

  // Subtitle
  tl.from('.hero__subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.5');

  // Actions
  tl.from('.hero__actions .btn', {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.4');

  // Stats
  tl.from('.hero__stat', {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3');

  // Parallax on hero image
  const bgImg = hero.querySelector('.hero__bg-img');
  if (bgImg) {
    gsap.to(bgImg, {
      yPercent: 20,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Fade hero content on scroll
  gsap.to('.hero__content', {
    yPercent: -15,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '30% top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

export function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = gsap.utils.random(2, 5);

    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `rgba(var(--primary-rgb), ${gsap.utils.random(0.1, 0.3)})`,
      left: `${gsap.utils.random(0, 100)}%`,
      top: `${gsap.utils.random(0, 100)}%`,
    });

    container.appendChild(particle);

    gsap.to(particle, {
      y: gsap.utils.random(-80, 80),
      x: gsap.utils.random(-40, 40),
      opacity: gsap.utils.random(0.1, 0.5),
      duration: gsap.utils.random(4, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: gsap.utils.random(0, 3),
    });
  }
}
