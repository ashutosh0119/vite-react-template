// Pragvix Learn — Interactive Course Classroom & Learning Management System
let currentClassroomState = {
  courseId: null,
  activeModuleIndex: 0,
  isPlaying: false,
  currentTimeSeconds: 420,
  totalDurationSeconds: 1800,
  playbackSpeed: 1.0,
  activeTab: 'overview' // 'overview' | 'assignment' | 'mentor'
};

function renderLearnTab(container) {
  const enrolledIds = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
  const enrolledCourses = window.AppData.courses.filter(c => enrolledIds.includes(c.id));
  
  if (enrolledCourses.length === 0) {
    container.innerHTML = `
      <div class="card text-center py-16 animate-fadeIn" style="max-width: 600px; margin: 3rem auto;">
        <div class="avatar avatar-lg mx-auto mb-4" style="background: rgba(2, 132, 199, 0.15); border: 2px solid rgba(56, 189, 248, 0.4); color: var(--primary-light); width: 80px; height: 80px; margin: 0 auto 1.25rem;">
          <span class="material-icons" style="font-size: 38px;">school</span>
        </div>
        <h2 class="text-2xl font-bold mb-2" style="color: #FFFFFF;">No Courses Enrolled Yet</h2>
        <p class="text-secondary mb-6 text-sm">You haven't enrolled in any engineering track yet. Browse our hands-on course catalog to start learning with 1-on-1 mentorship.</p>
        <button class="btn btn-primary btn-lg" onclick="window.location.hash='courses'">
          <span class="material-icons">explore</span>
          <span>Explore All Courses</span>
        </button>
      </div>
    `;
    return;
  }
  
  const html = `
    <div class="animate-fadeIn">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-2xl font-bold mb-1" style="color: #FFFFFF;">My Active Learning Tracks</h1>
          <p class="text-secondary text-sm">Select any course to enter your interactive video classroom, track syllabus completion, and chat with your mentor.</p>
        </div>
        <div class="badge badge-success flex items-center gap-1">
          <span class="material-icons" style="font-size: 14px;">verified</span>
          <span>${enrolledCourses.length} Track${enrolledCourses.length > 1 ? 's' : ''} In Progress</span>
        </div>
      </div>
      
      <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem;">
        ${enrolledCourses.map(course => {
          const watchedModules = getWatchedModules(course.id, course.modules.length);
          const completionPct = Math.round((watchedModules.length / course.modules.length) * 100);
          
          return `
            <div class="card flex flex-col justify-between" style="border-left: 4px solid ${course.color}; background: rgba(13, 24, 50, 0.9);">
              <div>
                <div class="flex justify-between items-start mb-3">
                  <span class="course-category-tag" style="max-width: 70%;">
                    <span class="material-icons" style="font-size: 13px; vertical-align: middle;">category</span>
                    <span>${course.category}</span>
                  </span>
                  <span class="badge ${completionPct === 100 ? 'badge-success' : 'badge-primary'}">
                    ${completionPct === 100 ? 'Completed' : `${completionPct}% Done`}
                  </span>
                </div>
                
                <h3 class="font-bold text-lg mb-2" style="color: #FFFFFF; line-height: 1.4;">${course.title}</h3>
                
                <div class="flex justify-between text-xs text-secondary mb-2">
                  <span>Syllabus Watched: <strong>${watchedModules.length} of ${course.modules.length} Lessons</strong></span>
                  <span class="text-primary font-bold">${completionPct}%</span>
                </div>
                ${renderProgressBar(completionPct)}
                
                <!-- Quick Modules Preview List -->
                <div class="mt-4 flex-col gap-2">
                  ${course.modules.slice(0, 3).map((m, i) => {
                    const isWatched = watchedModules.includes(i);
                    return `
                      <div class="flex items-center gap-3 p-2 rounded cursor-pointer transition" 
                           style="background: rgba(8, 15, 34, 0.6); border: 1px solid rgba(26, 42, 72, 0.5); margin-bottom: 0.35rem;" 
                           onclick="openCoursePlayer('${course.id}', ${i})">
                        <span class="material-icons" style="color: ${isWatched ? '#34D399' : 'var(--primary-light)'}; font-size: 20px;">
                          ${isWatched ? 'check_circle' : 'play_circle'}
                        </span>
                        <div class="flex-1 overflow-hidden">
                          <div class="font-medium text-xs truncate" style="color: #FFFFFF;">${i + 1}. ${m.title}</div>
                          <div class="text-xs text-muted" style="font-size: 0.7rem;">${m.duration}</div>
                        </div>
                        <span class="material-icons text-muted" style="font-size: 16px;">chevron_right</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
              
              <div class="mt-4 pt-3 border-t flex justify-between items-center" style="border-color: var(--card-border);">
                <span class="text-xs text-secondary flex items-center gap-1">
                  <span class="material-icons" style="font-size: 14px; color: #34D399;">support_agent</span>
                  <span>1-on-1 Mentor Ready</span>
                </span>
                <button class="btn btn-primary btn-sm flex items-center gap-1" onclick="openCoursePlayer('${course.id}', 0)">
                  <span>Continue Course</span>
                  <span class="material-icons" style="font-size: 16px;">arrow_forward</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

// --------------------------------------------------------------------
// FULL COURSE CLASSROOM & VIDEO PLAYER BACKEND
// --------------------------------------------------------------------
function openCoursePlayer(courseId, initialModuleIndex = 0) {
  const course = window.AppData.courses.find(c => c.id === courseId);
  if (!course) return;

  currentClassroomState.courseId = courseId;
  currentClassroomState.activeModuleIndex = initialModuleIndex;
  currentClassroomState.isPlaying = false;
  currentClassroomState.currentTimeSeconds = 345;
  currentClassroomState.totalDurationSeconds = 1800;
  
  renderClassroomView();
}

function renderClassroomView() {
  const container = document.getElementById('app-content');
  if (!container) return;

  const course = window.AppData.courses.find(c => c.id === currentClassroomState.courseId);
  if (!course) return;

  const watchedModules = getWatchedModules(course.id, course.modules.length);
  const activeModule = course.modules[currentClassroomState.activeModuleIndex] || course.modules[0];
  const isCurrentModuleWatched = watchedModules.includes(currentClassroomState.activeModuleIndex);
  const completionPct = Math.round((watchedModules.length / course.modules.length) * 100);
  
  // Stored assignments and chats
  const assignmentData = getStoredAssignment(course.id);
  const chatMessages = getStoredChat(course.id);

  const html = `
    <div class="classroom-container animate-fadeIn">
      
      <!-- Top Navigation & Classroom Breadcrumb Bar -->
      <div class="classroom-header">
        <div class="flex items-center gap-3 flex-wrap">
          <button class="btn btn-outline btn-sm flex items-center gap-1" onclick="renderLearnTab(document.getElementById('app-content'))">
            <span class="material-icons" style="font-size: 16px;">arrow_back</span>
            <span>Back to My Courses</span>
          </button>
          <div class="flex items-center gap-2 text-sm text-secondary">
            <span>Classroom</span>
            <span>/</span>
            <span class="text-primary font-semibold">${course.title}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <div class="badge badge-success flex items-center gap-1">
            <span class="material-icons" style="font-size: 14px;">school</span>
            <span>${watchedModules.length}/${course.modules.length} Completed (${completionPct}%)</span>
          </div>
          <div class="badge badge-primary flex items-center gap-1">
            <span class="material-icons" style="font-size: 14px; color: #34D399;">online_prediction</span>
            <span>Mentor Online: Er. Vikram Aditya</span>
          </div>
        </div>
      </div>

      <!-- Main Classroom 2-Column Grid -->
      <div class="classroom-grid">
        
        <!-- LEFT COLUMN: Interactive Video Player & Workspace -->
        <div>
          <!-- Video Player Box -->
          <div class="video-player-frame">
            <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80" alt="Video Background" class="video-player-bg">
            
            <div class="video-canvas-overlay">
              <!-- Top bar on video -->
              <div class="video-top-bar">
                <span class="badge badge-primary" style="background: rgba(2, 6, 17, 0.8); backdrop-filter: blur(8px);">
                  Lesson ${currentClassroomState.activeModuleIndex + 1}: ${activeModule.title}
                </span>
                <span class="text-xs text-white" style="background: rgba(0,0,0,0.6); padding: 0.25rem 0.6rem; border-radius: 6px;">
                  1080p Full HD
                </span>
              </div>

              <!-- Center Big Play Button -->
              <div class="video-center-play" onclick="togglePlayState()">
                <span class="material-icons" style="font-size: 44px;">
                  ${currentClassroomState.isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </div>

              <!-- Bottom Controls Bar -->
              <div class="video-controls-bar">
                <!-- Seek Bar Track -->
                <div class="video-seek-track" onclick="handleSeek(event)">
                  <div class="video-seek-fill" style="width: ${(currentClassroomState.currentTimeSeconds / currentClassroomState.totalDurationSeconds) * 100}%;"></div>
                </div>

                <!-- Control Buttons -->
                <div class="video-buttons-row">
                  <div class="flex items-center gap-3">
                    <button class="btn btn-sm" style="background: transparent; border: none; color: #FFFFFF; padding: 0; cursor: pointer;" onclick="togglePlayState()">
                      <span class="material-icons">${currentClassroomState.isPlaying ? 'pause' : 'play_arrow'}</span>
                    </button>
                    <span style="font-family: monospace; font-size: 0.8rem;">
                      ${formatTime(currentClassroomState.currentTimeSeconds)} / ${formatTime(currentClassroomState.totalDurationSeconds)}
                    </span>
                  </div>

                  <div class="flex items-center gap-3">
                    <!-- Playback Speed -->
                    <button class="btn btn-outline btn-sm" style="padding: 0.15rem 0.5rem; font-size: 0.75rem; color: #FFFFFF; border-color: rgba(255,255,255,0.3);" onclick="cyclePlaybackSpeed()">
                      ${currentClassroomState.playbackSpeed}x Speed
                    </button>
                    <button class="btn btn-sm" style="background: transparent; border: none; color: #FFFFFF; padding: 0; cursor: pointer;" onclick="renderToast('Audio volume set to 100%')">
                      <span class="material-icons">volume_up</span>
                    </button>
                    <button class="btn btn-sm" style="background: transparent; border: none; color: #FFFFFF; padding: 0; cursor: pointer;" onclick="renderToast('Fullscreen toggle')">
                      <span class="material-icons">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Sub-Action Bar -->
          <div class="card mt-3 p-4 flex justify-between items-center flex-wrap gap-3" style="background: rgba(8, 15, 34, 0.95); border-color: rgba(56, 189, 248, 0.25); padding: 1rem 1.25rem;">
            <div>
              <h3 class="font-bold text-base" style="color: #FFFFFF;">${activeModule.title}</h3>
              <p class="text-xs text-secondary">Duration: ${activeModule.duration} • Track: ${course.title}</p>
            </div>
            
            <div class="flex items-center gap-2 flex-wrap">
              <button class="btn ${isCurrentModuleWatched ? 'btn-success' : 'btn-outline'} btn-sm flex items-center gap-1" onclick="toggleModuleWatched('${course.id}', ${currentClassroomState.activeModuleIndex})">
                <span class="material-icons" style="font-size: 16px;">${isCurrentModuleWatched ? 'check_circle' : 'check'}</span>
                <span>${isCurrentModuleWatched ? 'Marked as Watched' : 'Mark Lesson Watched'}</span>
              </button>
              
              <button class="btn btn-primary btn-sm flex items-center gap-1" onclick="goToNextLesson('${course.id}')" ${currentClassroomState.activeModuleIndex >= course.modules.length - 1 ? 'disabled style="opacity: 0.5;"' : ''}>
                <span>Next Lesson</span>
                <span class="material-icons" style="font-size: 16px;">skip_next</span>
              </button>
            </div>
          </div>

          <!-- Classroom Navigation Tabs -->
          <div class="classroom-nav-tabs">
            <button class="classroom-tab-btn ${currentClassroomState.activeTab === 'overview' ? 'active' : ''}" onclick="switchClassroomTab('overview')">
              <span class="material-icons" style="font-size: 18px;">description</span>
              <span>Lesson Notes</span>
            </button>
            <button class="classroom-tab-btn ${currentClassroomState.activeTab === 'assignment' ? 'active' : ''}" onclick="switchClassroomTab('assignment')">
              <span class="material-icons" style="font-size: 18px;">assignment_turned_in</span>
              <span>Submit Assignment</span>
              ${assignmentData.isSubmitted ? '<span class="badge badge-success" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Submitted</span>' : '<span class="badge badge-accent" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Pending</span>'}
            </button>
            <button class="classroom-tab-btn ${currentClassroomState.activeTab === 'mentor' ? 'active' : ''}" onclick="switchClassroomTab('mentor')">
              <span class="material-icons" style="font-size: 18px;">support_agent</span>
              <span>1-on-1 Mentor Chat</span>
              <span class="badge badge-primary" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Live</span>
            </button>
          </div>

          <!-- TAB CONTENT AREAS -->
          <div id="classroom-tab-content">
            ${currentClassroomState.activeTab === 'overview' ? renderOverviewTab(course, activeModule) : ''}
            ${currentClassroomState.activeTab === 'assignment' ? renderAssignmentTab(course, assignmentData) : ''}
            ${currentClassroomState.activeTab === 'mentor' ? renderMentorTab(course, chatMessages) : ''}
          </div>
        </div>

        <!-- RIGHT COLUMN: Interactive Syllabus Playlist -->
        <div>
          <div class="syllabus-box">
            <div class="syllabus-header">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-sm" style="color: #FFFFFF;">Course Syllabus Playlist</h3>
                <span class="text-xs text-primary font-bold">${watchedModules.length}/${course.modules.length} Watched</span>
              </div>
              ${renderProgressBar(completionPct)}
            </div>

            <!-- List of All Modules -->
            <div class="syllabus-list">
              ${course.modules.map((m, idx) => {
                const isWatched = watchedModules.includes(idx);
                const isActive = idx === currentClassroomState.activeModuleIndex;

                return `
                  <div class="playlist-item ${isActive ? 'active' : ''} ${isWatched ? 'completed' : ''}" 
                       onclick="switchModule(${idx})">
                    
                    <span class="material-icons module-check-icon" 
                          style="font-size: 22px; color: ${isWatched ? '#34D399' : (isActive ? 'var(--primary-light)' : 'var(--text-muted)')};">
                      ${isWatched ? 'check_circle' : (isActive ? 'play_circle' : 'radio_button_unchecked')}
                    </span>
                    
                    <div style="flex: 1; overflow: hidden;">
                      <div class="font-bold text-xs" style="color: ${isActive ? 'var(--primary-light)' : '#FFFFFF'}; line-height: 1.35; margin-bottom: 2px;">
                        ${idx + 1}. ${m.title}
                      </div>
                      <div class="flex items-center gap-2 text-xs text-muted" style="font-size: 0.72rem;">
                        <span>${m.duration}</span>
                        ${isActive ? '<span class="badge badge-primary" style="font-size: 0.6rem; padding: 0.1rem 0.35rem;">Now Playing</span>' : ''}
                        ${isWatched && !isActive ? '<span class="text-success" style="color: #34D399; font-size: 0.68rem; font-weight: 600;">Watched ✓</span>' : ''}
                      </div>
                    </div>

                    <!-- Direct Checkbox Button to toggle watched status -->
                    <button title="${isWatched ? 'Mark Unwatched' : 'Mark Watched'}" 
                            class="btn btn-sm" 
                            style="background: transparent; border: none; padding: 4px; color: ${isWatched ? '#34D399' : 'var(--text-muted)'};"
                            onclick="event.stopPropagation(); toggleModuleWatched('${course.id}', ${idx})">
                      <span class="material-icons" style="font-size: 18px;">${isWatched ? 'task_alt' : 'circle'}</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Capstone Project Card at bottom of syllabus -->
            <div class="p-4 border-t" style="border-color: var(--card-border); background: rgba(2, 6, 17, 0.7);">
              <div class="flex items-center gap-2 mb-1">
                <span class="material-icons text-accent" style="font-size: 18px;">workspace_premium</span>
                <h4 class="font-bold text-xs" style="color: #FFFFFF;">Capstone Project Requirement</h4>
              </div>
              <p class="text-xs text-secondary mb-3">${course.capstoneTitle}</p>
              <button class="btn btn-outline w-full btn-sm" onclick="switchClassroomTab('assignment')">
                <span>View & Submit Assignment</span>
                <span class="material-icons" style="font-size: 14px;">chevron_right</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  container.innerHTML = html;
}

// --------------------------------------------------------------------
// TAB 1: OVERVIEW & NOTES
// --------------------------------------------------------------------
function renderOverviewTab(course, activeModule) {
  return `
    <div class="card p-6 animate-fadeIn" style="background: rgba(8, 15, 34, 0.9);">
      <h3 class="font-bold text-lg mb-3" style="color: #FFFFFF;">Lesson Focus & Architecture Concepts</h3>
      <p class="text-secondary text-sm mb-4 leading-relaxed">
        In this module <strong>${activeModule.title}</strong>, you will build and master production-grade patterns. 
        Focus on asynchronous I/O, writing structured clean code, automated exception handling, and Docker containerization.
      </p>

      <div class="grid mb-4" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
        <div class="card p-3" style="background: rgba(13, 24, 50, 0.6); border-color: rgba(56, 189, 248, 0.2);">
          <div class="flex items-center gap-2 text-primary font-bold text-xs mb-1">
            <span class="material-icons" style="font-size: 16px;">code</span>
            <span>Practical Implementation</span>
          </div>
          <p class="text-xs text-secondary">Hands-on code walkthroughs with repository commits.</p>
        </div>

        <div class="card p-3" style="background: rgba(13, 24, 50, 0.6); border-color: rgba(56, 189, 248, 0.2);">
          <div class="flex items-center gap-2 text-success font-bold text-xs mb-1" style="color: #34D399;">
            <span class="material-icons" style="font-size: 16px;">bug_report</span>
            <span>Debugging & Best Practices</span>
          </div>
          <p class="text-xs text-secondary">Real error triage, stack trace inspection & profiling.</p>
        </div>
      </div>

      <div class="p-3 rounded flex items-center justify-between" style="background: rgba(2, 132, 199, 0.12); border: 1px solid rgba(56, 189, 248, 0.3);">
        <span class="text-xs text-secondary">Need help with this module? Connect 1-on-1 with your mentor.</span>
        <button class="btn btn-primary btn-sm" onclick="switchClassroomTab('mentor')">Ask Mentor</button>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------
// TAB 2: ASSIGNMENT & CAPSTONE SUBMISSION BACKEND
// --------------------------------------------------------------------
function renderAssignmentTab(course, assignmentData) {
  return `
    <div class="assignment-panel animate-fadeIn">
      <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 class="font-bold text-lg" style="color: #FFFFFF;">Capstone Project & Assignment Submission</h3>
          <p class="text-xs text-secondary">Submit your project for senior engineer evaluation and verified credential issuance.</p>
        </div>
        <span class="badge ${assignmentData.isSubmitted ? 'badge-success' : 'badge-accent'}">
          ${assignmentData.isSubmitted ? 'Evaluation Submitted' : 'Pending Submission'}
        </span>
      </div>

      <!-- Project Prompt Box -->
      <div class="card p-4 mb-5" style="background: rgba(2, 6, 17, 0.85); border-color: rgba(56, 189, 248, 0.3);">
        <div class="flex items-center gap-2 text-primary font-bold text-sm mb-1">
          <span class="material-icons" style="font-size: 18px;">task</span>
          <span>Project Objective: ${course.capstoneTitle}</span>
        </div>
        <p class="text-xs text-secondary leading-relaxed">
          Build and deploy the complete capstone project adhering to clean architecture. Ensure your repository includes a comprehensive <code>README.md</code>, working <code>Dockerfile</code> or live production URL, and passes all unit test suites.
        </p>
      </div>

      ${assignmentData.isSubmitted ? `
        <!-- Current Submission Status Card -->
        <div class="card p-4 mb-5" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.4);">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="material-icons text-success" style="color: #34D399;">verified</span>
              <strong style="color: #FFFFFF; font-size: 0.95rem;">Assignment Received for Mentor Review</strong>
            </div>
            <span class="text-xs text-muted">Submitted: ${assignmentData.submittedAt}</span>
          </div>

          <div class="text-xs text-secondary mb-3">
            <div>📁 <strong>GitHub Repo:</strong> <a href="${assignmentData.repoUrl}" target="_blank" style="color: var(--primary-light);">${assignmentData.repoUrl}</a></div>
            ${assignmentData.demoUrl ? `<div>🌐 <strong>Live Demo:</strong> <a href="${assignmentData.demoUrl}" target="_blank" style="color: var(--primary-light);">${assignmentData.demoUrl}</a></div>` : ''}
            <div class="mt-1">📝 <strong>Notes:</strong> ${assignmentData.notes}</div>
          </div>

          <div class="p-3 rounded mt-2" style="background: rgba(8, 15, 34, 0.85); border-left: 3px solid #34D399;">
            <div class="text-xs font-bold text-success mb-1" style="color: #34D399;">Mentor Feedback (Er. Vikram Aditya):</div>
            <p class="text-xs text-secondary leading-relaxed">
              "${assignmentData.feedback || 'Code structure looks solid! Proper async separation and container setup. Final verified certificate will be reflected on your profile upon full evaluation.'}"
            </p>
            <div class="mt-2 text-xs font-bold" style="color: #FFFFFF;">
              Score: <span class="text-primary" style="font-size: 0.9rem;">${assignmentData.score || '96/100'}</span> • Status: <span class="text-success" style="color: #34D399;">VERIFIED</span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Interactive Submission Form -->
      <form id="assignment-form" onsubmit="handleAssignmentSubmit(event, '${course.id}')">
        <div class="mb-4">
          <label class="block text-xs font-bold mb-1" style="color: #FFFFFF;">GitHub Repository URL *</label>
          <input type="url" required class="input-field w-full" id="assign-repo-url" 
                 placeholder="https://github.com/username/project-repository" 
                 value="${assignmentData.repoUrl || ''}">
        </div>

        <div class="mb-4">
          <label class="block text-xs font-bold mb-1" style="color: #FFFFFF;">Live Deployment / Hosted URL (Optional)</label>
          <input type="url" class="input-field w-full" id="assign-demo-url" 
                 placeholder="https://my-app.vercel.app or AWS Link" 
                 value="${assignmentData.demoUrl || ''}">
        </div>

        <div class="mb-4">
          <label class="block text-xs font-bold mb-1" style="color: #FFFFFF;">Implementation Notes & Key Architecture Decisions</label>
          <textarea rows="3" class="input-field w-full" id="assign-notes" 
                    placeholder="Describe your tech stack, database schemas, and how you handled errors...">${assignmentData.notes || ''}</textarea>
        </div>

        <button type="submit" class="btn btn-primary w-full flex items-center justify-center gap-2">
          <span class="material-icons">send</span>
          <span>${assignmentData.isSubmitted ? 'Update & Re-Submit Assignment' : 'Submit Assignment for Mentor Review'}</span>
        </button>
      </form>
    </div>
  `;
}

// --------------------------------------------------------------------
// TAB 3: 1-ON-1 MENTOR CHAT BACKEND
// --------------------------------------------------------------------
function renderMentorTab(course, messages) {
  return `
    <div class="mentor-chat-wrapper animate-fadeIn">
      <div class="mentor-chat-header">
        <div class="flex items-center gap-3">
          <div class="avatar" style="background: #0284C7; width: 40px; height: 40px;">VA</div>
          <div>
            <h4 class="font-bold text-sm" style="color: #FFFFFF; margin: 0;">Er. Vikram Aditya</h4>
            <div class="flex items-center gap-1 text-xs text-success" style="color: #34D399; font-size: 0.72rem;">
              <span class="material-icons" style="font-size: 10px;">fiber_manual_record</span>
              <span>Senior AI & Backend Architect • Online</span>
            </div>
          </div>
        </div>
        <div class="text-xs text-secondary hidden sm:block">
          Avg. Response Time: <strong>&lt; 2 mins</strong>
        </div>
      </div>

      <!-- Messages Scroll Area -->
      <div class="mentor-chat-messages" id="mentor-chat-stream">
        ${messages.map(msg => `
          <div class="chat-bubble ${msg.sender === 'student' ? 'chat-bubble-student' : 'chat-bubble-mentor'}">
            <div>${msg.text}</div>
            <span class="chat-time">${msg.time}</span>
          </div>
        `).join('')}
      </div>

      <!-- Send Doubt Footer -->
      <form class="mentor-chat-footer" onsubmit="handleSendMentorMessage(event, '${course.id}')">
        <input type="text" id="mentor-chat-input" required class="input-field" style="flex: 1; padding: 0.65rem 1rem;" placeholder="Type your doubt or code question for mentor...">
        <button type="submit" class="btn btn-primary flex items-center gap-1">
          <span>Send</span>
          <span class="material-icons" style="font-size: 16px;">send</span>
        </button>
      </form>
    </div>
  `;
}

// --------------------------------------------------------------------
// CONTROLLERS & DATA LOGIC (STORAGE PERSISTENCE)
// --------------------------------------------------------------------

function getWatchedModules(courseId, totalModulesCount) {
  const key = `pragvix_watched_${courseId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  // Default first 2 watched for realistic experience
  const defaultWatched = [0, 1].filter(idx => idx < totalModulesCount);
  localStorage.setItem(key, JSON.stringify(defaultWatched));
  return defaultWatched;
}

function toggleModuleWatched(courseId, moduleIdx) {
  const key = `pragvix_watched_${courseId}`;
  let watched = getWatchedModules(courseId, 10);
  
  if (watched.includes(moduleIdx)) {
    watched = watched.filter(i => i !== moduleIdx);
    renderToast(`Module ${moduleIdx + 1} marked as unwatched`);
  } else {
    watched.push(moduleIdx);
    watched.sort((a, b) => a - b);
    renderToast(`Module ${moduleIdx + 1} marked as watched! ✓`);
  }

  localStorage.setItem(key, JSON.stringify(watched));
  renderClassroomView();
}

function switchModule(moduleIdx) {
  currentClassroomState.activeModuleIndex = moduleIdx;
  currentClassroomState.currentTimeSeconds = 0;
  currentClassroomState.isPlaying = true;
  renderClassroomView();
}

function goToNextLesson(courseId) {
  const course = window.AppData.courses.find(c => c.id === courseId);
  if (!course) return;

  // Auto-mark current module as watched
  let watched = getWatchedModules(courseId, course.modules.length);
  if (!watched.includes(currentClassroomState.activeModuleIndex)) {
    watched.push(currentClassroomState.activeModuleIndex);
    localStorage.setItem(`pragvix_watched_${courseId}`, JSON.stringify(watched));
  }

  if (currentClassroomState.activeModuleIndex < course.modules.length - 1) {
    currentClassroomState.activeModuleIndex += 1;
    currentClassroomState.currentTimeSeconds = 0;
    currentClassroomState.isPlaying = true;
  }
  renderClassroomView();
}

function togglePlayState() {
  currentClassroomState.isPlaying = !currentClassroomState.isPlaying;
  renderClassroomView();
}

function cyclePlaybackSpeed() {
  const speeds = [1.0, 1.25, 1.5, 2.0];
  let idx = speeds.indexOf(currentClassroomState.playbackSpeed);
  idx = (idx + 1) % speeds.length;
  currentClassroomState.playbackSpeed = speeds[idx];
  renderToast(`Playback Speed: ${currentClassroomState.playbackSpeed}x`);
  renderClassroomView();
}

function handleSeek(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  currentClassroomState.currentTimeSeconds = Math.round(ratio * currentClassroomState.totalDurationSeconds);
  renderClassroomView();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function switchClassroomTab(tabName) {
  currentClassroomState.activeTab = tabName;
  renderClassroomView();
}

// --------------------------------------------------------------------
// ASSIGNMENT SUBMISSION LOGIC
// --------------------------------------------------------------------
function getStoredAssignment(courseId) {
  const key = `pragvix_assignment_${courseId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    isSubmitted: false,
    repoUrl: '',
    demoUrl: '',
    notes: '',
    submittedAt: '',
    score: '',
    feedback: ''
  };
}

function handleAssignmentSubmit(e, courseId) {
  e.preventDefault();
  const repoUrl = document.getElementById('assign-repo-url').value.trim();
  const demoUrl = document.getElementById('assign-demo-url').value.trim();
  const notes = document.getElementById('assign-notes').value.trim();

  const submission = {
    isSubmitted: true,
    repoUrl,
    demoUrl,
    notes,
    submittedAt: new Date().toLocaleString(),
    score: '96/100',
    feedback: 'Outstanding implementation! Clean asynchronous decoupling, production Docker containerization, and proper error boundaries. Approved by Lead Architect Vikram Aditya.'
  };

  localStorage.setItem(`pragvix_assignment_${courseId}`, JSON.stringify(submission));
  renderToast('Assignment submitted successfully! Evaluated by mentor.');
  renderClassroomView();
}

// --------------------------------------------------------------------
// 1-ON-1 MENTOR CHAT LOGIC
// --------------------------------------------------------------------
function getStoredChat(courseId) {
  const key = `pragvix_chat_${courseId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultMessages = [
    {
      sender: 'mentor',
      text: `Hello Ashutosh! I am Er. Vikram Aditya, your assigned 1-on-1 mentor for this track. Whenever you encounter any architectural questions, bugs, or need guidance on your capstone project, message me right here!`,
      time: '10:00 AM'
    }
  ];
  localStorage.setItem(key, JSON.stringify(defaultMessages));
  return defaultMessages;
}

function handleSendMentorMessage(e, courseId) {
  e.preventDefault();
  const input = document.getElementById('mentor-chat-input');
  const question = input.value.trim();
  if (!question) return;

  const key = `pragvix_chat_${courseId}`;
  const messages = getStoredChat(courseId);

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  messages.push({
    sender: 'student',
    text: question,
    time: now
  });

  localStorage.setItem(key, JSON.stringify(messages));
  input.value = '';
  renderClassroomView();

  // Scroll to bottom
  setTimeout(() => {
    const stream = document.getElementById('mentor-chat-stream');
    if (stream) stream.scrollTop = stream.scrollHeight;
  }, 50);

  // Mentor Simulated Intelligent Auto-Response
  setTimeout(() => {
    let mentorReply = "Great question! Make sure to verify your connection pooling and always test asynchronous exceptions in a Docker container before pushing to production.";
    const qLower = question.toLowerCase();

    if (qLower.includes('error') || qLower.includes('bug') || qLower.includes('fix')) {
      mentorReply = "When handling that error, check your async connection timeouts and make sure the environment variables are loaded properly into your config.";
    } else if (qLower.includes('docker') || qLower.includes('deploy') || qLower.includes('kubernetes')) {
      mentorReply = "For Docker deployment, ensure you are using multistage builds with a non-root user to keep the image lightweight and secure.";
    } else if (qLower.includes('assignment') || qLower.includes('project') || qLower.includes('submit')) {
      mentorReply = "For your capstone project, verify that your README has clear setup instructions and you have included a health-check endpoint. I'll evaluate it as soon as you submit!";
    } else if (qLower.includes('database') || qLower.includes('sql') || qLower.includes('postgres')) {
      mentorReply = "For PostgreSQL, always leverage asyncpg with SQLAlchemy 2.0 sessions wrapped inside context managers to avoid connection leaks.";
    } else {
      mentorReply = `Thanks for asking! I've reviewed your current progress in this module. Keep going with the hands-on lab and let me know if you run into any road blocks!`;
    }

    const updatedMessages = getStoredChat(courseId);
    updatedMessages.push({
      sender: 'mentor',
      text: mentorReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem(key, JSON.stringify(updatedMessages));
    renderClassroomView();

    setTimeout(() => {
      const stream = document.getElementById('mentor-chat-stream');
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }, 1200);
}

