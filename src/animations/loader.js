import gsap from 'gsap';

export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    if (!loader) { resolve(); return; }

    const tl = gsap.timeline({
      onComplete: () => {
        loader.remove();
        resolve();
      },
    });

    tl.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 1.3,
    });
  });
}
