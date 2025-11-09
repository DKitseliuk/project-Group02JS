import refs from './refs';
import { openBurgerMenu, closeBurgerMenu } from './burger-menu';
import {
  getFurnitureByCategory,
  getFurnitureCategories,
  getFurnitureFurnitures,
} from './furniture-api';
import {
  renderFurnitureCategories,
  renderFurnitureFurnitures,
} from './render-function';

let page = null;
let currentCategory = 'all';

async function initialHomePage() {
  page = 1;
  furnitureShowLoader();
  try {
    const categoriesArr = await getFurnitureCategories();
    const { furnitures, totalItems, limit } = await getFurnitureFurnitures();
    renderFurnitureCategories(categoriesArr);
    renderFurnitureFurnitures(furnitures);
    furnitureHideLoader();
    furnitureShowLoadMoreBtn();
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    console.log(error.message);
  }
}

//#region ===== Menu handlers =====

function handlerMenuOpenBtn() {
  openBurgerMenu();
}

function handlerMenuCloseBtn() {
  closeBurgerMenu();
}

function handlerMenuBackdropClick(event) {
  if (event.target === refs.menuBackdrop) {
    closeBurgerMenu();
  }
}

function handlerMenuBackdropEscape(event) {
  if (event.key === 'Escape') {
    closeBurgerMenu();
  }
}

function handlerMenuLinksList(event) {
  if (event.target.nodeName !== 'A') return;
  closeBurgerMenu();
}
//#endregion ===== Menu handlers =====

//#region ===== Furniture handlers =====

async function handlerFurnitureLoadMoreBtn() {
  page++;
  furnitureHideLoadMoreBtn();
  furnitureShowLoader();
  try {
    const { furnitures, totalItems, limit } =
      currentCategory === 'all'
        ? await getFurnitureFurnitures(page)
        : await getFurnitureByCategory(page, currentCategory);
    renderFurnitureFurnitures(furnitures);
    furnitureHideLoader();
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function handlerFurnitureByCategory(event) {
  if (!event.target.closest('.category-item')) {
    return;
  }
  page = 1;
  refs.furnitureFurnituresList.innerHTML = '';
  furnitureHideLoadMoreBtn();
  furnitureShowLoader();
  try {
    currentCategory = event.target.closest('.category-item').dataset.categoryId;
    const { furnitures, totalItems, limit } =
      currentCategory === 'all'
        ? await getFurnitureFurnitures(page)
        : await getFurnitureByCategory(page, currentCategory);
    renderFurnitureFurnitures(furnitures);
    furnitureHideLoader();
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    console.log(error.message);
  }
}

//#endregion ===== Furniture handlers =====

//#region ===== Furniture LoadMoreBtn =====
function furnitureShowLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.remove('is-hidden');
}
function furnitureHideLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.add('is-hidden');
}
//#endregion ===== Furniture LoadMoreBtn =====

//#region ===== Furniture Loader =====
function furnitureShowLoader() {
  refs.furnitureLoader.classList.remove('is-hidden');
}
function furnitureHideLoader() {
  refs.furnitureLoader.classList.add('is-hidden');
}
//#endregion ===== Furniture Loader =====

export {
  initialHomePage,

  //Export menu handlers
  handlerMenuOpenBtn,
  handlerMenuCloseBtn,
  handlerMenuBackdropClick,
  handlerMenuBackdropEscape,
  handlerMenuLinksList,

  //Export furniture handlers
  handlerFurnitureLoadMoreBtn,
  handlerFurnitureByCategory,
};
