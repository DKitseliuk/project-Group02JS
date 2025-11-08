export function initBurgerMenu() {
  const burgerBtn = document.querySelector('.header-burger-btn');
  const closeBtn = document.querySelector('.burger-menu-close');
  const burgerMenu = document.querySelector('.burger-menu');
  const anchorLinks = burgerMenu.querySelectorAll('a[href^="#"]');
  burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.add('is-open');
    document.body.classList.add('no-scroll');
  });

  closeBtn.addEventListener('click', closeBurgerMenu);

  burgerMenu.addEventListener('click', event => {
    if (event.target === burgerMenu) {
      closeBurgerMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && burgerMenu.classList.contains('is-open')) {
      closeBurgerMenu();
    }
  });

  anchorLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        closeBurgerMenu();
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    });
  });

  function closeBurgerMenu() {
    burgerMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}
