import refs from './refs';
import { initialAccordion, initialSwiper } from './helpers';
import { openBurgerMenu, closeBurgerMenu } from './burger-menu';
import {
  getFeedbackFeedbacks,
  getFurnitureCategories,
  getFurnitureFurnitures,
  sendOrder,
} from './furniture-api';
import {
  hideOrderLoader,
  renderFeedbackFeedbacks,
  renderFurnitureCategories,
  renderFurnitureFurnitures,
  showOrderLoader,
} from './render-function';
import {
  openOrderModal,
  closeOrderModal,
  validateForm,
  clearForm,
} from './modal-order';
import iziToast from 'izitoast';

let page = null;

let currentModelId = null;
let currentColor = null;

async function initialHomePage() {
  page = 1;

  try {
    const categoriesArr = await getFurnitureCategories();
    renderFurnitureCategories(categoriesArr);

    const listArr = await getFurnitureFurnitures();
    renderFurnitureFurnitures(listArr.furnitures);

    const feedbacksArr = await getFeedbackFeedbacks();
    renderFeedbackFeedbacks(feedbacksArr);
    initialSwiper();
  } catch (error) {
    console.log(error.message);
  }

  initialAccordion();
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
  try {
  } catch (error) {
    console.log(error.message);
  }
}

//#endregion ===== Furniture handlers =====

//#region ===== Order modal handlers =====
function handlerOrderOpenBth(event) {
  openOrderModal();
}

function handlerOrderCloseBtn() {
  closeOrderModal();
}

function handlerOrderBackdropClick(event) {
  if (event.target === refs.orderBackdrop) {
    closeOrderModal();
  }
}

function handlerOrderBackdropEscape(event) {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
}

async function handlerOrderSubmitForm(event) {
  event.preventDefault();

  if (!validateForm(refs.orderForm)) return;

  showOrderLoader();

  const name = refs.orderForm.elements['user-name'].value.trim();
  const phone = refs.orderForm.elements['user-phone'].value
    .trim()
    .replace(/\D/g, '');
  const comment =
    refs.orderForm.elements['user-comment'].value.trim() || 'Немає коментаря';

  const orderData = {
    name,
    phone,
    modelId: currentModelId || '682f9bbf8acbdf505592ac36',
    color: currentColor || '#1212ca',
    comment,
  };

  try {
    const response = await sendOrder(orderData);

    console.log('Вся відповідь сервера:', response);
    console.log('Тільки data:', response.data);

    iziToast.success({
      title: 'Успіх!',
      message: `Замовлення №${response.data.orderNum} успішно створено.`,
      position: 'topRight',
    });

    clearForm();
    closeOrderModal();
  } catch (error) {
    let message = 'Сталася невідома помилка. Спробуйте ще раз.';
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    iziToast.error({
      title: 'Помилка',
      message,
      position: 'topRight',
    });
  } finally {
    hideOrderLoader();
  }
}
//#endregion ===== Order modal handlers =====

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

  //Export order modal handlers
  handlerOrderOpenBth,
  handlerOrderCloseBtn,
  handlerOrderBackdropClick,
  handlerOrderBackdropEscape,
  handlerOrderSubmitForm,
};

// =============== DaniJla-64 commit ===============

import { getFurnitureByCategory } from './furniture-api';

let currentCategory = 'all';

async function initialHomePage() {
  page = 1;
  furnitureShowLoader();
  try {
    const categoriesArr = await getFurnitureCategories();
    renderFurnitureCategories(categoriesArr);

    const { furnitures, totalItems, limit } = await getFurnitureFurnitures();
    renderFurnitureFurnitures(furnitures);

    furnitureHideLoader();
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    console.log(error.message);
  }
}

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
  //Export furniture handlers
  handlerFurnitureByCategory,
};
