import axios from 'axios';
import {
  API_BASE_URL,
  API_ENDPOINTS,
  FEEDBACKS_PER_PAGE,
  FURNITURES_PER_PAGE,
} from './constants';

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
  sendOrder,
};

// Furniture Data Model
class FurnitureModel {
  constructor(data) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.images = data.images || [];
    this.rate = data.rate || 0;
    this.price = data.price;
    this.sizes = data.sizes;
    this.color = data.color || [];
    this.type = data.type;
    this.category = {
      _id: data.category?._id || '',
      name: data.category?.name || '',
    };
  }

  // Get the main image URL
  getMainImage() {
    return this.images[0] || '';
  }

  // Get additional images (excluding the main one)
  getAdditionalImages() {
    return this.images.slice(1);
  }

  // Get formatted price
  getFormattedPrice() {
    return this.price.toLocaleString('uk-UA');
  }

  // Get category name
  getCategoryName() {
    return this.category.name;
  }
}

/**
 * Fetch furniture details by ID
 * @param {string} id - Furniture ID
 * @returns {Promise<FurnitureModel>} Furniture data model
 */
async function getFurnitureById(id) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.FURNITURES_BY_ID}${id}`
    );
    return new FurnitureModel(response.data);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    throw error;
  }
}

export { getFurnitureById, FurnitureModel };
