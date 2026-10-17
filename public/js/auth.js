let pendingEnrollmentCourseId = null;

function showLoginModal(courseIdToBuy = null) {
  pendingEnrollmentCourseId = courseIdToBuy;
  
  let targetCourse = null;
  if (courseIdToBuy && window.AppData && window.AppData.courses) {
    targetCourse = window.AppData.courses.find(c => c.id === courseIdToBuy);
  }

  const isBuying = !!targetCourse;

  const content = `
    <div class="text-center">
      <img src="assets/images/pragvix_official_logo.png" alt="Pragvix" class="brand-logo" style="width: 68px; height: 68px; border-radius: 18px; margin: 0 auto 1.25rem; display: block; box-shadow: 0 0 25px rgba(56, 189, 248, 0.6);" />
      
      <h2 class="modal-title" style="margin-bottom: 0.25rem; font-size: 1.4rem; font-weight: 800; color: #FFFFFF;">
        ${isBuying ? 'Instant Course Enrollment' : 'Student Account Login'}
      </h2>
      <p class="text-secondary mb-4 text-xs" style="color: #94A3B8;">Powered by SehatGraph Technologies Private Limited</p>

      ${isBuying ? `
        <div class="card p-3 mb-4 text-left" style="background: rgba(2, 132, 199, 0.15); border: 1px solid rgba(56, 189, 248, 0.45); border-radius: 12px; padding: 0.85rem 1rem;">
          <div class="flex items-center justify-between">
            <span class="badge badge-success text-xs">Direct Enrollment</span>
            <span class="text-xs text-muted" style="color: #94A3B8;">Original: <del>₹${targetCourse.originalPrice}</del></span>
          </div>
          <h4 class="font-bold text-sm mt-1" style="color: #FFFFFF;">${targetCourse.title}</h4>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-secondary" style="color: #94A3B8;">${targetCourse.durationHours} • Hands-on Projects</span>
            <span class="text-base font-bold" style="color: #38BDF8;">₹${targetCourse.price}</span>
          </div>
        </div>
      ` : `
        <div class="card p-3 mb-4 text-left" style="background: rgba(8, 15, 34, 0.8); border: 1px solid rgba(26, 42, 72, 0.9); border-radius: 12px; padding: 0.75rem 1rem;">
          <div class="flex items-center gap-2">
            <span class="material-icons text-primary" style="font-size: 20px;">lock_open</span>
            <p class="text-xs text-secondary" style="margin: 0; color: #94A3B8;">Enter your mobile number to access your enrolled courses, live classroom & student dashboard.</p>
          </div>
        </div>
      `}
      
      <div id="phone-step">
        <div class="input-group mb-4">
          <input type="tel" id="login-phone" class="input-field" placeholder="Mobile Number (e.g. 9876543210)" maxlength="10" />
        </div>
        <button class="btn btn-primary w-full btn-lg" onclick="handleSendOTP()">
          <span class="material-icons" style="font-size: 18px;">sms</span>
          <span>Send Verification OTP</span>
        </button>
      </div>

      <div id="otp-step" class="hidden">
        <p class="mb-1 text-sm font-semibold" style="color: #FFFFFF;">Enter 4-Digit Code</p>
        <p class="text-xs mb-4" style="color: #38BDF8;">(Demo OTP: <strong>4829</strong>)</p>
        <div class="otp-input-group" style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.25rem;">
          <input type="text" class="otp-input" maxlength="1" onkeyup="moveToNext(this, event)">
          <input type="text" class="otp-input" maxlength="1" onkeyup="moveToNext(this, event)">
          <input type="text" class="otp-input" maxlength="1" onkeyup="moveToNext(this, event)">
          <input type="text" class="otp-input" maxlength="1" onkeyup="moveToNext(this, event)">
        </div>
        <button class="btn btn-accent w-full btn-lg" onclick="handleVerifyOTP()">
          <span class="material-icons" style="font-size: 18px;">check_circle</span>
          <span>${isBuying ? 'Verify & Unlock Course' : 'Verify & Enter Dashboard'}</span>
        </button>
        <p class="mt-4 text-secondary text-xs" style="color: #94A3B8;">Resend OTP in <span id="resend-timer">30</span>s</p>
      </div>
    </div>
  `;
  renderModal('', content);
}

function handleSendOTP() {
  const phone = document.getElementById('login-phone').value;
  if (!phone || phone.length < 10) {
    renderToast('Please enter a valid 10-digit mobile number', 'error');
    return;
  }
  document.getElementById('phone-step').classList.add('hidden');
  document.getElementById('otp-step').classList.remove('hidden');
  renderToast('OTP sent successfully!');
  
  // Start timer
  let timeLeft = 30;
  const timerEl = document.getElementById('resend-timer');
  const timer = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (timerEl && timerEl.parentElement) {
        timerEl.parentElement.innerHTML = '<a href="#" onclick="handleSendOTP()" class="text-primary" style="color: #38BDF8; font-weight: 600;">Resend OTP</a>';
      }
    }
  }, 1000);
}

function moveToNext(elem, event) {
  if (event.key === 'Backspace') {
    if (elem.previousElementSibling) elem.previousElementSibling.focus();
  } else {
    if (elem.value && elem.nextElementSibling) elem.nextElementSibling.focus();
  }
}

function handleVerifyOTP() {
  const inputs = document.querySelectorAll('.otp-input');
  let otp = '';
  inputs.forEach(i => otp += i.value);
  
  if (otp === '4829') {
    localStorage.setItem('pragvix_logged_in', 'true');
    
    // Check enrollment list
    let enrolled = JSON.parse(localStorage.getItem('pragvix_enrolled') || '[]');
    
    if (pendingEnrollmentCourseId) {
      if (!enrolled.includes(pendingEnrollmentCourseId)) {
        enrolled.push(pendingEnrollmentCourseId);
      }
      localStorage.setItem('pragvix_enrolled', JSON.stringify(enrolled));
      renderToast('🎉 Enrollment Successful! Redirecting to Classroom...');
      setTimeout(() => {
        window.location.href = 'app.html#learn';
      }, 600);
    } else {
      // Returning student logging in
      // If student previously had no courses in localStorage, load default enrolled course
      if (enrolled.length === 0 && window.AppData && window.AppData.enrolledCourseIds) {
        enrolled = [...window.AppData.enrolledCourseIds];
        localStorage.setItem('pragvix_enrolled', JSON.stringify(enrolled));
      }
      renderToast('Welcome back! Opening Dashboard...');
      setTimeout(() => {
        window.location.href = 'app.html#home';
      }, 600);
    }
  } else {
    renderToast('Invalid OTP. Please use demo code 4829', 'error');
  }
}

function checkAuthState() {
  const isLoggedIn = localStorage.getItem('pragvix_logged_in') === 'true';
  const authBtn = document.getElementById('auth-btn');
  if (authBtn) {
    if (isLoggedIn) {
      authBtn.innerHTML = 'Dashboard &rarr;';
      authBtn.onclick = () => window.location.href = 'app.html';
    } else {
      authBtn.innerHTML = 'Login';
      authBtn.onclick = () => showLoginModal();
    }
  }
  return isLoggedIn;
}

function logout() {
  localStorage.removeItem('pragvix_logged_in');
  window.location.href = 'index.html';
}

function handleAuthClick() {
  const isLoggedIn = localStorage.getItem('pragvix_logged_in') === 'true';
  if (isLoggedIn) {
    window.location.href = 'app.html';
  } else {
    showLoginModal();
  }
}
