import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.querySelector('.mobile-nav');

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      this.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }
});
