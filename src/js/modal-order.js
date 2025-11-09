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

// Подія input,щоб прибирати помилки під час редагування
refs.orderForm.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
    const errorText = input.parentElement.querySelector('.error-text');
    if (errorText) errorText.style.opacity = 0;
  });
});

// Обгортка для сабміту з лоадером та блокуванням закриття
refs.orderForm.addEventListener('submit', async (e) => {
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

  // Валідація
  if (validateForm(refs.orderForm)) {
    const formData = {
      name: refs.orderForm.querySelector('#user-name').value.trim(),
      phone: refs.orderForm.querySelector('#user-phone').value.trim(),
      comment: refs.orderForm.querySelector('#user-comment').value.trim(),
    };

    try {
      // Відправка POST-запиту
      const response = await axios.post('/api/orders', formData);
      console.log('Відповідь сервера:', response.data);

      clearForm();

      // Відновлюємо кнопку і ховаємо лоадер
      submitBtn.disabled = false;
      submitBtn.style.display = 'block';
      loader.style.display = 'none';

      // Відновлюємо слухачі закриття
      refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
      refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);

      closeOrderModal();
    } catch (error) {
      console.error('Помилка при відправці:', error);

      // Відновлюємо кнопку та лоадер
      submitBtn.disabled = false;
      submitBtn.style.display = 'block';
      loader.style.display = 'none';

      refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
      refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);

      alert('Сталася помилка при відправці. Спробуйте ще раз.');
    }
  } else {
    
    // Повертаємо кнопку та слухачі якщо не валідна форма 
    submitBtn.disabled = false;
    submitBtn.style.display = 'block';
    loader.style.display = 'none';

    refs.orderCloseBtn.addEventListener('click', handlerOrderCloseBtn);
    refs.orderBackdrop.addEventListener('click', handlerOrderBackdropClick);
  }
});

export { 
  openOrderModal,
  closeOrderModal,
  validateForm,
  clearForm
};
