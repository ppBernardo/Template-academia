import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  counters.forEach((el) => {
    const target = parseInt(el.dataset.counter, 10);
    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: target,
          duration: CONFIG.animation.counterDuration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.value);
          },
        });
      },
    });
  });
}
