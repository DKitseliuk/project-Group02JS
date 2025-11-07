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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const raterElement = document.querySelector('#my-rater');

  if (raterElement) {
    const starRating = new StarRating(raterElement, {
      max: 5,
      rating: 4.5, // Initial rating
      step: 0.5, // Half-star support
      readOnly: false,
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
});
