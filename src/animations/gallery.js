import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGalleryScroll() {
  const gallery = document.querySelector('[data-gallery-scroll]');
  if (!gallery) return;

  const track = gallery.querySelector('.gallery-scroll__track');
  if (!track) return;

  const items = track.querySelectorAll('.gallery-scroll__item');
  const totalScroll = track.scrollWidth - gallery.offsetWidth;

  // Horizontal scroll driven by vertical scrolling
  gsap.to(track, {
    x: -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: gallery,
      start: 'top 60%',
      end: `+=${totalScroll}`,
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  // Reveal items with stagger
  gsap.from(items, {
    scale: 0.85,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: gallery,
      start: 'top 75%',
    },
  });
}
