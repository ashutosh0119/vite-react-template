document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuthState()) {
    window.location.href = 'index.html';
    return;
  }
  
  // Initialize enrolled courses from localStorage if not present
  if (!localStorage.getItem('pragvix_enrolled')) {
    localStorage.setItem('pragvix_enrolled', JSON.stringify(window.AppData.enrolledCourseIds));
  }
  
  setupRouter();
  
  // Mobile sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  
  window.toggleSidebar = function() {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
  };
  
  overlay.addEventListener('click', toggleSidebar);
});

function setupRouter() {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'home';
    loadAppTab(hash);
  };
  
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

function loadAppTab(tabId) {
  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${tabId}`) {
      item.classList.add('active');
    }
  });
  
  const contentArea = document.getElementById('app-content');
  
  // Fade out, load content, fade in
  contentArea.style.opacity = '0';
  setTimeout(() => {
    switch (tabId) {
      case 'home': renderHomeTab(contentArea); break;
      case 'courses': renderCoursesTab(contentArea); break;
      case 'learn': renderLearnTab(contentArea); break;
      case 'downloads': window.location.hash = 'learn'; return;
      case 'careers': renderCareersTab(contentArea); break;
      case 'profile': renderProfileTab(contentArea); break;
      default: renderHomeTab(contentArea); break;
    }
    contentArea.style.opacity = '1';
    contentArea.style.transition = 'opacity 0.3s ease-in';
  }, 150);
}
