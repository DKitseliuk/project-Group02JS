import refs from './refs';
import { initialAccordion, initialSwiperFeedback, initialSwiperPopular } from './helpers';
import { openBurgerMenu, closeBurgerMenu } from './burger-menu';
import {
  getFeedbackFeedbacks,
  getFurnitureCategories,
  getFurnitureFurnitures,
  getFurnitureByCategory,
  sendOrder,
  getFurnitureById,
  getPopularFurnitures,
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
  renderPopularFurnitures,
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

    const { furnitures: popularFurnitures } = await getPopularFurnitures();
    renderPopularFurnitures(popularFurnitures);
    initialSwiperPopular();

    const feedbacksArr = await getFeedbackFeedbacks();
    renderFeedbackFeedbacks(feedbacksArr);
    initialSwiperFeedback();

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

function handlerFurnitureDetailsOrderBtn() {
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

async function handlerOrderSubmitForm(e) {
    e.preventDefault();

  const submitBtn = refs.orderForm.querySelector('button[type="submit"]');
  const loader = refs.orderForm.querySelector('.loader');

  // Блокуємо кнопку і показуємо лоадер
  submitBtn.disabled = true;
  submitBtn.style.display = 'none';
  loader.style.display = 'block';

  // Тимчасово прибираємо закриття модалки
  refs.orderCloseBtn.removeEventListener('click', handlerOrderCloseBtn);
  refs.orderBackdrop.removeEventListener('click', handlerOrderBackdropClick);

  if (validateForm(refs.orderForm)) {
    const formData = refs.orderForm.querySelector('#user-comment').value.trim() ? {
      modelId: currentModelId,
      color: currentColor,
      name: refs.orderForm.querySelector('#user-name').value.trim(),
      phone: refs.orderForm.querySelector('#user-phone').value.trim(),
      comment: refs.orderForm.querySelector('#user-comment').value.trim(),
    } : {
      modelId: currentModelId,
      color: currentColor,
      name: refs.orderForm.querySelector('#user-name').value.trim(),
      phone: refs.orderForm.querySelector('#user-phone').value.trim(),     
    }
    ;

    try {
      const response = await sendOrder(formData);

      // Успішне пуш-повідомлення iziToast
      iziToast.success({
        title: 'Успіх!',
        message: `Замовлення №${response.data.orderNum} успішно створено.`,
        position: 'topRight',
      });

      clearForm();
      closeOrderModal();
    } catch (error) {
      const message = error.response?.data?.message || 'Сталася помилка при відправці. Спробуйте ще раз.';

      // Пуш-повідомлення помилки
      iziToast.error({
        title: 'Помилка',
        message,
        position: 'topRight',
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.display = 'block';
      loader.style.display = 'none';

      refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
      refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
    }
  } else {
    submitBtn.disabled = false;
    submitBtn.style.display = 'block';
    loader.style.display = 'none';

    refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
    refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
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
