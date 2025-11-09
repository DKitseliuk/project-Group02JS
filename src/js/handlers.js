import refs from './refs';
import { initialAccordion } from "./helpers";
import { openBurgerMenu, closeBurgerMenu } from './burger-menu';
import { getFurnitureCategories, getFurnitureFurnitures } from './furniture-api';
import { renderFurnitureCategories, renderFurnitureFurnitures } from './render-function';

let page = null;

async function initialHomePage() {
    page = 1;

    try {
        const categoriesArr = await getFurnitureCategories();
        const listArr = await getFurnitureFurnitures();
        renderFurnitureCategories(categoriesArr);
        renderFurnitureFurnitures(listArr.furnitures);
    } catch (error) {
        console.log(error.message);
    }

    initialAccordion();    
}

//#region ===== Menu handlers =====

function handlerMenuOpenBtn() {
    openBurgerMenu();
}

function handlerMenuCloseBtn() {
    closeBurgerMenu();
}

function handlerMenuBackdropClick(event) {
    if (event.target === refs.menuBackdrop) {
      closeBurgerMenu();
    }
}

function handlerMenuBackdropEscape(event) {    
    if (event.key === 'Escape') {
        closeBurgerMenu();
    }
};

function handlerMenuLinksList(event) {
     if (event.target.nodeName !== 'A') return;
      closeBurgerMenu();
}
//#endregion ===== Menu handlers =====

//#region ===== Furniture handlers =====

async function handlerFurnitureLoadMoreBtn() {
  page++;
  try {        
  } catch (error) {
    console.log(error.message);
  }
}

//#endregion ===== Furniture handlers =====


export {
    initialHomePage,

    //Export menu handlers
    handlerMenuOpenBtn,
    handlerMenuCloseBtn,
    handlerMenuBackdropClick,
    handlerMenuBackdropEscape,
    handlerMenuLinksList,

    //Export furniture handlers
    handlerFurnitureLoadMoreBtn
};


    
