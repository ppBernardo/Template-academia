import gsap from 'gsap';

export function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn--shine');

  buttons.forEach((btn) => {
    const shine = document.createElement('span');
    shine.classList.add('btn__shine');
    btn.appendChild(shine);

    btn.addEventListener('mouseenter', () => {
      gsap.fromTo(shine,
        { x: '-100%', opacity: 0.6 },
        { x: '200%', opacity: 0, duration: 0.6, ease: 'power2.out' }
      );

      gsap.to(btn, {
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { scale: 0.97, duration: 0.1 });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.2, ease: 'back.out(2)' });
    });
  });
}
