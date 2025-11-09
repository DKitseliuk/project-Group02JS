import refs from './js/refs';
import './js/furniture-list';
import {
  handlerFurnitureByCategory,
  handlerFurnitureLoadMoreBtn,
  initialHomePage,
} from './js/handlers';

document.addEventListener('DOMContentLoaded', initialHomePage);

//
refs.furnitureLoadMoreBtn.addEventListener(
  'click',
  handlerFurnitureLoadMoreBtn
);
refs.furnitureCategoriesList.addEventListener(
  'click',
  handlerFurnitureByCategory
);
