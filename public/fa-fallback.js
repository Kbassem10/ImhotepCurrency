// Font Awesome Fallback Detection
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  ready(function() {
    // Check if Font Awesome loaded after a delay
    setTimeout(function() {
      checkFontAwesome();
    }, 1000);
  });
  
  function checkFontAwesome() {
    // Create a test element to check if Font Awesome loaded
    const testElement = document.createElement('i');
    testElement.className = 'fab fa-instagram';
    testElement.style.position = 'absolute';
    testElement.style.left = '-9999px';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);
    
    // Get computed styles
    const computedStyle = window.getComputedStyle(testElement, '::before');
    const content = computedStyle.getPropertyValue('content');
    
    // Clean up test element
    document.body.removeChild(testElement);
    
    // If Font Awesome didn't load properly, apply fallback class
    if (!content || content === 'none' || content === '""') {
      document.body.classList.add('fa-fallback');
      console.log('Font Awesome fallback activated');
    }
  }
})();
