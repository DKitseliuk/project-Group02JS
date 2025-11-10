import refs from './refs';
import { initialAccordion, initialSwiper } from './helpers';
import { openBurgerMenu, closeBurgerMenu } from './burger-menu';
import {
  getFeedbackFeedbacks,
  getFurnitureCategories,
  getFurnitureFurnitures,
  getFurnitureByCategory,
  sendOrder,
  getFurnitureById,
} from './furniture-api';
import {
  furnitureDetailsToggleCurruntColor,
  furnitureHideLoader,
  furnitureHideLoadMoreBtn,
  furnitureShowLoader,
  furnitureShowLoadMoreBtn,
  furnitureToggleActiveCategory,
  hideOrderLoader,
  renderFeedbackFeedbacks,
  renderFurnitureCategories,
  renderFurnitureDetailsModal,
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
import { closeFurnitureDetailsModal, openFurnitureDetailsModal } from './modal';

let page = null;
let currentCategory = null;

let currentModelId = null;
let currentColor = null;

async function initialHomePage() {
  currentCategory = 'all';
  page = 1;
  try {
    const categoriesArr = await getFurnitureCategories();
    renderFurnitureCategories(categoriesArr);
    
    const firstActiveCategory = refs.furnitureCategoriesList.querySelector('.category-item[data-category-id="all"]');
    furnitureToggleActiveCategory(firstActiveCategory);
    
    const { furnitures, totalItems, limit } = await getFurnitureFurnitures();
    renderFurnitureFurnitures(furnitures);

    furnitureHideLoader();
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }

    const feedbacksArr = await getFeedbackFeedbacks();
    renderFeedbackFeedbacks(feedbacksArr);
    initialSwiper();

    initialAccordion();
  } catch (error) {
    console.log(error.message);
  } finally {
    furnitureHideLoader();
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
async function handlerFurnitureByCategory(event) {
  const clickedCategoryItem = event.target.closest('.category-item');
  if (!clickedCategoryItem) {
    return;
  }
  
  furnitureToggleActiveCategory(clickedCategoryItem);
  
  page = 1;
  refs.furnitureFurnituresList.innerHTML = '';
  furnitureHideLoadMoreBtn();
  furnitureShowLoader();
  try {
    currentCategory = clickedCategoryItem.dataset.categoryId;
    const { furnitures, totalItems, limit } =
      currentCategory === 'all'
        ? await getFurnitureFurnitures(page)
        : await getFurnitureByCategory(page, currentCategory);
    renderFurnitureFurnitures(furnitures);
    if (limit * page < totalItems) {
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    furnitureHideLoader();
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

    if (limit * page < totalItems) {      
      furnitureShowLoadMoreBtn();
    }
  } catch (error) {
    page--;
    furnitureShowLoadMoreBtn();    
  } finally {
    furnitureHideLoader();
  }
}

async function handlerFurnitureDetailsOpenBtn(event) { 
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  currentModelId = event.target.closest('.furniture-item').dataset.furnitureId;

  try {
    const furnitureDetails = await getFurnitureById(currentModelId);
    renderFurnitureDetailsModal(furnitureDetails);
    
    currentColor = furnitureDetails.color[0];
    furnitureDetailsToggleCurruntColor(document.querySelector('.furniture-modal-color'));

  } catch (error) {
    console.log(error.message);    
  }

  openFurnitureDetailsModal();
}

function handlerFurnitureDetailsCloseBtn() {
  closeFurnitureDetailsModal();
}

function handlerFurnitureDetailsBackdropClick(event) {
  if (event.target === refs.furnitureDetailsBackdrop) {
    closeFurnitureDetailsModal();
  }
}

function handlerFurnitureDetailsBackdropEscape(event) {
  if (event.key === 'Escape') {
    closeFurnitureDetailsModal();
  }
}

function handlerFurnitureDetailsOrderBtn(event) {
  closeFurnitureDetailsModal();
  openOrderModal();
}

function handlerFurnitureDetailsSelectColor(event) {
  if (event.target.nodeName !== "LI") {
    return;
  }
  currentColor = event.target.dataset.color;
  furnitureDetailsToggleCurruntColor(event.target);
}



//#endregion ===== Furniture handlers =====

//#region ===== Order modal handlers =====
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
  handlerFurnitureByCategory,
  handlerFurnitureDetailsOpenBtn,

  //Export furniture detail modal handlers  
  handlerFurnitureDetailsCloseBtn,
  handlerFurnitureDetailsBackdropClick,
  handlerFurnitureDetailsBackdropEscape,
  handlerFurnitureDetailsSelectColor,
  handlerFurnitureDetailsOrderBtn,

  //Export order modal handlers  
  handlerOrderCloseBtn,
  handlerOrderBackdropClick,
  handlerOrderBackdropEscape,
  handlerOrderSubmitForm,
};
