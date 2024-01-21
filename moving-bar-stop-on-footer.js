export function stopMovingBarAtFooter() {
  document.addEventListener('DOMContentLoaded', function () {
    const movingBar = document.querySelector('.moving-info-bar');
    const footer = document.querySelector('footer');
    
    window.addEventListener('scroll', function () {
      const footerRect = footer.getBoundingClientRect();
      const movingBarRect = movingBar.getBoundingClientRect();
  
      if (window.innerHeight - movingBarRect.height < footerRect.top) {
        // If the moving bar hasn't reached the footer
        movingBar.style.position = 'fixed';
        movingBar.style.bottom = '0';
      } else {
        // If the moving bar reaches the footer
        movingBar.style.position = 'absolute';
        movingBar.style.bottom = footerRect.height + 'px';
      }
    });
  });
  
}