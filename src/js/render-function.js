import refs from './refs';
import { CATEGORY_TYPE } from './constants';

//#region ===== Furniture =====
function renderFurnitureCategories(categoriesArr) {
  const allCategoriesArr = [
        { _id: 'all', name: 'Всі товари' },
        ...categoriesArr,
    ];
    
  const allCategoriesMarkup = allCategoriesArr
    .map(
        ({ _id: id, name }) => {
        return `
        <li class="category-item"
            data-category-id="${id}" 
            data-category-type="${ CATEGORY_TYPE[name] || 'unknown'}"
        >
            <p class="category-name">${name}</p>
        </li>
        `
    })
    .join('');

    refs.furnitureCategoriesList.insertAdjacentHTML('beforeend', allCategoriesMarkup);
}

function renderFurnitureFurnitures(furnitures) {
    const listMarkupArr = furnitures
        .map(({ _id: id, images, name, color, price }) => {
                const markupColor = color
                .map(clr => `<li class="furniture-color" style="background-color: ${clr};"></li>`)
            .join('');
            
            return `
            <li class="furniture-item" data-category-id="${id}">
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

  refs.feedbackFeedbacksList.insertAdjacentHTML("beforeend", feedbacksMarkup);
}
//#endregion ===== Feedback =====

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
    
  renderFeedbackFeedbacks,

  showOrderLoader,
  hideOrderLoader,
  showError
}