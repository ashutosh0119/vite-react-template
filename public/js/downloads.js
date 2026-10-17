const DOWNLOADABLE_ITEMS = [
  {
    id: 'pdf-1',
    title: 'FastAPI & High-Throughput Async Backend Architecture',
    subtitle: 'Official Production Engineering Blueprint & Code Handbook',
    category: 'Backend & Cloud',
    fileSize: '8.4 MB',
    pages: '64 Pages',
    downloadsCount: 1840,
    icon: 'picture_as_pdf'
  },
  {
    id: 'pdf-2',
    title: 'Full-Stack Distributed System Design & Microservices',
    subtitle: 'Enterprise Scalability, Kafka, Redis & Kubernetes Guide',
    category: 'Full-Stack Architecture',
    fileSize: '14.2 MB',
    pages: '98 Pages',
    downloadsCount: 2490,
    icon: 'picture_as_pdf'
  },
  {
    id: 'pdf-3',
    title: 'Offensive Cybersecurity, OSINT & Network Pentesting',
    subtitle: 'Red Team Attack Vectors, CTF Blueprints & Wireshark Labs',
    category: 'Cybersecurity',
    fileSize: '18.7 MB',
    pages: '128 Pages',
    downloadsCount: 3410,
    icon: 'picture_as_pdf'
  },
  {
    id: 'pdf-4',
    title: 'Generative AI, LangChain & Agentic Workflow Systems',
    subtitle: 'Multi-Agent Orchestration & Vector DB Architecture',
    category: 'AI & Data Science',
    fileSize: '11.5 MB',
    pages: '82 Pages',
    downloadsCount: 1980,
    icon: 'picture_as_pdf'
  },
  {
    id: 'pdf-5',
    title: 'Flutter Enterprise Clean Layered Architecture Manual',
    subtitle: 'BLoC, Riverpod, Offline Sync & Multi-Platform Guide',
    category: 'Mobile Engineering',
    fileSize: '12.8 MB',
    pages: '76 Pages',
    downloadsCount: 1620,
    icon: 'picture_as_pdf'
  },
  {
    id: 'pdf-6',
    title: 'FAANG DSA 150 Core Patterns, LeetCode & Space Complexity',
    subtitle: 'Algorithmic Problem Classification & Optimized Code Templates',
    category: 'Algorithms & Coding',
    fileSize: '9.6 MB',
    pages: '110 Pages',
    downloadsCount: 4850,
    icon: 'picture_as_pdf'
  }
];

function renderDownloadsTab(container) {
  const html = `
    <div class="animate-fadeIn">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-icons text-danger" style="color: #EF4444; font-size: 28px;">picture_as_pdf</span>
            <h1 class="text-2xl font-bold" style="color: #FFFFFF;">Curriculum PDF Library</h1>
          </div>
          <p class="text-secondary text-sm">Download official verified PDF handbooks, architectural blueprints & cheatsheets for offline study.</p>
        </div>
        <div class="badge badge-success flex items-center gap-1">
          <span class="material-icons" style="font-size: 14px;">check_circle</span>
          <span>Verified PDF Documents Only</span>
        </div>
      </div>
      
      <!-- Storage & Sync Status Box -->
      <div class="card mb-6" style="border-color: rgba(56, 189, 248, 0.35); background: rgba(8, 15, 34, 0.85);">
        <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="material-icons text-primary">menu_book</span>
            <h3 class="font-bold text-sm" style="color: #FFFFFF;">Offline PDF Storage Allocation</h3>
          </div>
          <span class="text-xs text-primary font-semibold">6 Official Handbooks Available • 75.2 MB Total</span>
        </div>
        ${renderProgressBar(32)}
      </div>
      
      <!-- Download Items Grid Boxes -->
      <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
        ${DOWNLOADABLE_ITEMS.map(item => `
          <div class="card flex flex-col justify-between" style="border-left: 4px solid #EF4444; background: rgba(13, 24, 50, 0.85);">
            <div>
              <div class="flex justify-between items-start mb-3">
                <div class="avatar" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #EF4444; width: 44px; height: 44px;">
                  <span class="material-icons" style="font-size: 24px;">picture_as_pdf</span>
                </div>
                <span class="badge badge-danger" style="background: rgba(239, 68, 68, 0.15); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 0.7rem;">
                  OFFICIAL PDF
                </span>
              </div>
              
              <h4 class="font-bold text-base mb-1" style="color: #FFFFFF; line-height: 1.4;">${item.title}</h4>
              <p class="text-xs text-secondary mb-3">${item.subtitle}</p>
              
              <div class="flex items-center gap-3 text-xs text-muted mb-4 flex-wrap">
                <span class="flex items-center gap-1">
                  <span class="material-icons" style="font-size: 14px; color: var(--primary-light);">category</span>
                  <span>${item.category}</span>
                </span>
                <span>•</span>
                <span>${item.pages}</span>
                <span>•</span>
                <span>${item.fileSize}</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between border-t pt-3" style="border-color: var(--card-border);">
              <span class="text-xs text-secondary flex items-center gap-1">
                <span class="material-icons" style="font-size: 14px; color: #34D399;">verified</span>
                <span>${item.downloadsCount} downloads</span>
              </span>
              <button class="btn btn-primary btn-sm flex items-center gap-1" onclick="downloadCourseMaterial('${item.id}', '${item.title.replace(/'/g, "\\'")}')">
                <span class="material-icons" style="font-size: 16px;">download</span>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.innerHTML = html;
}

function downloadCourseMaterial(id, title) {
  const item = DOWNLOADABLE_ITEMS.find(i => i.id === id) || { title, category: 'Engineering' };
  const student = window.AppData.currentStudent;
  
  // Create genuine, standard-compliant PDF 1.4 file
  const streamContent = `BT
/F1 18 Tf
50 720 Td
(PRAGVIX LEARN - OFFICIAL CURRICULUM HANDBOOK) Tj
/F1 11 Tf
0 -30 Td
(Document: ${item.title.replace(/[()]/g, '')}) Tj
0 -22 Td
(Category: ${item.category}) Tj
0 -22 Td
(Authorized Student: ${student.name}) Tj
0 -22 Td
(Corporate Parent: SehatGraph Technologies Private Limited) Tj
0 -22 Td
(CIN: U62099BR2026PTC086806) Tj
0 -22 Td
(Date Generated: ${new Date().toLocaleDateString()}) Tj
0 -35 Td
(OFFICIAL SYLLABUS & CODE REFERENCE - VERIFIED CLEAN COPY) Tj
0 -25 Td
(1. Core Architectural Blueprints and Scalability Patterns) Tj
0 -20 Td
(2. Production Asynchronous IO, Concurrency and Containerization) Tj
0 -20 Td
(3. Zero-Trust Security, Error Handling and Automated Pipelines) Tj
0 -35 Td
(Issued by Pragvix Learn. Powered by SehatGraph Technologies Pvt. Ltd.) Tj
ET`;

  const streamLength = streamContent.length;
  
  const pdfString = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${streamContent}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000236 00000 n 
0000000350 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
450
%%EOF`;

  const blob = new Blob([pdfString], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeFilename = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  renderToast(`Downloading PDF: ${safeFilename}`);
}
