import axios from 'axios';
import { CATEGORY_TYPE } from './constants';

const categoriesEl = document.querySelector('.category-list');
const listEl = document.querySelector('.furniture-list');

document.addEventListener('DOMContentLoaded', initialHomePage);

async function initialHomePage() {
  try {
    const categoriesArr = await getCategories();
    const listArr = await getFurnitures();
    renderCategories(categoriesArr);
    renderFurnitures(listArr);
  } catch (error) {
    console.log(error.message);
  }
}

async function getCategories() {
  const { data: categoriesArr } = await axios.get(
    'https://furniture-store-v2.b.goit.study/api/categories'
  );
  return categoriesArr;
}

async function getFurnitures() {
  const {
    data: { furnitures },
  } = await axios.get(
    'https://furniture-store-v2.b.goit.study/api/furnitures?page=1&limit=8'
  );
  return furnitures;
}

function renderCategories(categoriesArr) {
  const allCategoriesArr = [
    { _id: 'all', name: 'Всі товари' },
    ...categoriesArr,
  ];
  const allCategoriesMarkup = allCategoriesArr
    .map(
      ({ _id: id, name }) => `
            <li class="category-item" data-category-id="${id}" data-category-type="${
        CATEGORY_TYPE[name] || 'unknown'
      }">
                <p class="category-title">${name}</p>
            </li>
        `
    )
    .join('');

  categoriesEl.insertAdjacentHTML('beforeend', allCategoriesMarkup);
}

function renderFurnitures(listArr) {
  const listMarkupArr = listArr
    .map(({ _id: id, images, name, color, price }) => {
      const MarkupColor = color
        .map(
          clr =>
            `<li class="products-color" style="background-color: ${clr};"></li>`
        )
        .join('');
      return `
    <li class="list-item" data-category-id="${id}">
    <img class="products-image" src="${images[0]}" alt="alt" width="335"/>
    <p class="products-name">${name}</p>
    <ul class="products-colors">
    ${MarkupColor}
    </ul>
    <p class="products-price">${price} грн</p>
    <button class="products-button">Детальніше</button>
    </li>`;
    })
    .join('');

  listEl.insertAdjacentHTML('beforeend', listMarkupArr);
}
