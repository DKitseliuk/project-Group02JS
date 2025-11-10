import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import Raty from 'raty-js';
import star from '../img/star.svg';
import starOn from '../img/staron.svg';
import starHalf from '../img/starhalf.svg';

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
          <div class="feedback-rate try-raty" data-score="${rate}"></div>
          <p class="feedback-descr">${descr}</p>
          <p class="feedback-author">${name}</p>
          </div>
        </li>`;
    })
    .join('');

  list.innerHTML = markup;

  const tryRaty = document.querySelectorAll('.try-raty').forEach(tryRaty => {
    const raty = new Raty(tryRaty, {
      number: 5,
      rating: '${rate}',
      step: 0.5,
      readOnly: true,
      starOff: star,
      starOn: starOn,
      starHalf: starHalf,
      round: { down: 0.29, full: 0.5, up: 0.8 },
    });
    raty.init();
  });
}

export { getFeedbacks };

function initSwiper() {
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

getFeedbacks().then(feedbacks => {
  if (feedbacks) {
    renderFeedbacks(feedbacks);

    initSwiper();
  }
});
