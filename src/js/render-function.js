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

export {
    renderFurnitureCategories,
    renderFurnitureFurnitures
}