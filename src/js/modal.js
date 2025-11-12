import { handlerFurnitureDetailsBackdropClick, handlerFurnitureDetailsBackdropEscape, handlerFurnitureDetailsCloseBtn, handlerFurnitureDetailsOrderBtn, handlerFurnitureDetailsSelectColor } from "./handlers";
import refs from "./refs";


function openFurnitureDetailsModal() {
  refs.furnitureDetailsBackdrop.classList.add('is-open');  
  document.body.classList.add('no-scroll');
  refs.furnitureDetailsImages.innerHTML = '';
  refs.furnitureDetailsInfo.innerHTML = '';
}


function furnitureDetailsModalAddListeners() {
  document.addEventListener('keydown', handlerFurnitureDetailsBackdropEscape);
  refs.furnitureDetailsCloseBtn.addEventListener('click', handlerFurnitureDetailsCloseBtn);
  refs.furnitureDetailsBackdrop.addEventListener('click', handlerFurnitureDetailsBackdropClick);
  refs.furnitureDetailsOrderBtn.addEventListener('click', handlerFurnitureDetailsOrderBtn);

  const colorsList = document.querySelector('.furniture-modal-colors');
  colorsList.addEventListener('click', handlerFurnitureDetailsSelectColor);
}


function closeFurnitureDetailsModal() {
  refs.furnitureDetailsBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');  
  document.removeEventListener('keydown', handlerFurnitureDetailsBackdropEscape);
  refs.furnitureDetailsCloseBtn.removeEventListener('click', handlerFurnitureDetailsCloseBtn);
  refs.furnitureDetailsBackdrop.removeEventListener('click', handlerFurnitureDetailsBackdropClick); 
  refs.furnitureDetailsOrderBtn.removeEventListener('click', handlerFurnitureDetailsOrderBtn);

  const colorsList = document.querySelector('.furniture-modal-colors');
  if(colorsList) {colorsList.removeEventListener('click', handlerFurnitureDetailsSelectColor);}
}


export { 
  openFurnitureDetailsModal,
  furnitureDetailsModalAddListeners,
  closeFurnitureDetailsModal,
};
