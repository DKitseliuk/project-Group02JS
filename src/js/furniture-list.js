import axios from 'axios';
import { CATEGORY_TYPE } from './constants';

const categoriesEl = document.querySelector('.category-list');
const listEl = document.querySelector('.furniture-list');
const paginationEl = document.querySelector(".pagination")


document.addEventListener('DOMContentLoaded', initialHomePage);

let page = 1;

async function initialHomePage() {
  try {
    const categoriesArr = await getCategories();
    const data = await getFurnitures(page);
    renderCategories(categoriesArr);
    renderFurnitures(data);
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

async function getFurnitures(currentPage = 1) {
  const limit = 8;
  const { data } = await axios.get(
    'https://furniture-store-v2.b.goit.study/api/furnitures',
    {
      params: {
        page: currentPage,
        limit,
      },
    }
  );
  
  return { ...data, limit, page: currentPage};
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
                <p class="category-name">${name}</p>
            </li>
        `
    )
    .join('');

  categoriesEl.insertAdjacentHTML('beforeend', allCategoriesMarkup);
}

function renderFurnitures(data) {
  const { furnitures, totalItems, limit } = data;
  const totalPages = Math.ceil(totalItems / limit);
  const listMarkupArr = furnitures
    .map(({ _id: id, images, name, color, price }) => {
      const markupColor = color
        .map(
          clr =>
            `<li class="furniture-color" style="background-color: ${clr};"></li>`
        )
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
    </li>`;
    })
    .join('');

  listEl.innerHTML = '';
  listEl.insertAdjacentHTML('afterbegin', listMarkupArr);
}

function getVisiblePages(current, total) {
  const pages = [...Array(total).keys()].map(i => i + 1);
  if (total <= 5) {
    return pages;
  }
  if (current <= 3) {
    return [1, 2, 3, `...`, total];
  }
 if (current >= total - 2) {
   return [1, `...`, total - 2, total - 1, total];
  }
  return [1, `...`, current - 1, current, current, current + 1, `...`, total];
}
function renderPagination() {
  if (!totalPages || totalPages <= 1) {
    paginationEl.innerHTML = "";
    return
  }

  const visible = getVisiblePages(currentPage, totalPages);

  const prevBtn = `
  <button class= "page-btn prev" data-action= "prev" ${currentPage === 1 ? `disabled` : ``}>←</button>`;

  const numbers = visible.map(p => {
    if (p === "...") {
      return `<span class="page-dotted">...</span>.`
    }
    return `<button class= "page-btn number" data-page ="${p}" ${p === currentPage ? `data-current ="true"` : ``}>${p}</button>`;

  }).join("")

  const nextBtn = `
  <button class= "page-btn next" data-action= "next" ${currentPage === totalPages ? `disabled` : ``}>→</button>`;

  paginationEl.innerHTML = `${prevBtn}, ${numbers}, ${nextBtn}`;
}

