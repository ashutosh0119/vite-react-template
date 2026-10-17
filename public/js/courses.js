function renderCoursesTab(container) {
  const enrolledIds = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
  
  const html = `
    <div class="animate-fadeIn">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">All Courses</h1>
        <div class="search-bar" style="width: 300px">
          <span class="material-icons text-secondary">search</span>
          <input type="text" placeholder="Search courses..." id="course-search">
        </div>
      </div>
      
      <div class="courses-grid" id="all-courses-grid">
        ${window.AppData.courses.map(c => {
          const isEnrolled = enrolledIds.includes(c.id);
          const courseCopy = {...c};
          if (isEnrolled) courseCopy.badge = 'ENROLLED';
          return renderCourseCard(courseCopy);
        }).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
  
  const searchInput = document.getElementById('course-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      const grid = document.getElementById('all-courses-grid');
      const filtered = window.AppData.courses.filter(c => c.title.toLowerCase().includes(val));
      
      grid.innerHTML = filtered.map(c => {
        const isEnrolled = enrolledIds.includes(c.id);
        const courseCopy = {...c};
        if (isEnrolled) courseCopy.badge = 'ENROLLED';
        return renderCourseCard(courseCopy);
      }).join('');
    });
  }
}
