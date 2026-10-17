function renderProfileTab(container) {
  const student = window.AppData.currentStudent;
  const company = window.AppData.companyInfo;
  
  const html = `
    <div class="animate-fadeIn" style="max-width: 820px; margin: 0 auto;">
      
      <!-- Profile Header Box -->
      <div class="card mb-6 text-center" style="position: relative;">
        <div class="avatar avatar-lg mx-auto mb-4" style="width: 96px; height: 96px; font-size: 2.5rem; margin: 0 auto 1rem; border: 2px solid var(--primary-light);">
          ${student.avatarInitials || 'AS'}
        </div>
        <h2 class="text-2xl font-bold mb-1" style="color: #FFFFFF;">${student.name}</h2>
        <p class="text-secondary text-sm mb-3">${student.email} • ${student.phone}</p>
        
        <div class="flex justify-center gap-2 mb-4">
          <span class="badge badge-primary">Student Account</span>
          <span class="badge badge-success">Verified Credentials</span>
        </div>
        
        <p class="text-secondary text-sm mb-5" style="max-width: 600px; margin-left: auto; margin-right: auto;">
          ${student.bio}
        </p>
        
        <div class="flex justify-center gap-3 flex-wrap">
          <button class="btn btn-primary btn-sm" onclick="openEditProfileModal()">
            <span class="material-icons" style="font-size: 16px;">edit</span>
            <span>Edit Profile Data</span>
          </button>
        </div>
      </div>
      
      <!-- Academic Information Box -->
      <div class="card mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-primary">Academic & University Background</h3>
          <button class="btn btn-outline btn-sm" onclick="openEditProfileModal()">Edit</button>
        </div>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
          <div>
            <p class="text-xs text-muted">College / Institute</p>
            <p class="font-semibold text-sm" style="color: #FFFFFF;">${student.college}</p>
          </div>
          <div>
            <p class="text-xs text-muted">Degree Program</p>
            <p class="font-semibold text-sm" style="color: #FFFFFF;">${student.degree}</p>
          </div>
          <div>
            <p class="text-xs text-muted">Graduation Year</p>
            <p class="font-semibold text-sm" style="color: #FFFFFF;">Batch of ${student.graduationYear}</p>
          </div>
        </div>
      </div>

      <!-- Skills Box -->
      <div class="card mb-6">
        <h3 class="font-bold mb-4 text-primary">Verified Industry Competencies</h3>
        <div class="flex flex-wrap gap-2">
          ${student.verifiedSkills.map(skill => `<span class="badge badge-primary">${skill}</span>`).join('')}
        </div>
      </div>
      
      <!-- Corporate Accreditation Box -->
      <div class="card mb-6" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(8, 15, 34, 0.9);">
        <div class="flex items-center gap-3 mb-2">
          <span class="material-icons text-primary">verified_user</span>
          <h4 class="font-bold text-sm" style="color: #FFFFFF;">Parent Entity Certified</h4>
        </div>
        <p class="text-xs text-secondary mb-3">
          All course enrollments, module completions, and verified digital certificates are administered under 
          <strong>${company.name}</strong>.
        </p>
        <div class="text-xs text-muted">
          Registered Office: ${company.registeredAddress}
        </div>
      </div>

      <!-- Settings & Account Actions Box -->
      <div class="card mb-6">
        <h3 class="font-bold mb-4" style="color: #FFFFFF;">Account Controls</h3>
        <div class="flex-col gap-2">
          <button class="btn btn-outline w-full justify-between mb-2" onclick="renderToast('Password reset link sent to registered phone & email')">
            <span>Security & Passwords</span>
            <span class="material-icons">chevron_right</span>
          </button>
          <button class="btn btn-outline w-full justify-between" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.4);" onclick="logout()">
            <span>Logout from Session</span>
            <span class="material-icons">logout</span>
          </button>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function openEditProfileModal() {
  const student = window.AppData.currentStudent;
  const content = `
    <div>
      <h2 class="modal-title mb-4">Edit Profile Information</h2>
      <form id="edit-profile-form" onsubmit="saveStudentProfile(event)">
        <div class="mb-3">
          <label class="text-xs text-secondary mb-1 block">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${student.name}" required />
        </div>
        
        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem;">
          <div>
            <label class="text-xs text-secondary mb-1 block">Email</label>
            <input type="email" id="edit-email" class="input-field" value="${student.email}" required />
          </div>
          <div>
            <label class="text-xs text-secondary mb-1 block">Phone</label>
            <input type="tel" id="edit-phone" class="input-field" value="${student.phone}" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="text-xs text-secondary mb-1 block">College / University</label>
          <input type="text" id="edit-college" class="input-field" value="${student.college}" required />
        </div>

        <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 0.75rem;">
          <div>
            <label class="text-xs text-secondary mb-1 block">Degree Program</label>
            <input type="text" id="edit-degree" class="input-field" value="${student.degree}" required />
          </div>
          <div>
            <label class="text-xs text-secondary mb-1 block">Graduation Year</label>
            <input type="text" id="edit-grad" class="input-field" value="${student.graduationYear}" required />
          </div>
        </div>

        <div class="mb-4">
          <label class="text-xs text-secondary mb-1 block">Bio / Summary</label>
          <textarea id="edit-bio" class="input-field" rows="3" style="resize: vertical;">${student.bio}</textarea>
        </div>

        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Profile Data</button>
        </div>
      </form>
    </div>
  `;
  renderModal('', content, 'large');
}

function saveStudentProfile(e) {
  e.preventDefault();
  const name = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const phone = document.getElementById('edit-phone').value.trim();
  const college = document.getElementById('edit-college').value.trim();
  const degree = document.getElementById('edit-degree').value.trim();
  const grad = document.getElementById('edit-grad').value.trim();
  const bio = document.getElementById('edit-bio').value.trim();
  
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ST';
  
  const updatedStudent = {
    ...window.AppData.currentStudent,
    name,
    email,
    phone,
    college,
    degree,
    graduationYear: grad,
    bio,
    avatarInitials: initials
  };
  
  window.AppData.currentStudent = updatedStudent;
  localStorage.setItem('pragvix_student', JSON.stringify(updatedStudent));
  
  closeModal();
  renderToast('Profile updated successfully!');
  
  // Re-render current tab if on profile
  const contentArea = document.getElementById('app-content');
  if (contentArea) {
    renderProfileTab(contentArea);
  }
}
