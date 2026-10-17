function renderHomeTab(container) {
  const student = window.AppData.currentStudent;
  const enrolledIds = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
  const enrolledCourses = window.AppData.courses.filter(c => enrolledIds.includes(c.id));
  
  const html = `
    <div class="animate-fadeIn">
      
      <!-- Welcome Hero Box -->
      <div class="card mb-6" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(8, 15, 34, 0.9) 100%); border-color: rgba(56, 189, 248, 0.4);">
        <div class="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div class="badge badge-primary mb-2">Student Dashboard</div>
            <h1 class="text-2xl font-bold mb-1" style="color: #FFFFFF;">Welcome back, ${student.name}! 👋</h1>
            <p class="text-secondary text-sm">
              Enrolled in ${student.degree} (${student.college}) • All systems operational.
            </p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button class="btn btn-outline btn-sm" onclick="window.location.hash='learn'">
              <span class="material-icons" style="font-size: 16px;">play_circle</span>
              <span>My Courses</span>
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='courses'">
              <span class="material-icons" style="font-size: 16px;">explore</span>
              <span>Explore Courses</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 4 Stats Boxes Row -->
      <div class="stats-row animate-slideUp mb-6" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));">
        <div class="stats-card">
          <div class="stats-icon"><span class="material-icons">menu_book</span></div>
          <div class="stats-info">
            <h3>${enrolledIds.length}</h3>
            <p>Active Courses</p>
          </div>
        </div>
        
        <div class="stats-card">
          <div class="stats-icon" style="color: #34D399; background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3);">
            <span class="material-icons">workspace_premium</span>
          </div>
          <div class="stats-info">
            <h3>${student.certificates ? student.certificates.length : 2}</h3>
            <p>Certificates Earned</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon" style="color: #FBBF24; background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.3);">
            <span class="material-icons">account_balance_wallet</span>
          </div>
          <div class="stats-info">
            <h3>₹${window.AppData.walletBalance}</h3>
            <p>Reward Wallet</p>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon" style="color: #C084FC; background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.3);">
            <span class="material-icons">support_agent</span>
          </div>
          <div class="stats-info">
            <h3 style="font-size: 1.25rem;">Live 1-on-1</h3>
            <p>Mentor Desk Active</p>
          </div>
        </div>
      </div>
      
      <!-- Continue Learning Section Box -->
      <div class="card mb-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-bold" style="color: #FFFFFF;">In-Progress Tracks</h2>
            <p class="text-xs text-secondary">Pick up right where you left off with real-time video lectures.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.location.hash='learn'">View All</button>
        </div>

        ${enrolledCourses.length > 0 ? `
          <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
            ${enrolledCourses.map(c => `
              <div class="card p-4 flex flex-col justify-between" style="background: rgba(8, 15, 34, 0.85); border-color: rgba(56, 189, 248, 0.3); padding: 1.25rem;">
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <div class="avatar" style="background: ${c.color}; width: 44px; height: 44px;">
                      <span class="material-icons">play_circle</span>
                    </div>
                    <div style="flex: 1; overflow: hidden;">
                      <h4 class="font-bold text-sm" style="color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.title}</h4>
                      <p class="text-xs text-secondary">Module 2 of ${c.modules.length} Completed</p>
                    </div>
                  </div>
                  
                  <div class="flex justify-between text-xs text-secondary mb-1">
                    <span>Progress</span>
                    <span class="text-primary font-bold">50%</span>
                  </div>
                  ${renderProgressBar(50)}
                </div>

                <div class="mt-4 pt-3 border-t flex justify-between items-center" style="border-color: var(--card-border);">
                  <span class="text-xs text-muted">${c.durationHours}</span>
                  <button class="btn btn-primary btn-sm" onclick="window.location.hash='learn'">
                    <span>Resume Module</span>
                    <span class="material-icons" style="font-size: 14px;">arrow_forward</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-8">
            <span class="material-icons text-4xl text-muted mb-2">school</span>
            <h3 class="text-base font-bold mb-1" style="color: #FFFFFF;">No Courses Enrolled Yet</h3>
            <p class="text-secondary text-xs mb-4">Browse through our practical engineering tracks to begin.</p>
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='courses'">Browse Catalog</button>
          </div>
        `}
      </div>

      <!-- Quick Platform Actions Box Grid -->
      <div class="grid mb-6" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        <div class="card cursor-pointer" onclick="openEditProfileModal()">
          <div class="flex items-center gap-3">
            <span class="material-icons text-primary" style="font-size: 32px;">badge</span>
            <div>
              <h4 class="font-bold text-sm" style="color: #FFFFFF;">Manage Student Profile</h4>
              <p class="text-xs text-secondary">Update personal info, college details & degree.</p>
            </div>
          </div>
        </div>

        <div class="card cursor-pointer" onclick="window.location.hash='learn'">
          <div class="flex items-center gap-3">
            <span class="material-icons text-primary" style="font-size: 32px; color: var(--primary-light);">play_lesson</span>
            <div>
              <h4 class="font-bold text-sm" style="color: #FFFFFF;">Interactive Course Classroom</h4>
              <p class="text-xs text-secondary">Watch video lectures, view syllabus & submit assignments.</p>
            </div>
          </div>
        </div>

        <div class="card cursor-pointer" onclick="window.location.hash='careers'">
          <div class="flex items-center gap-3">
            <span class="material-icons text-success" style="font-size: 32px;">work</span>
            <div>
              <h4 class="font-bold text-sm" style="color: #FFFFFF;">Startup Career Board</h4>
              <p class="text-xs text-secondary">Explore internship and full-time hiring openings.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `;
  container.innerHTML = html;
}
