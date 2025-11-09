import Accordion from 'accordion-js';
//import "accordion-js/dist/accordion.min.css";
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
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

function initialSwiper() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination, Keyboard, Mousewheel],
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

export { initialAccordion, initialSwiper };
