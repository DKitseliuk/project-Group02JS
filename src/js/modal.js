import { getFurnitureById } from './furniture-api.js';

// Custom Star Rating Component
class StarRating {
  constructor(container, options = {}) {
    this.container = container;
    this.maxStars = options.max || 5;
    this.currentRating = options.rating || 0;
    this.step = options.step || 0.5;
    this.readOnly = options.readOnly || false;
    this.onChange = options.onChange || null;

    this.init();
  }

  init() {
    this.container.classList.add('star-rating-container');
    this.container.innerHTML = '';

    // Create stars
    for (let i = 1; i <= this.maxStars; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.dataset.value = i;
      this.container.appendChild(star);
    }

    // Add event listeners if not read-only
    if (!this.readOnly) {
      this.container.addEventListener('click', this.handleClick.bind(this));
      this.container.addEventListener('mousemove', this.handleHover.bind(this));
      this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    this.setRating(this.currentRating);
  }

  handleClick(e) {
    const star = e.target.closest('.star');
    if (!star) return;

    const starValue = parseFloat(star.dataset.value);
    const rect = star.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const starWidth = rect.width;

    // Determine if click is on left half (half star) or right half (full star)
    let rating;
    if (this.step === 0.5 && clickX < starWidth / 2) {
      rating = starValue - 0.5;
    } else {
      rating = starValue;
    }

    this.setRating(rating);

    if (this.onChange) {
      this.onChange(rating);
    }
  }

  handleHover(e) {
    const star = e.target.closest('.star');
    if (!star) return;

    const starValue = parseFloat(star.dataset.value);
    const rect = star.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const starWidth = rect.width;

    // Preview rating on hover
    let previewRating;
    if (this.step === 0.5 && hoverX < starWidth / 2) {
      previewRating = starValue - 0.5;
    } else {
      previewRating = starValue;
    }

    this.renderStars(previewRating);
  }

  handleMouseLeave() {
    this.renderStars(this.currentRating);
  }

  setRating(rating) {
    this.currentRating = Math.min(Math.max(rating, 0), this.maxStars);
    this.renderStars(this.currentRating);
  }

  renderStars(rating) {
    const stars = this.container.querySelectorAll('.star');
    stars.forEach((star, index) => {
      const starValue = index + 1;
      star.classList.remove('full', 'half', 'empty');

      if (rating >= starValue) {
        star.classList.add('full');
      } else if (rating >= starValue - 0.5) {
        star.classList.add('half');
      } else {
        star.classList.add('empty');
      }
    });
  }

  getRating() {
    return this.currentRating;
  }
}

/**
 * Populate modal with furniture data
 * @param {FurnitureModel} furniture - Furniture data model
 */
function populateModal(furniture) {
  // Update main image
  const mainImg = document.querySelector('.product_modal_img > img');
  if (mainImg && furniture.getMainImage()) {
    mainImg.src = furniture.getMainImage();
    mainImg.alt = furniture.name;
  }

  // Update additional images
  const additionalImgs = document.querySelectorAll('.product_modal_img_horizontal img');
  const additionalImages = furniture.getAdditionalImages();
  additionalImgs.forEach((img, index) => {
    if (additionalImages[index]) {
      img.src = additionalImages[index];
      img.alt = `${furniture.name} ${index + 2}`;
    }
  });

  // Update text content
  const nameEl = document.querySelector('.product_modal_name');
  if (nameEl) nameEl.textContent = furniture.name;

  const categoryEl = document.querySelector('.product_modal_category');
  if (categoryEl) categoryEl.textContent = furniture.getCategoryName();

  const priceEl = document.querySelector('.price_number');
  if (priceEl) priceEl.textContent = furniture.getFormattedPrice();

  const descriptionEl = document.querySelector('.modal_description');
  if (descriptionEl) descriptionEl.textContent = furniture.description;

  const sizeEl = document.querySelector('.product_modal_size');
  if (sizeEl) sizeEl.textContent = `Розміри: ${furniture.sizes}`;

  // Update star rating
  if (window.starRating) {
    window.starRating.setRating(furniture.rate);
  }

  // Update color circles
  const colorCircles = document.querySelectorAll('.product_color_circle');
  colorCircles.forEach((circle, index) => {
    if (furniture.color[index]) {
      circle.style.backgroundColor = furniture.color[index];
      circle.style.display = '';
    } else {
      // Hide unused color circles
      circle.style.display = 'none';
    }
  });
}

/**
 * Open modal and load furniture data
 * @param {string} furnitureId - Furniture ID
 */
async function openFurnitureModal(furnitureId) {
  const backdrop = document.querySelector('[data-backdrop-furniture-details]');

  if (!backdrop) {
    console.error('Modal backdrop not found');
    return;
  }

  try {
    // Show modal with loading state
    backdrop.classList.add('is-open');

    // Fetch furniture data
    const furniture = await getFurnitureById(furnitureId);

    // Populate modal with data
    populateModal(furniture);

  } catch (error) {
    console.error('Failed to load furniture details:', error);
    // Close modal on error
    backdrop.classList.remove('is-open');
    alert('Не вдалося завантажити деталі меблів. Спробуйте ще раз.');
  }
}

/**
 * Close modal
 */
function closeFurnitureModal() {
  const backdrop = document.querySelector('[data-backdrop-furniture-details]');
  if (backdrop) {
    backdrop.classList.remove('is-open');
  }
}

/**
 * Initialize modal handlers
 */
function initFurnitureModal() {
  // Listen for clicks on furniture items
  document.addEventListener('click', (e) => {
    const furnitureCard = e.target.closest('[data-furniture-id]');
    if (furnitureCard) {
      e.preventDefault();
      const furnitureId = furnitureCard.dataset.furnitureId;
      openFurnitureModal(furnitureId);
    }
  });

  // Close button handler
  const closeBtn = document.querySelector('.product_modal_close');
  closeBtn?.addEventListener('click', closeFurnitureModal);

  // Backdrop click handler (click outside modal to close)
  const backdrop = document.querySelector('[data-backdrop-furniture-details]');
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeFurnitureModal();
    }
  });

  // ESC key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFurnitureModal();
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const raterElement = document.querySelector('#my-rater');

  if (raterElement) {
    const starRating = new StarRating(raterElement, {
      max: 5,
      rating: 4.5, // Initial rating
      step: 0.5, // Half-star support
      readOnly: true, // Read-only in modal (display only)
      onChange: (rating) => {
        console.log('New rating:', rating);
        // Add your callback logic here (e.g., send to API)
      },
    });

    // Global function to update rating from API
    window.updateRating = (newRating) => {
      starRating.setRating(newRating);
    };

    // Make accessible globally if needed
    window.starRating = starRating;
  }

  // Initialize furniture modal
  initFurnitureModal();
});
