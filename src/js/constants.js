const API_BASE_URL = "https://furniture-store-v2.b.goit.study";

const API_ENDPOINTS = {
  FURNITURES: "/api/furnitures",
  FURNITURES_BY_ID: "/api/furnitures/",
  CATEGORIES: "/api/categories",
  FEEDBACKS: "/api/feedbacks",
  ORDERS: "/api/orders"    
};

const FURNITURES_PER_PAGE = 8;
const POPULAR_FURNITURES_PER_PAGE = 30;
const FEEDBACKS_PER_PAGE = 10;

const CATEGORY_TYPE = {
  "Всі товари": "all-furniture",
  "М'які меблі": "upholstered-furniture",
  "Шафи та системи зберігання": "wardrobes-storage",
  "Ліжка та матраци": "beds-mattresses",
  "Столи": "tables",
  "Стільці та табурети": "chairs-stools",
  "Кухні": "kitchens",
  "Меблі для дитячої": "kids-furniture",
  "Меблі для офісу": "office-furniture",
  "Меблі для передпокою": "hallway-furniture",
  "Меблі для ванної кімнати": "bathroom-furniture",
  "Садові та вуличні меблі": "outdoor-garden-furniture",
  "Декор та аксесуари": "decor-accessories"
};

export {
  API_BASE_URL,
  API_ENDPOINTS,
  FURNITURES_PER_PAGE,
  POPULAR_FURNITURES_PER_PAGE,
  FEEDBACKS_PER_PAGE,  
  CATEGORY_TYPE
};