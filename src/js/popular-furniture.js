import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import axios from 'axios';

import {openFurnitureDetailsModal, closeFurnitureDetailsModal} from "./modal";
import {renderFurnitureDetailsModal, furnitureDetailsToggleCurruntColor} from "./render-function";
import {getFurnitureById} from "./furniture-api";

const API_BASE = 'https://furniture-store-v2.b.goit.study/api';
axios.defaults.baseURL = API_BASE;

const popularList = document.querySelector('.popular-list');
popularList.addEventListener('click', handlerFurnitureDetailsOpenBtn);

async function renderPopular() {
  try {
    const { data } = await axios.get('/furnitures', {
      params: { type: 'popular' }, 
    });

    const items = data.furnitures;

    const markup = items
      .map(item => {
        const { _id, name, images, price, color } = item;
        const img = images[0];
        return `
          <li class="furniture-item swiper-slide" data-furniture-id="${_id}">

            <div class="furniture-data-wrapper">

              <div class="furniture-visual">
                <img src="${img}" alt="${name}" width="310" height="257">
              </div>

              <div class="furniture-info">

                <h3 class="furniture-name">${name}</h3>
                <ul class="color-list">
                  ${color.map(col => `<li class="color-dot" style="background-color:${col}"></li>`).join('')}
                </ul>
                <p class="furniture-price">${price} грн</p>

              </div>

              <button class="furniture-btn" type="button">Детальніше</button>

            </div>
            
          </li>
        `;
      })
      .join('');

    popularList.insertAdjacentHTML('beforeend', markup);
  } catch (e) {
    console.error(e);
  }
}


async function initPopular() {

  await renderPopular();   

  const swiper = new Swiper('.popular-viewport', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    slidesPerGroup: 1,
    watchOverflow: true,
    centeredSlides: false,

    pagination: {
      el: '.popular-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.popular-next',
      prevEl: '.popular-prev',
    },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1440: { slidesPerView: 4 },
    },
    
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  });

  
  const prev = document.querySelector('.popular-prev');
  const next = document.querySelector('.popular-next');
  
  const toggleArrows = () => {
    prev.toggleAttribute('disabled', swiper.isBeginning);
    next.toggleAttribute('disabled', swiper.isEnd);
  };
  swiper.on('afterInit slideChange reachBeginning reachEnd fromEdge', toggleArrows);
  toggleArrows();
}

initPopular();

let currentModelId = null;
let currentColor = null;

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

closeFurnitureDetailsModal(); 




