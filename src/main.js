import './styles/index.css';

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CONFIG } from './config.js';
import { initLoader } from './animations/loader.js';
import { initHeroAnimations, initParticles } from './animations/hero.js';
import { initScrollReveals } from './animations/scroll-reveals.js';
import { initMarquee } from './animations/marquee.js';
import { initGalleryScroll } from './animations/gallery.js';
import { initCounters } from './animations/counters.js';
import { initButtonEffects } from './animations/magnetic.js';
import { initCtaAnimations } from './animations/cta.js';

gsap.registerPlugin(ScrollTrigger);

// ─── Smooth scroll with Lenis ───
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ─── Anchor smooth scroll via Lenis ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -72 });
  });
});

// ─── Navbar scroll effect ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 50,
    onUpdate: (self) => {
      navbar.classList.toggle('navbar--scrolled', self.scroll() > 50);
    },
  });
}

// ─── Mobile menu ───
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const opening = !menu.classList.contains('open');
    menu.classList.toggle('open', opening);
    toggle.classList.toggle('active', opening);

    if (opening) {
      lenis.stop();
      gsap.from(menu.querySelectorAll('.navbar__link'), {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      });
    } else {
      lenis.start();
    }
  });

  menu.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      lenis.start();
    });
  });
}

// ─── WhatsApp links ───
function initWhatsApp() {
  const { number, message } = CONFIG.whatsapp;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('[data-whatsapp-btn]').forEach((el) => {
    el.setAttribute('href', url);
  });

  // FAB visibility
  const fab = document.querySelector('.whatsapp-fab');
  if (fab) {
    ScrollTrigger.create({
      start: 600,
      onUpdate: (self) => {
        fab.classList.toggle('visible', self.scroll() > 600);
      },
    });
  }
}

// ─── Boot ───
async function init() {
  await initLoader();

  initNavbar();
  initMobileMenu();
  initWhatsApp();
  initParticles();
  initHeroAnimations();
  initScrollReveals();
  initMarquee();
  initGalleryScroll();
  initCounters();
  initButtonEffects();
  initCtaAnimations();

  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
