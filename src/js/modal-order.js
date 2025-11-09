import refs from './refs';
import { handlerOrderBackdropClick, handlerOrderBackdropEscape, handlerOrderCloseBtn, handlerOrderSubmitForm } from './handlers';

// Відкриття модалки
function openOrderModal() {
  refs.orderBackdrop.classList.add('is-open');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', handlerOrderBackdropEscape);
  refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
  refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
  refs.orderForm.addEventListener('submit', handlerOrderSubmitForm);
}

// Закриття модалки
function closeOrderModal() {
  refs.orderBackdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handlerOrderBackdropEscape);
  refs.orderCloseBtn.removeEventListener('click', handlerOrderCloseBtn);
  refs.orderBackdrop.removeEventListener('click', handlerOrderBackdropClick); 
  refs.orderForm.removeEventListener('submit', handlerOrderSubmitForm);
}

// Валідація форми
function validateForm(form) {
  let isValid = true;

  const nameInput = form.querySelector('#user-name');
  const phoneInput = form.querySelector('#user-phone');

  // Скинути попередні стани
  form.querySelectorAll('.error-text').forEach(e => (e.style.opacity = 0));
  form.querySelectorAll('.form-input').forEach(i => i.classList.remove('invalid'));

  // Ім'я
  const namePattern = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'\-\s]{2,}$/;
  if (!namePattern.test(nameInput.value.trim())) {
    showError(nameInput, "Введіть коректне ім'я (лише літери, мінімум 2)");
    isValid = false;
  }

  // Телефон
  const phone = phoneInput.value.trim().replace(/\D/g, '');
  const phonePattern = /^[0-9]{12}$/;
  if (!phonePattern.test(phone)) {
    showError(phoneInput, 'Введіть коректний номер телефону (12 цифр, наприклад 380XXXXXXXXX)');
    isValid = false;
  }

  return isValid;
}

// Очистка форми
function clearForm() {
  refs.orderForm.reset();
  refs.orderForm.querySelectorAll('.error-text').forEach(e => (e.style.opacity = 0));
  refs.orderForm.querySelectorAll('.form-input').forEach(i => i.classList.remove('invalid'));
}

export { 
  openOrderModal,
  closeOrderModal,
  validateForm,
  clearForm
}