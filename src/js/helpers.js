import Accordion from 'accordion-js';
//import "accordion-js/dist/accordion.min.css";
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function initialAccordion() {
  const params = {
    duration: 350,
    showMultiple: false,
    elementClass: 'accordion-item',
    triggerClass: 'accordion-trigger',
    panelClass: 'accordion-panel',
    activeClass: 'accordion-active',
  };

  new Accordion('.accordion-list', params);
}

function initialSwiperFeedback() {
  new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination, Keyboard],
    speed: 350,
    slidesPerGroup: 1,
    grabCursor: true,
    loop: false,
    loopPreventsSliding: true,

    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 24 },
    },

    pagination: {
      el: '.paginator',
      clickable: true,
    },

    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}

function initialSwiperPopular() {
    const swiper = new Swiper('.popular-viewport', {
      modules: [Navigation, Pagination, Keyboard],
      speed: 350,
    slidesPerView: 1,
    spaceBetween: 24,
    slidesPerGroup: 1,
    grabCursor: true,
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
    keyboard: {
      enabled: true,
      onlyInViewport: true,
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



export { initialAccordion, initialSwiperFeedback, initialSwiperPopular };
