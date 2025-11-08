import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, FURNITURES_PER_PAGE } from './constants';

async function getFurnitureCategories() {
    const { data: categoriesArr } = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`);
  
    return categoriesArr;
}

async function getFurnitureFurnitures(page = 1) {
    const { data } = await axios
        .get(`${API_BASE_URL}${API_ENDPOINTS.FURNITURES}`, {
            params: {
                page,
                limit: FURNITURES_PER_PAGE,
            },
        });
    
    return data;
}

export {
    getFurnitureCategories, 
    getFurnitureFurnitures
}