import refs from './js/refs';
import { handlerFurnitureByCategory, handlerFurnitureDetailsOpenBtn, handlerFurnitureLoadMoreBtn, handlerMenuOpenBtn, initialHomePage } from "./js/handlers";
import './js/modal.js';

document.addEventListener("DOMContentLoaded", initialHomePage);

// 
refs.menuOpenBtn.addEventListener('click', handlerMenuOpenBtn);
refs.furnitureCategoriesList.addEventListener('click', handlerFurnitureByCategory);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerFurnitureLoadMoreBtn);
refs.furnitureFurnituresList.addEventListener('click', handlerFurnitureDetailsOpenBtn);

import './js/popular-furniture.js';
