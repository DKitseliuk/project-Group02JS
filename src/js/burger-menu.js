import refs from './refs';
import {
  handlerMenuCloseBtn,
  handlerMenuBackdropClick,
  handlerMenuBackdropEscape,
  handlerMenuLinksList,
} from './handlers.js';

function openBurgerMenu() {
  refs.menuBackdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', handlerMenuBackdropEscape);
  refs.menuBackdrop.addEventListener('click', handlerMenuBackdropClick);
  refs.menuCloseBtn.addEventListener('click', handlerMenuCloseBtn);
  refs.menuLinksList.addEventListener('click', handlerMenuLinksList);
}

function closeBurgerMenu() {
  refs.menuBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handlerMenuBackdropEscape);
  refs.menuBackdrop.removeEventListener('click', handlerMenuBackdropClick);
  refs.menuCloseBtn.removeEventListener('click', handlerMenuCloseBtn);
  refs.menuLinksList.removeEventListener('click', handlerMenuLinksList);
}

export { openBurgerMenu, closeBurgerMenu };
