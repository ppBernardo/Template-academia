import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { CONFIG } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals() {
  initTagReveals();
  initSplitLineReveals();
  initGenericReveals();
  initCardReveals();
}

function initTagReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: CONFIG.animation.revealDistance,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

function initSplitLineReveals() {
  gsap.utils.toArray('[data-split-lines]').forEach((el) => {
    const split = new SplitType(el, { types: 'lines, words' });

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      yPercent: 110,
      opacity: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

function initGenericReveals() {
  gsap.utils.toArray('.section__subtitle').forEach((el) => {
    if (el.hasAttribute('data-reveal')) return;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });
}

function initCardReveals() {
  const grids = gsap.utils.toArray('.beneficios__grid, .planos__grid, .depoimentos__grid, .contato__info');

  grids.forEach((grid) => {
    const cards = grid.querySelectorAll('[data-reveal-card]');
    if (!cards.length) return;

    gsap.from(cards, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      stagger: CONFIG.animation.staggerDelay,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}
