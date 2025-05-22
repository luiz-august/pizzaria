/**
 * Pizza Background Animation
 * Enhances website visuals with animated pizza elements
 */
document.addEventListener('DOMContentLoaded', function () {
 // Create and animate floating pizza slices in the background on scroll
 const sections = document.querySelectorAll('section');

 // Only create pizza elements if we're not on mobile
 if (window.innerWidth > 768) {
  createPizzaElements();
 }

 // Listen for window resize to add/remove pizza elements based on screen size
 window.addEventListener(
  'resize',
  debounce(function () {
   const existingPizzas = document.querySelectorAll('.floating-pizza');

   // Remove existing pizzas
   existingPizzas.forEach((pizza) => pizza.remove());

   // Only create new pizza elements if we're not on mobile
   if (window.innerWidth > 768) {
    createPizzaElements();
   }
  }, 250)
 );

 // Function to create pizza elements throughout the page
 function createPizzaElements() {
  // Pizza ingredients for floating elements
  const pizzaIngredients = [
   { class: 'pepperoni', color: '#c82333', size: '15px' },
   { class: 'cheese', color: '#ffc107', size: '20px' },
   { class: 'olive', color: '#343a40', size: '10px' },
   { class: 'basil', color: '#28a745', size: '25px' },
   { class: 'mushroom', color: '#6c757d', size: '18px' },
  ];

  // Add pizza ingredients to each section except hero section
  sections.forEach((section, index) => {
   // Skip hero section
   if (index === 0) return;

   // Add 5-10 random pizza elements to each section
   const numElements = Math.floor(Math.random() * 6) + 5;

   for (let i = 0; i < numElements; i++) {
    // Get random ingredient
    const ingredient =
     pizzaIngredients[Math.floor(Math.random() * pizzaIngredients.length)];

    // Create pizza element
    const pizza = document.createElement('div');
    pizza.className = `floating-pizza ${ingredient.class}`;

    // Random position within the section
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Random rotation
    const rotation = Math.random() * 360;

    // Random animation duration
    const duration = Math.random() * 10 + 10;

    // Set styles
    pizza.style.cssText = `
                    position: absolute;
                    left: ${posX}%;
                    top: ${posY}%;
                    width: ${ingredient.size};
                    height: ${ingredient.size};
                    background-color: ${ingredient.color};
                    border-radius: 50%;
                    opacity: 0.6;
                    transform: rotate(${rotation}deg);
                    z-index: 1;
                    animation: floatAround ${duration}s infinite ease-in-out, 
                               rotate ${duration / 2}s infinite linear;
                    pointer-events: none;
                `;

    // Add to section
    section.appendChild(pizza);
   }
  });

  // Add keyframes for floating animation if not already added
  if (!document.getElementById('pizza-animations')) {
   const styleSheet = document.createElement('style');
   styleSheet.id = 'pizza-animations';

   const keyframes = `
                @keyframes floatAround {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(20px, -15px) rotate(90deg);
                    }
                    50% {
                        transform: translate(0, 30px) rotate(180deg);
                    }
                    75% {
                        transform: translate(-20px, -15px) rotate(270deg);
                    }
                }
                
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                .pepperoni {
                    border-radius: 50%;
                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                }
                
                .cheese {
                    clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
                }
                
                .olive {
                    border-radius: 50%;
                    box-shadow: inset 0 0 3px #fff;
                }
                
                .basil {
                    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
                    transform-origin: center;
                }
                
                .mushroom {
                    border-radius: 50% 50% 10% 10% / 50% 50% 10% 10%;
                }
            `;

   styleSheet.textContent = keyframes;
   document.head.appendChild(styleSheet);
  }
 }

 // Create background effects for the hero section
 enhanceHeroBackground();

 function enhanceHeroBackground() {
  const heroSection = document.querySelector('.hero');

  // Only enhance if we found the hero section
  if (!heroSection) return;

  // Add a subtle pizza pattern overlay
  const pizzaOverlay = document.createElement('div');
  pizzaOverlay.className = 'pizza-pattern-overlay';
  pizzaOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle, transparent 30%, #000 90%),
                              repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 2px,
                              transparent 2px, transparent 4px);
            z-index: 0;
            pointer-events: none;
        `;

  heroSection.appendChild(pizzaOverlay);

  // Add a subtle parallax effect on scroll
  window.addEventListener('scroll', function () {
   const scrollPosition = window.scrollY;

   if (isElementInViewport(heroSection)) {
    // Move background at different speeds for parallax effect
    heroSection.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
    pizzaOverlay.style.top = scrollPosition * 0.2 + 'px';
   }
  });
 }

 // Utility function to check if element is in viewport
 function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
   rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
   rect.bottom >= 0
  );
 }

 // Utility function to debounce function calls
 function debounce(func, wait) {
  let timeout;
  return function () {
   const context = this;
   const args = arguments;
   clearTimeout(timeout);
   timeout = setTimeout(function () {
    func.apply(context, args);
   }, wait);
  };
 }

 // Add animation to pizza chef in about section
 const pizzaChef = document.querySelector('.pizza-chef');
 if (pizzaChef) {
  // Add a subtle glow animation
  pizzaChef.style.animation = 'chef-glow 3s infinite alternate';

  // Add keyframes for chef animation
  const chefStyle = document.createElement('style');
  chefStyle.textContent = `
            @keyframes chef-glow {
                0% {
                    box-shadow: 0 0 10px rgba(231, 76, 60, 0.3);
                    transform: scale(1);
                }
                100% {
                    box-shadow: 0 0 20px rgba(231, 76, 60, 0.5);
                    transform: scale(1.02);
                }
            }
        `;
  document.head.appendChild(chefStyle);
 }
});
