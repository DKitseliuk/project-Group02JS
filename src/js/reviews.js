import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';

const reviewsUrl =
  'https://furniture-store-v2.b.goit.study/api/feedbacks?limit=10&page=1';
const list = document.querySelector('.reviews-list');

async function getFeedbacks() {
  try {
    const response = await axios.get(reviewsUrl);
    const feedbacks = response.data.feedbacks;

    createFeedbacks(feedbacks);
  } catch (error) {
    list.innerHTML = '<li>Не вдалося завантажити відгуки</li>';
  }
}

function createFeedbacks(reviews) {
  const markup = reviews
    .map(({ rate, descr, name }) => {
      return `
        <li class="reviews-item">
          <p class="rate"> ${rate}</p>
          <p class="descr">${descr}</p>
          <p class="name">${name}</p>
        </li>`;
    })
    .join('');

  list.innerHTML = `
    <div class="swiper reviews-swiper">
      <div class="swiper-wrapper">
        ${markup}
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
  `;
}

getFeedbacks();

export { getFeedbacks };
