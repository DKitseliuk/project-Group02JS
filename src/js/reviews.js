import axios from 'axios';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';

const reviewsUrl = 'https://furniture-store-v2.b.goit.study/api/feedbacks';
const list = document.querySelector('.swiper-wrapper');

async function getFeedbacks() {
  try {
    const response = await axios.get(reviewsUrl, {
      params: {
        limit: 10,
      },
    });
    return response.data.feedbacks;
  } catch (error) {
    list.innerHTML = '<li>Не вдалося завантажити відгуки</li>';
  }
}

function renderFeedbacks(reviews) {
  const markup = reviews
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

  list.innerHTML = markup;
}

export { getFeedbacks };

function initSwiper() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination, Keyboard, Mousewheel],
    speed: 400,
    slidesPerGroup: 2,
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

getFeedbacks().then(feedbacks => {
  if (feedbacks) {
    renderFeedbacks(feedbacks);
    initSwiper();
  }
});
