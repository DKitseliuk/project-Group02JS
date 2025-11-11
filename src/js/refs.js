const refs = {
  //Menu elements
  menuOpenBtn: document.querySelector('.header-burger-btn'),
  menuCloseBtn: document.querySelector('.burger-menu-close'),
  menuBackdrop: document.querySelector('.burger-menu'),
  menuLinksList: document.querySelector('.burger-nav-list'),

  //Furniture elements
  furnitureCategoriesList: document.querySelector('.category-list'),
  furnitureFurnituresList: document.querySelector('.furniture-list'),
  furnitureLoadMoreBtn: document.querySelector('.load-more-button'),
  categoryLoader: document.querySelector('.category-loader'),
  furnitureLoader: document.querySelector('.furniture-loader'),

  //Popular furniture elements
  popularFurnituresList: document.querySelector('.popular-list'),

  // Feedback elements
  feedbackFeedbacksList: document.querySelector('.feedback-swiper-wrapper'),
  feedbackLoader: document.querySelector('.feedback-loader'),

  popularFurnitureLoader: document.querySelector('.popular-furniture-loader'),

  //Furniture details modal elements
  furnitureDetailsBackdrop: document.querySelector('[data-backdrop-furniture-details]'),
  furnitureDetailsModal: document.querySelector('.furniture-modal'),
  furnitureDetailsModalLoader: document.querySelector('.furniture-modal-loader-box'),
  furnitureDetailsCloseBtn: document.querySelector('[data-backdrop-furniture-close]'),
  furnitureDetailsImages: document.querySelector('.furniture-modal-img-list'),
  furnitureDetailsInfo: document.querySelector('.furniture-modal-info'),
  furnitureDetailsOrderBtn: document.querySelector('[data-backdrop-furniture-order'),

  //Order modal elements
  orderBackdrop: document.querySelector('[data-backdrop-order]'),
  orderCloseBtn: document.querySelector('[data-backdrop-order-close]'),
  orderForm: document.querySelector('.form-modal'),
  orderLoader: document.querySelector('[data-loader-order]'),
};

export default refs;
