import refs from './js/refs';
import './js/furniture-list';
import { handlerFurnitureLoadMoreBtn, handlerMenuOpenBtn, initialHomePage } from "./js/handlers";
import './js/modal.js';

document.addEventListener("DOMContentLoaded", initialHomePage);

// 
refs.menuOpenBtn.addEventListener('click', handlerMenuOpenBtn);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerFurnitureLoadMoreBtn);






