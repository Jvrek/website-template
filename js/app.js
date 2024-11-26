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

// Cenniki
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

// Newsletter Form Submission with Validation and Redirection
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('newsletter-form');
  const checkbox = document.getElementById('marketing-permissions');
  const errorMessage = document.getElementById('error-message');
  if (!form) {
    return;
  }
  form.addEventListener('submit', async function (event) {
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
      event.preventDefault(); // Prevent default form submission for async handling

      // Collect form data
      const formData = new FormData(form);

      try {
        // Send the form data using Fetch API
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          // If submission is successful, redirect to the success page
          window.location.href = 'newsletter-success-page.html';
        } else {
          // If there's an error, handle it appropriately
          const errorMessageContent = await response.text();
          console.error('Submission failed:', errorMessageContent);
          errorMessage.style.display = 'block';
          errorMessage.innerText =
            'Wystąpił błąd podczas wysyłania. Spróbuj ponownie.';
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Błąd połączenia. Spróbuj ponownie.';
      }
    }
  });
});
