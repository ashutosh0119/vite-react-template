function renderCareersTab(container) {
  const html = `
    <div class="animate-fadeIn">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Career Board</h1>
        <button class="btn btn-primary"><span class="material-icons">upload_file</span> Update Resume</button>
      </div>
      
      <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
        ${window.AppData.jobs.map(job => `
          <div class="card cursor-pointer" onclick="showJobDetail('${job.id}')">
            <div class="flex justify-between items-start mb-4">
              <div class="flex gap-3">
                <div class="avatar">${job.logoInitial}</div>
                <div>
                  <h3 class="font-bold">${job.role}</h3>
                  <p class="text-sm text-secondary">${job.company}</p>
                </div>
              </div>
              ${job.isUrgent ? '<span class="badge badge-danger">Urgent</span>' : ''}
            </div>
            
            <div class="flex gap-4 text-sm text-secondary mb-4">
              <span class="flex items-center gap-1"><span class="material-icons" style="font-size: 16px">location_on</span> ${job.location}</span>
              <span class="flex items-center gap-1"><span class="material-icons" style="font-size: 16px">payments</span> ${job.stipend}</span>
            </div>
            
            <div class="flex gap-2 mb-4 flex-wrap">
              ${job.skills.map(s => `<span class="chip" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">${s}</span>`).join('')}
            </div>
            
            <div class="flex justify-between items-center border-t pt-4">
              <span class="text-sm font-medium text-success" style="color: var(--secondary)">${job.matchPercentage}% Match</span>
              <span class="text-xs text-secondary">${job.postedAgo}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function showJobDetail(jobId) {
  const job = window.AppData.jobs.find(j => j.id === jobId);
  if (!job) return;
  const content = `
    <div>
      <div class="flex items-center gap-4 mb-6">
        <div class="avatar avatar-lg">${job.logoInitial}</div>
        <div>
          <h2 class="text-xl font-bold">${job.role}</h2>
          <p class="text-secondary">${job.company} • ${job.location}</p>
        </div>
      </div>
      <p class="mb-4 text-secondary">This is a simulated job description for ${job.role} at ${job.company}. Please apply directly through the portal.</p>
      <button class="btn btn-primary w-full btn-lg" onclick="renderToast('Application Submitted!'); closeModal();">Easy Apply</button>
    </div>
  `;
  renderModal('', content);
}
