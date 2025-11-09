const refs = {
    //Menu elements
    menuOpenBtn: document.querySelector('.header-burger-btn'),
    menuCloseBtn:  document.querySelector('.burger-menu-close'),
    menuBackdrop:  document.querySelector('.burger-menu'), 
    menuLinksList: document.querySelector('.content-list'),
    
    //Furniture elements
    furnitureCategoriesList: document.querySelector('.category-list'),
    furnitureFurnituresList: document.querySelector('.furniture-list'),
    furnitureLoadMoreBtn: document.querySelector('.load-more-button'),

    //Order modal elements
    orderBackdrop: document.querySelector('[data-backdrop-order]'),
    orderCloseBtn: document.querySelector('[data-backdrop-order-close]'),
    orderForm: document.querySelector('.form-modal'),
    orderLoader: document.querySelector('[data-loader-order]'),
}

export default refs;