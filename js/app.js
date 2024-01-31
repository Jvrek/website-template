import '../scss/main.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.querySelector('.mobile-nav');

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }
});

(function () {
  const carousels = function () {
    $('.owl-carousel1').owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        680: {
          items: 2,
          nav: false,
          loop: false,
        },
        1000: {
          items: 3,
          nav: true,
        },
      },
    });
  };

  (function ($) {
    carousels();
  })(jQuery);
})();
