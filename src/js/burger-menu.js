export function initBurgerMenu() {
  const burgerBtn = document.querySelector('.header-burger-btn');
  const closeBtn = document.querySelector('.burger-menu-close');
  const burgerMenu = document.querySelector('.burger-menu');

  burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.add('is-open');
    document.body.classList.add('no-scroll');
  });

  closeBtn.addEventListener('click', () => {
    closeBurgerMenu();
  });

  document.addEventListener('click', event => {
    const isClickInsideMenu = burgerMenu.contains(event.target);
    const isClickOnButton = burgerBtn.contains(event.target);

    if (
      burgerMenu.classList.contains('is-open') &&
      !isClickInsideMenu &&
      !isClickOnButton
    ) {
      closeBurgerMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && burgerMenu.classList.contains('is-open')) {
      closeBurgerMenu();
    }
  });

  function closeBurgerMenu() {
    burgerMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}
