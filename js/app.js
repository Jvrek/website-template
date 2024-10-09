import '../scss/main.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
var lastClicked;
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

jQuery(function ($) {
  var firstId = $('.category-list a').first().attr('href');
  $('.category-list li').first().addClass('active');
  $(firstId).show();
  lastClicked = firstId;

  $(document).on('click', '#scrollButton', function () {
    $('html, body').animate(
      {
        scrollTop: $('#scrollButton').offset().top,
      },
      1000,
    );
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
});

//cenniki
$('.category-list').on('click', 'a', function (e) {
  e.preventDefault();
  var targetId = $(this).attr('href');
  if (lastClicked === targetId) {
    return;
  }

  $('.category-list li').removeClass('active');
  $(this).parent().addClass('active');

  $(targetId).toggle('slow');
  $('.service-category').not(targetId).hide('slow');
  lastClicked = targetId;
});


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletter-form');
  const checkbox = document.getElementById('marketing-permissions');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', function(event) {
    // Check if the checkbox is not checked
    if (!checkbox.checked) {
      // Prevent form submission
      event.preventDefault();

      // Display the error message
      errorMessage.style.display = 'block';

      // Optionally, scroll to the error message
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Hide the error message if previously displayed
      errorMessage.style.display = 'none';

      // Allow form submission to proceed
      // No need to do anything here since the form will submit by default
    }
  });
});