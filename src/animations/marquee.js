import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMarquee() {
  const marquee = document.querySelector('[data-marquee]');
  if (!marquee) return;

  const track = marquee.querySelector('.marquee__track');
  if (!track) return;

  // Duplicate content for seamless loop
  track.innerHTML += track.innerHTML;

  const totalWidth = track.scrollWidth / 2;

  const tween = gsap.to(track, {
    x: -totalWidth,
    duration: 30,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  // Speed up / slow down based on scroll velocity
  ScrollTrigger.create({
    trigger: marquee,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity());
      const speedMultiplier = gsap.utils.clamp(1, 5, velocity / 300);
      gsap.to(tween, { timeScale: speedMultiplier, duration: 0.5 });
    },
    onLeave: () => gsap.to(tween, { timeScale: 1, duration: 0.5 }),
    onLeaveBack: () => gsap.to(tween, { timeScale: 1, duration: 0.5 }),
  });
}
