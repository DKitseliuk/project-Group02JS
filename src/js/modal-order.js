import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const orderBackdrop = document.querySelector('[data-backdrop-order]');
const closeOrderBtn = document.querySelector('[data-backdrop-order-close]');
const orderForm = document.querySelector('.form-modal');
const loader = document.querySelector('.loader');

let currentModelId = null;
let currentColor = null;

// Відкриття / закриття модалки
export function openOrderModal(modelId, color) {
  currentModelId = modelId;
  currentColor = color;

  orderBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  orderBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

// Закриття модалки
closeOrderBtn.addEventListener('click', closeOrderModal);
orderBackdrop.addEventListener('click', e => {
  if (e.target === orderBackdrop) closeOrderModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !orderBackdrop.classList.contains('is-hidden')) {
    closeOrderModal();
  }
});

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

function showError(input, message) {
  const errorText = input.parentElement.querySelector('.error-text');
  input.classList.add('invalid');
  if (errorText) {
    errorText.textContent = message;
    errorText.style.opacity = 1;
  }
}

// Лоадер
function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

// Очистка форми
function clearForm() {
  orderForm.reset();
  orderForm.querySelectorAll('.error-text').forEach(e => (e.style.opacity = 0));
  orderForm.querySelectorAll('.form-input').forEach(i => i.classList.remove('invalid'));
}

// Сабміт форми
orderForm.addEventListener('submit', async e => {
  e.preventDefault();

  if (!validateForm(orderForm)) return;

  showLoader();

  const name = orderForm.elements['user-name'].value.trim();
  const phone = orderForm.elements['user-phone'].value.trim().replace(/\D/g, '');
  const comment = orderForm.elements['user-comment'].value.trim() || "Немає коментаря";

  const orderData = {
    name,
    phone,
    modelId: currentModelId || "682f9bbf8acbdf505592ac36", 
    color: currentColor || "#1212ca",                        
    comment,
  };

  try {
  const response = await axios.post(
    'https://furniture-store-v2.b.goit.study/api/orders',
    orderData,
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.log('Вся відповідь сервера:', response); 
  console.log('Тільки data:', response.data);     
    
  iziToast.success({
      title: 'Успіх!',
      message: `Замовлення №${response.data.orderNum} успішно створено.`,
      position: 'topRight',
    });

    clearForm();
    closeOrderModal();
  } catch (error) {
    let message = 'Сталася невідома помилка. Спробуйте ще раз.';
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    iziToast.error({
      title: 'Помилка',
      message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

