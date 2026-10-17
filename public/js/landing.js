document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  initLandingPage();
  setupIntersectionObserver();
  setupNavbarScroll();
  
  // Auto-trigger smooth number animation on page load
  setTimeout(animateNumbers, 250);
  
  const hamburger = document.getElementById('hamburger-btn');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const nav = document.getElementById('nav-links');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = '#080F22';
      nav.style.padding = '1.25rem';
      nav.style.borderBottom = '1px solid #1A2A48';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
    });
  }
});

let currentCategory = 'All';

function initLandingPage() {
  const courses = window.AppData.courses;
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  
  const filtersContainer = document.getElementById('landing-filters');
  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map(cat => `
      <button class="chip ${cat === currentCategory ? 'active' : ''}" onclick="filterCourses('${cat}')">
        ${cat}
      </button>
    `).join('');
  }
  
  renderCoursesGrid();
}

function filterCourses(category) {
  currentCategory = category;
  initLandingPage(); // Re-render chips
  renderCoursesGrid();
}

function renderCoursesGrid() {
  const grid = document.getElementById('landing-courses-grid');
  if (!grid) return;
  const courses = window.AppData.courses;
  const filtered = currentCategory === 'All' ? courses : courses.filter(c => c.category === currentCategory);
  
  grid.innerHTML = filtered.map(c => renderCourseCard(c)).join('');
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Counter animation fallback
        if (entry.target.classList.contains('hero-stats') || entry.target.querySelector('.stat-number')) {
          animateNumbers();
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll, .hero-stats').forEach(el => observer.observe(el));
}

let numbersAnimated = false;
function animateNumbers() {
  if (numbersAnimated) return;
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  numbersAnimated = true;
  
  const duration = 1800; // 1.8s smooth duration
  const startTime = performance.now();

  function updateFrame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const currentVal = Math.floor(ease * target);
      counter.innerText = currentVal.toLocaleString('en-IN');
    });

    if (progress < 1) {
      requestAnimationFrame(updateFrame);
    } else {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        counter.innerText = target.toLocaleString('en-IN');
      });
    }
  }

  requestAnimationFrame(updateFrame);
}

function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
