import refs from './refs';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
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
  const commentInput = form.querySelector('#user-comment');

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

  // Коментар
  const comment = commentInput.value.trim();
  if (comment.length > 0 && comment.length < 5) {
    showError(commentInput, 'Коментар має містити щонайменше 5 символів');
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

// Показати помилку
function showError(input, message) {
  const errorText = input.parentElement.querySelector('.error-text');
  input.classList.add('invalid');
  if (errorText) {
    errorText.textContent = message;
    errorText.style.opacity = 1;
  }
}

// Подія input, щоб прибирати помилки
function handleInputEvent(e) {
  const input = e.target;
  input.classList.remove('invalid');
  const errorText = input.parentElement.querySelector('.error-text');
  if (errorText) errorText.style.opacity = 0;
}

refs.orderForm.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('input', handleInputEvent);
});

async function handleOrderFormSubmit(e) {
  e.preventDefault();

  const submitBtn = refs.orderForm.querySelector('button[type="submit"]');
  const loader = refs.orderForm.querySelector('.loader');

  // Блокуємо кнопку і показуємо лоадер
  submitBtn.disabled = true;
  submitBtn.style.display = 'none';
  loader.style.display = 'block';

  // Тимчасово прибираємо закриття модалки
  refs.orderCloseBtn.removeEventListener('click', handlerOrderCloseBtn);
  refs.orderBackdrop.removeEventListener('click', handlerOrderBackdropClick);

  if (validateForm(refs.orderForm)) {
    const formData = {
      name: refs.orderForm.querySelector('#user-name').value.trim(),
      phone: refs.orderForm.querySelector('#user-phone').value.trim(),
      comment: refs.orderForm.querySelector('#user-comment').value.trim(),
    };

    try {
      const response = await axios.post(
        'https://furniture-store-v2.b.goit.study/api/orders',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Успішне пуш-повідомлення iziToast
      iziToast.success({
        title: 'Успіх!',
        message: `Замовлення №${response.data.orderNum} успішно створено.`,
        position: 'topRight',
      });

      clearForm();
      closeOrderModal();
    } catch (error) {
      const message = error.response?.data?.message || 'Сталася помилка при відправці. Спробуйте ще раз.';

      // Пуш-повідомлення помилки
      iziToast.error({
        title: 'Помилка',
        message,
        position: 'topRight',
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.display = 'block';
      loader.style.display = 'none';

      refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
      refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
    }
  } else {
    submitBtn.disabled = false;
    submitBtn.style.display = 'block';
    loader.style.display = 'none';

    refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
    refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
  }
}

export { 
  openOrderModal,
  closeOrderModal,
  validateForm,
  clearForm,
  handleOrderFormSubmit
};
