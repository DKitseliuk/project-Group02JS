import axios from 'axios';
import {
  API_BASE_URL,
  API_ENDPOINTS,
  FEEDBACKS_PER_PAGE,
  FURNITURES_PER_PAGE,
  POPULAR_FURNITURES_PER_PAGE,
} from './constants';

//axios.defaults.baseURL = API_BASE_URL;

async function getFurnitureCategories() {
  const { data: categoriesArr } = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`
  );

  return categoriesArr;
}

async function getFurnitureFurnitures(page = 1) {
  const { data } = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`,
    {
      params: {
        page,
        limit: FURNITURES_PER_PAGE,
      },
    }
  );
  return data;
}

async function getFurnitureByCategory(page = 1, category = 'all') {
  const { data } = await axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`,
    {
      params: {
        page,
        limit: FURNITURES_PER_PAGE,
        category,
      },
    }
  );
  return data;
}

async function getFurnitureById(furnitureId) {
  const { data } = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FURNITURES_BY_ID}${furnitureId}`);  
  return data;
}

async function getPopularFurnitures() {
  const { data } = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`, {
    params: {
      type: 'popular',
      limit: POPULAR_FURNITURES_PER_PAGE
    }, 
  });  
  return data;
}



async function getFeedbackFeedbacks() {
  const {
    data: { feedbacks },
  } = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.FEEDBACKS}`, {
    params: {
      limit: FEEDBACKS_PER_PAGE,
    },
  });
  return feedbacks;
}

async function sendOrder(orderData) {
  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.ORDERS}`,
    orderData
  );
  return response;
}

export {
  getFurnitureCategories,
  getFurnitureFurnitures,
  getFeedbackFeedbacks,
  getFurnitureByCategory,
  getFurnitureById,
  sendOrder,
  getPopularFurnitures,
};




