// Main JavaScript file for Pizzaria Delícia
document.addEventListener('DOMContentLoaded', function () {
 // Global variables
 let currentUser = null;
 let menuItems = [];

 // Initialize the website
 init();

 function init() {
  // Show loading screen for 2 seconds
  setTimeout(() => {
   document.querySelector('.loading-screen').classList.add('hidden');
  }, 2000);

  // Setup event listeners
  setupNavigation();
  setupMenuItems();
  setupAuthSystem();
  setupAnimations();
  setupContactForm();

  // Check if user is already logged in
  checkLoggedInUser();
 }

 // Navigation and header functionality
 function setupNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  const navItems = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   navLinks.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navItems.forEach((item) => {
   item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
   });
  });

  // Change header style on scroll
  window.addEventListener('scroll', () => {
   if (window.scrollY > 80) {
    header.classList.add('scrolled');
   } else {
    header.classList.remove('scrolled');
   }
  });
 }

 // Menu items setup and filtering
 function setupMenuItems() {
  // Menu items data - in a real application, this would come from a database
  menuItems = [
   {
    id: 1,
    name: 'Margherita',
    price: 'R$ 39,90',
    category: 'classicas',
    tag: 'Clássica',
    description:
     'Molho de tomate, mussarela fresca, manjericão e um toque de azeite extra virgem.',
    image:
     'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 2,
    name: 'Pepperoni',
    price: 'R$ 45,90',
    category: 'classicas',
    tag: 'Clássica',
    description: 'Molho de tomate, mussarela e pepperoni fatiado.',
    image:
     'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 3,
    name: 'Quatro Queijos',
    price: 'R$ 49,90',
    category: 'classicas',
    tag: 'Clássica',
    description:
     'Molho de tomate, mussarela, parmesão, provolone e gorgonzola.',
    image:
     'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 4,
    name: 'Portuguesa',
    price: 'R$ 47,90',
    category: 'classicas',
    tag: 'Clássica',
    description:
     'Molho de tomate, mussarela, presunto, ovos, cebola, ervilha e azeitona.',
    image:
     'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 5,
    name: 'Supreme Deluxe',
    price: 'R$ 59,90',
    category: 'especiais',
    tag: 'Especial',
    description:
     'Molho de tomate, mussarela, pepperoni, carne moída, pimentão, cebola roxa, champignon e azeitonas.',
    image:
     'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 6,
    name: 'Frutos do Mar',
    price: 'R$ 65,90',
    category: 'especiais',
    tag: 'Especial',
    description:
     'Molho de tomate, mussarela, camarão, lula, polvo e mexilhões temperados com ervas frescas.',
    image:
     'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 7,
    name: 'Nutella com Morango',
    price: 'R$ 49,90',
    category: 'doces',
    tag: 'Doce',
    description:
     'Nutella cremosa coberta com morangos frescos e açúcar de confeiteiro.',
    image:
     'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
   {
    id: 8,
    name: 'Banana com Canela',
    price: 'R$ 45,90',
    category: 'doces',
    tag: 'Doce',
    description:
     'Bananas caramelizadas, canela, açúcar mascavo e doce de leite.',
    image:
     'https://images.unsplash.com/photo-1611896153453-56538a947c9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
   },
  ];

  // Populate the menu grid with items
  const menuGrid = document.querySelector('.menu-grid');
  renderMenuItems('all');

  // Setup filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
   button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    // Filter menu items
    const category = button.getAttribute('data-category');
    renderMenuItems(category);
   });
  });

  // Function to render menu items based on selected category
  function renderMenuItems(category) {
   menuGrid.innerHTML = '';

   const filtered =
    category === 'all'
     ? menuItems
     : menuItems.filter((item) => item.category === category);

   filtered.forEach((item) => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';

    menuItem.innerHTML = `
                    <div class="menu-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="menu-info">
                        <span class="menu-tag">${item.tag}</span>
                        <div class="menu-title">
                            <h3>${item.name}</h3>
                            <span class="menu-price">${item.price}</span>
                        </div>
                        <p class="menu-desc">${item.description}</p>
                    </div>
                `;

    menuGrid.appendChild(menuItem);
   });
  }
 }

 // Authentication system (login/register)
 function setupAuthSystem() {
  const loginBtn = document.getElementById('login-btn');
  const authModal = document.getElementById('auth-modal');
  const closeModal = document.querySelector('.close-modal');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const logoutBtn = document.getElementById('logout-btn');

  // Open auth modal
  loginBtn.addEventListener('click', () => {
   authModal.classList.add('open');
  });

  // Close auth modal
  closeModal.addEventListener('click', () => {
   authModal.classList.remove('open');
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
   if (e.target === authModal) {
    authModal.classList.remove('open');
   }
  });

  // Switch between login and register tabs
  tabBtns.forEach((button) => {
   button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');

    // Remove active class from all buttons and tabs
    tabBtns.forEach((btn) => btn.classList.remove('active'));
    tabContents.forEach((tab) => tab.classList.remove('active'));

    // Add active class to current button and tab
    button.classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
   });
  });

  // Handle login form submission
  loginForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;
   const errorMsg = document.getElementById('login-error');

   // Get users from local storage
   const users = JSON.parse(localStorage.getItem('pizzariaUsers')) || [];

   // Find user with matching email and password
   const user = users.find((u) => u.email === email && u.password === password);

   if (user) {
    // Store logged in user
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Update UI to show logged in state
    updateUserState(user);

    // Close modal
    authModal.classList.remove('open');

    // Show success message
    showToast(`Bem-vindo de volta, ${user.name}!`, 'success');

    // Reset form
    loginForm.reset();
    errorMsg.textContent = '';
   } else {
    // Show error message
    errorMsg.textContent = 'Email ou senha incorretos. Tente novamente.';
   }
  });

  // Handle registration form submission
  registerForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const name = document.getElementById('register-name').value;
   const email = document.getElementById('register-email').value;
   const phone = document.getElementById('register-phone').value;
   const age = document.getElementById('register-age').value;
   const password = document.getElementById('register-password').value;
   const confirmPassword = document.getElementById(
    'register-confirm-password'
   ).value;
   const errorMsg = document.getElementById('register-error');
   const successMsg = document.getElementById('register-success');

   // Validate form
   if (password !== confirmPassword) {
    errorMsg.textContent = 'As senhas não conferem';
    successMsg.textContent = '';
    return;
   }

   // Get existing users or initialize empty array
   const users = JSON.parse(localStorage.getItem('pizzariaUsers')) || [];

   // Check if user already exists
   if (users.some((user) => user.email === email)) {
    errorMsg.textContent = 'Este email já está cadastrado';
    successMsg.textContent = '';
    return;
   }

   // Create new user object
   const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    age,
    password,
    registeredAt: new Date().toISOString(),
   };

   // Add user to array and save to localStorage
   users.push(newUser);
   localStorage.setItem('pizzariaUsers', JSON.stringify(users));

   // Show success message
   errorMsg.textContent = '';
   successMsg.textContent =
    'Cadastro realizado com sucesso! Você já pode fazer login.';

   // In a real application, you would also store this data to a server
   // For example, sending it to Google Drive as requested
   simulateSendingToExternalStorage(newUser);

   // Reset form after successful registration
   registerForm.reset();

   // Automatically switch to login tab after 2 seconds
   setTimeout(() => {
    document.querySelector('.tab-btn[data-tab="login"]').click();
    successMsg.textContent = '';
   }, 2000);
  });

  // Handle logout
  logoutBtn.addEventListener('click', () => {
   // Remove current user from localStorage
   localStorage.removeItem('currentUser');

   // Update UI
   updateUserState(null);

   // Show logout message
   showToast('Você foi desconectado com sucesso!', 'success');
  });
 }

 // Check if there is a logged in user and update the UI accordingly
 function checkLoggedInUser() {
  const userJSON = localStorage.getItem('currentUser');
  if (userJSON) {
   const user = JSON.parse(userJSON);
   updateUserState(user);
  }
 }

 // Update UI based on user login state
 function updateUserState(user) {
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.querySelector('.user-info');
  const userName = document.getElementById('user-name');

  if (user) {
   // User is logged in
   currentUser = user;
   loginBtn.classList.add('hidden');
   userInfo.classList.remove('hidden');
   userName.textContent = user.name.split(' ')[0]; // Display only first name
  } else {
   // User is logged out
   currentUser = null;
   loginBtn.classList.remove('hidden');
   userInfo.classList.add('hidden');
   userName.textContent = '';
  }
 }

 // Set up animations for page elements
 function setupAnimations() {
  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      entry.target.classList.add('show');
     }
    });
   },
   {
    threshold: 0.1,
   }
  );

  animatedElements.forEach((el) => {
   observer.observe(el);
  });
 }

 // Set up contact form
 function setupContactForm() {
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const name = document.getElementById('contact-name').value;
   const email = document.getElementById('contact-email').value;
   const message = document.getElementById('contact-message').value;

   // In a real application, you would send this data to a server
   console.log('Contact form submitted:', { name, email, message });

   // Show success message
   showToast(
    'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    'success'
   );

   // Reset form
   contactForm.reset();
  });
 }

 // Show toast notification
 function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.querySelector('.toast-message');
  const toastProgress = document.querySelector('.toast-progress');

  toastMessage.textContent = message;
  toast.className = type === 'error' ? 'toast error show' : 'toast show';

  // Reset animation
  toastProgress.style.transform = 'scaleX(0)';
  void toastProgress.offsetWidth; // Trigger reflow

  // Start progress animation
  toastProgress.style.transform = 'scaleX(1)';
  toastProgress.style.transition = 'transform 3s linear';

  // Hide toast after animation completes
  setTimeout(() => {
   toast.classList.remove('show');
  }, 3000);
 }

 // Simular o envio de dados do usuário para um armazenamento externo (como o Google Drive)
 function simulateSendingToExternalStorage(userData) {
  // Em uma aplicação real, você faria uma chamada à API do seu backend, // que então salvaria os dados no Google Drive ou em outro sistema de armazenamento.

  console.log('Simulating sending user data to external storage:', userData);

  // Crie um armazenamento "drive" no localStorage para simular um armazenamento externo.
  const driveStorage =
   JSON.parse(localStorage.getItem('pizzariaDriveStorage')) || {};

  // Organizar usuários por ID
  if (!driveStorage[userData.id]) {
   driveStorage[userData.id] = userData;
  }

  // Salve no armazenamento simulado "drive"
  localStorage.setItem('pizzariaDriveStorage', JSON.stringify(driveStorage));

  console.log('User data saved to simulated external storage');
 }
});
