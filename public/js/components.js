function renderBadge(text, type) {
  const typeClass = type ? `badge-${type}` : 'badge-primary';
  return `<span class="badge ${typeClass}">${text}</span>`;
}

function getBadgeType(badgeText) {
  const text = badgeText.toUpperCase();
  if (text.includes('POPULAR') || text.includes('TOP RATED')) return 'success';
  if (text.includes('TRENDING')) return 'primary';
  if (text.includes('BESTSELLER')) return 'primary';
  if (text.includes('SPECIAL') || text.includes('PRO')) return 'danger';
  return 'accent';
}

function renderCourseCard(course) {
  const badgeType = getBadgeType(course.badge);
  const enrolledIds = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
  const isEnrolled = enrolledIds.includes(course.id);
  const isLoggedIn = localStorage.getItem('pragvix_logged_in') === 'true';

  return `
    <div class="course-card" style="border-left-color: ${course.color}" onclick="showCourseDetail('${course.id}')">
      <div class="course-card-content">
        <div class="course-header-row">
          <span class="course-category-tag">
            <span class="material-icons" style="font-size: 13px; vertical-align: middle;">category</span>
            <span>${course.category}</span>
          </span>
          <div class="course-badge-container">
            ${isEnrolled && isLoggedIn 
              ? renderBadge('ENROLLED', 'success') 
              : (course.badge ? renderBadge(course.badge, badgeType) : '')}
          </div>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <span><span class="material-icons" style="font-size: 14px; vertical-align: middle;">schedule</span> ${course.durationHours}</span>
          <span class="meta-dot">•</span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-accent" style="font-size: 15px;">star</span>
            <strong style="color: #F8FAFC;">${course.rating}</strong>
            <span style="color: var(--text-muted); font-size: 0.8rem;">(${course.studentsEnrolled})</span>
          </span>
        </div>
        <div class="course-footer">
          <div>
            <span class="course-price">₹${course.price}</span>
            <span class="course-original-price">₹${course.originalPrice}</span>
          </div>
          ${isEnrolled && isLoggedIn ? `
            <button class="btn btn-outline btn-sm" style="color: #34D399; border-color: rgba(16, 185, 129, 0.5); display: flex; align-items: center; gap: 4px;" onclick="event.stopPropagation(); window.location.href='app.html#learn'">
              <span class="material-icons" style="font-size: 15px;">play_circle</span>
              <span>Go to Course</span>
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); handleBuyClick('${course.id}')">Buy Now</button>
          `}
        </div>
      </div>
    </div>
  `;
}

function showCourseDetail(courseId) {
  const course = window.AppData.courses.find(c => c.id === courseId);
  if (!course) return;
  
  const enrolledIds = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
  const isEnrolled = enrolledIds.includes(course.id);
  const isLoggedIn = localStorage.getItem('pragvix_logged_in') === 'true';

  const content = `
    <div class="course-detail-modal">
      <div class="flex items-center gap-4 mb-4">
        <div class="avatar avatar-lg" style="background: ${course.color}">
          <span class="material-icons">school</span>
        </div>
        <div>
          <h2 class="text-xl font-bold">${course.title}</h2>
          <p class="text-secondary">${course.category} • ${course.durationHours}</p>
        </div>
      </div>
      
      <p class="mb-6">${course.description}</p>
      
      <h3 class="font-bold mb-4">Syllabus Overview</h3>
      <div class="flex-col gap-2 mb-6">
        ${course.modules.map((m, i) => `
          <div class="card p-4 flex justify-between items-center" style="padding: 1rem;">
            <div class="flex items-center gap-2">
              <span class="badge badge-primary">${i+1}</span>
              <span class="font-medium">${m.title}</span>
            </div>
            <span class="text-sm text-secondary">${m.duration}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="card p-4 mb-6" style="background: rgba(2, 132, 199, 0.15); border-color: rgba(56, 189, 248, 0.35);">
        <h4 class="font-bold text-primary mb-2" style="color: #38BDF8;">Capstone Project</h4>
        <p style="color: #F8FAFC;">${course.capstoneTitle}</p>
      </div>
      
      <div class="flex justify-between items-center border-t pt-4" style="border-color: var(--card-border);">
        <div>
          <div class="text-2xl font-bold">₹${course.price}</div>
          <div class="text-sm text-secondary line-through">₹${course.originalPrice}</div>
        </div>
        ${isEnrolled && isLoggedIn ? `
          <button class="btn btn-accent btn-lg" onclick="window.location.href='app.html#learn'">
            <span class="material-icons" style="font-size: 20px;">play_circle</span>
            <span>Go to Course Classroom</span>
          </button>
        ` : `
          <button class="btn btn-primary btn-lg" onclick="handleBuyClick('${course.id}')">
            <span class="material-icons" style="font-size: 20px;">shopping_cart</span>
            <span>Enroll & Buy Now</span>
          </button>
        `}
      </div>
    </div>
  `;
  renderModal('', content, 'large');
}

function handleBuyClick(courseId) {
  const isLoggedIn = localStorage.getItem('pragvix_logged_in') === 'true';
  if (isLoggedIn) {
    // Enroll and redirect
    let enrolled = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      localStorage.setItem('pragvix_enrolled', JSON.stringify(enrolled));
    }
    renderToast('Enrolled successfully!');
    if(window.location.pathname.includes('app.html')){
      closeModal();
      loadAppTab('learn');
    } else {
      window.location.href = 'app.html#learn';
    }
  } else {
    showLoginModal(courseId);
  }
}

function renderModal(title, content, sizeClass = '') {
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" id="active-modal" onclick="closeModal(event)">
      <div class="modal-content ${sizeClass}" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closeModal()">&times;</button>
        ${title ? `<h2 class="modal-title">${title}</h2>` : ''}
        ${content}
      </div>
    </div>
  `;
}

function closeModal(e) {
  if (e && e.target.id !== 'active-modal') return;
  const overlay = document.getElementById('active-modal');
  if (overlay) {
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.parentElement.innerHTML = '';
    }, 300);
  }
}

function renderToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span class="material-icons ${type === 'error' ? 'text-danger' : 'text-secondary'}">
      ${type === 'error' ? 'error' : 'check_circle'}
    </span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderProgressBar(percentage) {
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${percentage}%"></div>
    </div>
  `;
}
