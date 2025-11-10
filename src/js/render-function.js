import refs from './refs';
import { CATEGORY_TYPE } from './constants';

//#region ===== Furniture =====
function renderFurnitureCategories(categoriesArr) {
  const allCategoriesArr = [
    { _id: 'all', name: 'Всі товари' },
    ...categoriesArr,
  ];

  const allCategoriesMarkup = allCategoriesArr
    .map(({ _id: id, name }) => {
      return `
        <li class="category-item"
            data-category-id="${id}" 
            data-category-type="${CATEGORY_TYPE[name] || 'unknown'}"
        >
            <p class="category-name">${name}</p>
        </li>
        `;
    })
    .join('');

  refs.furnitureCategoriesList.insertAdjacentHTML(
    'beforeend',
    allCategoriesMarkup
  );
}

function renderFurnitureFurnitures(furnitures) {
  const listMarkupArr = furnitures
    .map(({ _id: id, images, name, color, price }) => {
      const markupColor = color
        .map(
          clr =>
            `<li class="furniture-color" style="background-color: ${clr};"></li>`
        )
        .join('');

      return `
            <li class="furniture-item" data-furniture-id="${id}">
                <img class="furniture-image" src="${images[0]}" alt="${name}"/>
                <div class="furniture-info">
                    <h3 class="furniture-name">${name}</h3>
                    <ul class="furniture-colors">
                        ${markupColor}
                    </ul>
                    <p class="furniture-price">${price} грн</p>
                </div>
                <button class="furniture-button" type="button">Детальніше</button>
            </li>
            `;
    })
    .join('');

  refs.furnitureFurnituresList.insertAdjacentHTML('beforeend', listMarkupArr);
}

function furnitureShowLoadMoreBtn() {
  console.log('furnitureLoadMoreBtn show');

  refs.furnitureLoadMoreBtn.classList.remove('is-hidden');
}

function furnitureHideLoadMoreBtn() {
  console.log('furnitureLoadMoreBtn hide');
  refs.furnitureLoadMoreBtn.classList.add('is-hidden');
}

function furnitureShowLoader() {
  refs.furnitureLoader.classList.remove('is-hidden');
}

function furnitureHideLoader() {
  refs.furnitureLoader.classList.add('is-hidden');
}

function furnitureToggleActiveCategory(categoryEl) {
  refs.furnitureCategoriesList.querySelectorAll('.category-item')
    .forEach(category => category.classList.remove('category-item-active'));  
  categoryEl.classList.add('category-item-active');
}

//#endregion ===== Furniture =====

//#region ===== Feedback =====
function renderFeedbackFeedbacks(feedbacks) {
  const feedbacksMarkup = feedbacks
    .map(({ rate, descr, name }) => {
      return `
        <li class="swiper-slide">
          <div class="feedback-item">
            <p class="feedback-rate"> ${rate}</p>
            <p class="feedback-descr">${descr}</p>
            <p class="feedback-author">${name}</p>
          </div>
        </li>`;
    })
    .join('');

  refs.feedbackFeedbacksList.insertAdjacentHTML('beforeend', feedbacksMarkup);
}
//#endregion ===== Feedback =====

//#region ===== Furniture details modal =====

function renderFurnitureDetailsModal(furnitureDetails) { 
  const {
    name,
    category: { name: categoryName },
    price,
    rate,
    color,
    description,
    sizes,
    images
  } = furnitureDetails;
  
  const imagesMarkup = images
    .map(image => {
      return `
        <li class="furniture-modal-img-item">
          <img
            class="furniture-modal-img"
            src="${image}"
            alt="${description}"
            loading="lazy"
          />
      </li>
      `;
    })
    .join('');
  
  const colorsMarkup = color
    .map(colorItem => {
      return `
        <li
            class="furniture-modal-color"
            style="background-color: ${colorItem}"
            data-color="${colorItem}"
          >
        </li>
      `;
    })
    .join('');
  
  const infoMarkup = `
    <h3 class="furniture-modal-name">${name}</h3>
    <p class="furniture-modal-category">${categoryName}</p>
    <p class="furniture-modal-price">${price} грн</p>
    <div class="furniture-modal-rate">${rate}</div>
    <p class="furniture-modal-subtitle">Колір</p>
    <ul class="furniture-modal-colors">${colorsMarkup}</ul>
    <p class="furniture-modal-description">${description}</p>
    <p class="furniture-modal-size">Розміри: ${sizes}</p>
  `
  refs.furnitureDetailsImages.innerHTML = imagesMarkup;
  refs.furnitureDetailsInfo.innerHTML = infoMarkup;
}

function furnitureDetailsToggleCurruntColor(colorEl) {
  document.querySelectorAll('.furniture-modal-color')
    .forEach(item => item.classList.remove('current-color'));  
  colorEl.classList.add('current-color');
}

//#endregion ===== Furniture details modal =====


//#region ===== Order modal =====
function showOrderLoader() {
  refs.orderLoader.classList.remove('is-hidden');
}

function hideOrderLoader() {
  refs.orderLoader.classList.add('is-hidden');
}

function showError(input, message) {
  const errorText = input.parentElement.querySelector('.error-text');
  input.classList.add('invalid');
  if (errorText) {
    errorText.textContent = message;
    errorText.style.opacity = 1;
  }
}
//#endregion ===== Order modal =====

export {
  renderFurnitureCategories,
  renderFurnitureFurnitures,
  furnitureToggleActiveCategory,
  furnitureShowLoadMoreBtn,
  furnitureHideLoadMoreBtn,
  furnitureShowLoader,
  furnitureHideLoader,
  renderFurnitureDetailsModal,
  furnitureDetailsToggleCurruntColor,
  renderFeedbackFeedbacks,
  showOrderLoader,
  hideOrderLoader,
  showError,
};