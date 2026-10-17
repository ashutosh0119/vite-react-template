window.AppData = {
  currentStudent: JSON.parse(localStorage.getItem('pragvix_student') || 'null') || {
    name: 'Ashutosh singh',
    email: 'ashutosh.singh@pragvix.edu',
    phone: '+91 98765 43210',
    avatarInitials: 'AS',
    college: 'Delhi Technological University (DTU)',
    degree: 'B.Tech in Computer Science & Engineering',
    graduationYear: '2027',
    bio: 'Full-Stack & Cloud Engineering student passionate about AI systems, cybersecurity, and scalable architectures.',
    verifiedSkills: ['FastAPI', 'PostgreSQL', 'Flutter', 'Docker', 'Python', 'LangChain', 'Next.js', 'Git'],
    projects: [
      {
        title: 'Multimodal Healthcare Triage AI',
        description: 'Emergency room triage assistant powered by Gemini API and real-time medical data pipelines.',
        techStack: ['FastAPI', 'Flutter', 'Gemini API', 'PostgreSQL'],
        mentorRating: 4.9
      },
      {
        title: 'CTF Automated Vulnerability Scanner',
        description: 'Async Python network scanner for CTF competitions and defensive auditing.',
        techStack: ['Python', 'Docker', 'FastAPI', 'Linux'],
        mentorRating: 4.8
      }
    ],
    certificates: [
      {
        certificateId: 'PRAG-2026-9481',
        courseTitle: 'GenAI & Full-Stack Mastery Track',
        issueDate: 'Feb 2026'
      },
      {
        certificateId: 'PRAG-2026-8812',
        courseTitle: 'Offensive Security & Ethical Hacking',
        issueDate: 'Jan 2026'
      }
    ]
  },
  enrolledCourseIds: ['course-1'],
  walletBalance: 600,
  referralCode: 'PRAGVIX-ARYAN2026',

  companyInfo: {
    name: 'SehatGraph Technologies Private Limited',
    brand: 'Pragvix Learn',
    cin: 'U62099BR2026PTC086806',
    registeredAddress: '22, Jamunaha, Maheshpur, Thana Kateya, Gopalganj, Chhitauna, Bihar, India - 841425',
    website: 'https://www.sehatgraph.com',
    supportEmail: 'support@pragvix.com',
    corporateEmail: 'contact@sehatgraph.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210'
  },

  founders: [
    {
      name: 'Ashutosh Singh',
      role: 'Founder & CEO',
      company: 'SehatGraph Technologies Pvt. Ltd. & Pragvix Learn',
      avatarInitial: 'AS',
      quote: '“Our vision with Pragvix Learn is simple yet audacious: to equip every passionate student in India with deep engineering excellence, architectural mastery, and the confidence to build software that shapes the future.”',
      message: 'Engineering is not about memorizing syntax; it is the art of solving real-world challenges with elegant, scalable technology. Through Pragvix Learn, we are creating a world-class ecosystem where students write production code from Day 1, learn under seasoned industry architects, and transform into top-tier tech innovators.',
      linkedin: 'https://linkedin.com/in/ashutosh-singh'
    },
    {
      name: 'Abhinav Mishra',
      role: 'Co-Founder & Director',
      company: 'SehatGraph Technologies Pvt. Ltd. & Pragvix Learn',
      avatarInitial: 'AM',
      quote: '“India has the brightest young minds in the world. By bringing elite, industry-standard tech training within everyone’s reach, we are unlocking unprecedented opportunities for the next generation of builders.”',
      message: 'We founded Pragvix Learn to fundamentally elevate how technical skills are mastered. By combining intensive project-driven learning, personalized mentor guidance, and direct hiring bridges to high-growth tech startups, we ensure every learner is completely industry-ready.',
      linkedin: 'https://linkedin.com/in/abhinav-mishra'
    }
  ],


  courses: [
    {
      id: 'td_mernstack',
      title: 'Web Development MERN Stack',
      category: 'Development',
      durationHours: '14 Hours',
      projectsCount: 3,
      rating: 4.7,
      studentsEnrolled: 1200,
      price: 699,
      originalPrice: 2497,
      badge: 'POPULAR',
      description: 'Master Web Development MERN Stack with hands-on projects, 1-on-1 mentorship, doubt resolution, and practical industry assignments.',
      modules: [
        { title: 'Fundamentals & Core Concepts', duration: '3h 30m' },
        { title: 'Hands-on Tools & Architecture', duration: '4h 15m' },
        { title: 'Advanced Implementation', duration: '5h 00m' },
        { title: 'Production Deployment & Capstone', duration: '4h 45m' }
      ],
      capstoneTitle: 'Full-Scale MERN Stack SaaS Application',
      color: '#3B82F6'
    },
    {
      id: 'td_python',
      title: 'Python Programming',
      category: 'Programming & Cloud',
      durationHours: '15 Hours',
      projectsCount: 4,
      rating: 4.8,
      studentsEnrolled: 1337,
      price: 699,
      originalPrice: 2497,
      badge: 'TRENDING',
      description: 'Master Python with hands-on projects, data structures, automation scripts, and 1-on-1 mentorship.',
      modules: [
        { title: 'Fundamentals & Core Concepts', duration: '3h 30m' },
        { title: 'Hands-on Tools & Virtualenvs', duration: '4h 15m' },
        { title: 'Advanced OOP & Concurrency', duration: '5h 00m' },
        { title: 'Capstone Project & Testing', duration: '4h 45m' }
      ],
      capstoneTitle: 'Asynchronous Web Scraper & Data Pipeline',
      color: '#F59E0B'
    },
    {
      id: 'td_datascience',
      title: 'Data Science Masterclass',
      category: 'AI & Data Science',
      durationHours: '16 Hours',
      projectsCount: 5,
      rating: 4.9,
      studentsEnrolled: 1474,
      price: 699,
      originalPrice: 2497,
      badge: 'BESTSELLER',
      description: 'Master Data Science with Pandas, NumPy, Scikit-Learn, data modeling, and practical industry datasets.',
      modules: [
        { title: 'Fundamentals of Data Science', duration: '3h 30m' },
        { title: 'Exploratory Data Analysis', duration: '4h 15m' },
        { title: 'Predictive Modeling & Stats', duration: '5h 00m' },
        { title: 'Production ML Pipelines', duration: '4h 45m' }
      ],
      capstoneTitle: 'End-to-End Predictive Analytics Dashboard',
      color: '#8B5CF6'
    },
    {
      id: 'td_dataanalytics',
      title: 'Data Analytics & Power BI',
      category: 'Business & Finance',
      durationHours: '17 Hours',
      projectsCount: 6,
      rating: 4.7,
      studentsEnrolled: 1611,
      price: 699,
      originalPrice: 2497,
      badge: 'TRENDING',
      description: 'Master SQL, Power BI, Excel dashboards, and business intelligence metrics.',
      modules: [
        { title: 'SQL Fundamentals & Joins', duration: '3h 30m' },
        { title: 'Power BI & DAX Essentials', duration: '4h 15m' },
        { title: 'Advanced Business Reporting', duration: '5h 00m' },
        { title: 'Capstone Executive Dashboard', duration: '4h 45m' }
      ],
      capstoneTitle: 'E-Commerce Business Intelligence Report',
      color: '#10B981'
    },
    {
      id: 'td_genai',
      title: 'Generative AI & LLMs',
      category: 'AI & Data Science',
      durationHours: '18 Hours',
      projectsCount: 3,
      rating: 4.8,
      studentsEnrolled: 1748,
      price: 699,
      originalPrice: 2497,
      badge: 'BESTSELLER',
      description: 'Master Prompt Engineering, LangChain, RAG architectures, and fine-tuning with hands-on projects.',
      modules: [
        { title: 'LLM Fundamentals & Prompting', duration: '3h 30m' },
        { title: 'LangChain & Vector Stores', duration: '4h 15m' },
        { title: 'Retrieval Augmented Generation', duration: '5h 00m' },
        { title: 'Agentic AI Deployment', duration: '4h 45m' }
      ],
      capstoneTitle: 'Multi-Document AI Research Assistant',
      color: '#EC4899'
    },
    {
      id: 'td_machinelearning',
      title: 'Machine Learning Engineering',
      category: 'AI & Data Science',
      durationHours: '14 Hours',
      projectsCount: 4,
      rating: 4.9,
      studentsEnrolled: 1885,
      price: 699,
      originalPrice: 2497,
      badge: 'TRENDING',
      description: 'Supervised, unsupervised, neural networks, and model deployment on AWS/GCP.',
      modules: [
        { title: 'ML Math & Algorithms', duration: '3h 30m' },
        { title: 'Model Training & Evaluation', duration: '4h 15m' },
        { title: 'Deep Learning with PyTorch', duration: '5h 00m' },
        { title: 'FastAPI Model Serving', duration: '4h 45m' }
      ],
      capstoneTitle: 'Computer Vision Defect Detection Model',
      color: '#06B6D4'
    },
    {
      id: 'td_cybersecurity',
      title: 'Cyber Security & Network Defense',
      category: 'Ethical Hacking',
      durationHours: '15 Hours',
      projectsCount: 5,
      rating: 4.8,
      studentsEnrolled: 2022,
      price: 699,
      originalPrice: 2497,
      badge: 'PRO TRACK',
      description: 'Master Network security, SOC operations, defensive forensics, and firewall configuration.',
      modules: [
        { title: 'Networking Fundamentals & Wireshark', duration: '3h 30m' },
        { title: 'Vulnerability Analysis', duration: '4h 15m' },
        { title: 'Intrusion Detection Systems', duration: '5h 00m' },
        { title: 'Incident Response & Capstone', duration: '4h 45m' }
      ],
      capstoneTitle: 'Hardening an Enterprise Linux DMZ',
      color: '#EF4444'
    },
    {
      id: 'td_react',
      title: 'React.js 19 & Redux Toolkit',
      category: 'Development',
      durationHours: '16 Hours',
      projectsCount: 6,
      rating: 4.7,
      studentsEnrolled: 2159,
      price: 699,
      originalPrice: 2497,
      badge: 'TRENDING',
      description: 'Hooks, custom hooks, Redux Toolkit, performance optimization, and clean component patterns.',
      modules: [
        { title: 'React Fundamentals & JSX', duration: '3h 30m' },
        { title: 'State & Effect Management', duration: '4h 15m' },
        { title: 'Global State with Redux', duration: '5h 00m' },
        { title: 'Production Capstone Deploy', duration: '4h 45m' }
      ],
      capstoneTitle: 'Collaborative Kanban Task Manager',
      color: '#3B82F6'
    },
    {
      id: 'td_dsa',
      title: 'Data Structures & Algorithms',
      category: 'Programming & Cloud',
      durationHours: '17 Hours',
      projectsCount: 3,
      rating: 4.8,
      studentsEnrolled: 2296,
      price: 699,
      originalPrice: 2497,
      badge: 'BESTSELLER',
      description: 'Master Arrays, Linked Lists, Trees, Graphs, DP, and crack tech interviews with ease.',
      modules: [
        { title: 'Complexity Analysis & Arrays', duration: '3h 30m' },
        { title: 'Trees, Heaps & Recursion', duration: '4h 15m' },
        { title: 'Graphs & Dynamic Programming', duration: '5h 00m' },
        { title: 'FAANG Interview Problem Solving', duration: '4h 45m' }
      ],
      capstoneTitle: 'Algorithmic Optimization Suite',
      color: '#F97316'
    },
    {
      id: 'td_uiuxdesign',
      title: 'UI/UX Design with Figma',
      category: 'Design & Media',
      durationHours: '18 Hours',
      projectsCount: 4,
      rating: 4.9,
      studentsEnrolled: 2433,
      price: 699,
      originalPrice: 2497,
      badge: 'TOP RATED',
      description: 'User research, wireframing, interactive prototyping, micro-interactions, and design systems.',
      modules: [
        { title: 'Design Thinking & Research', duration: '3h 30m' },
        { title: 'Figma Auto-Layout & Variants', duration: '4h 15m' },
        { title: 'Interactive Micro-animations', duration: '5h 00m' },
        { title: 'Design System for Web & Mobile', duration: '4h 45m' }
      ],
      capstoneTitle: 'Fintech Mobile App Design System in Figma',
      color: '#D946EF'
    },
    {
      id: 'course-1',
      title: 'Production AI Backend with FastAPI & PostgreSQL',
      category: 'AI & Backend',
      durationHours: '14 Hours',
      projectsCount: 4,
      rating: 4.9,
      studentsEnrolled: 1840,
      price: 799,
      originalPrice: 2499,
      badge: 'WORKSHOP',
      description: 'Build, containerize, and deploy production-grade asynchronous backends.',
      modules: [
        { title: 'Async Python & Modern FastAPI', duration: '2h 15m', isCompleted: true },
        { title: 'PostgreSQL with SQLAlchemy 2.0', duration: '3h 10m', isCompleted: true },
        { title: 'High-Throughput Endpoints & Redis', duration: '3h 45m' },
        { title: 'Docker Containerization & Production', duration: '4h 50m' }
      ],
      capstoneTitle: 'Agentic API Gateway with Rate-Limiting',
      color: '#0284C7'
    },
    {
      id: 'course-2',
      title: 'Flutter Cross-Platform Architecture Masterclass',
      category: 'Mobile',
      durationHours: '22 Hours',
      projectsCount: 5,
      rating: 4.8,
      studentsEnrolled: 2310,
      price: 1299,
      originalPrice: 3999,
      badge: 'BOOTCAMP',
      description: 'Learn Clean Layered Architecture, BLoC/Riverpod state management, and offline-first apps.',
      modules: [
        { title: 'Clean Architecture Fundamentals', duration: '4h 30m', isCompleted: true },
        { title: 'Riverpod & BLoC Patterns', duration: '5h 15m' },
        { title: 'Offline-First SQLite Cache', duration: '6h 00m' },
        { title: 'CI/CD & App Store Release', duration: '6h 15m' }
      ],
      capstoneTitle: 'Enterprise Fintech Mobile Wallet App',
      color: '#38BDF8'
    },
    {
      id: 'course-3',
      title: 'Full-Stack Web with Next.js 15 & TypeScript',
      category: 'Full-Stack',
      durationHours: '18 Hours',
      projectsCount: 3,
      rating: 4.9,
      studentsEnrolled: 1650,
      price: 999,
      originalPrice: 2999,
      badge: 'POPULAR',
      description: 'Master React Server Components, Server Actions, Tailwind CSS, and Prisma ORM.',
      modules: [
        { title: 'App Router & Server Actions', duration: '4h 00m' },
        { title: 'Database Schema with Prisma', duration: '5h 20m' },
        { title: 'Authentication & Payments Integration', duration: '4h 40m' },
        { title: 'Vercel Edge & Redis Caching', duration: '4h 00m' }
      ],
      capstoneTitle: 'B2B SaaS Subscription Dashboard',
      color: '#1E293B'
    },
    {
      id: 'course-4',
      title: 'Cloud DevOps: Docker, Kubernetes & CI/CD',
      category: 'DevOps',
      durationHours: '16 Hours',
      projectsCount: 4,
      rating: 4.7,
      studentsEnrolled: 980,
      price: 899,
      originalPrice: 2799,
      badge: 'HIGH DEMAND',
      description: 'From Linux fundamentals to Kubernetes cluster orchestration and GitHub Actions CI/CD.',
      modules: [
        { title: 'Docker Multistage Optimization', duration: '3h 30m' },
        { title: 'Kubernetes Cluster Architecture', duration: '5h 00m' },
        { title: 'GitHub Actions Automated CI/CD', duration: '4h 00m' },
        { title: 'Terraform Infrastructure as Code', duration: '3h 30m' }
      ],
      capstoneTitle: 'Zero-Downtime Blue-Green Kubernetes Pipeline',
      color: '#7C3AED'
    },
    {
      id: 'course-hacking',
      title: 'Ethical Hacking & Penetration Testing Masterclass',
      category: 'Ethical Hacking',
      durationHours: '26 Hours',
      projectsCount: 6,
      rating: 4.95,
      studentsEnrolled: 3420,
      price: 1499,
      originalPrice: 4999,
      badge: 'SPECIAL EDITION',
      description: 'Master offensive security, network sniffing, web app exploits, Metasploit, and bug bounties.',
      modules: [
        { title: 'Linux Shell Mastery & OSINT', duration: '4h 15m' },
        { title: 'Nmap, Wireshark & Packet Sniffing', duration: '5h 30m' },
        { title: 'Web Exploits: SQLi, XSS, CSRF', duration: '6h 45m' },
        { title: 'Metasploit, Reverse Shells & PrivEsc', duration: '5h 30m' },
        { title: 'Bug Bounty Reporting & Remediation', duration: '4h 00m' }
      ],
      capstoneTitle: 'Rooting a Vulnerable Banking Server (CTF)',
      color: '#DC2626'
    }
  ],

  jobs: [
    {
      id: 'job-1',
      role: 'AI Backend Developer Intern',
      company: 'HyperLocal AI',
      logoInitial: 'HL',
      location: 'Remote (India)',
      type: 'Internship',
      stipend: '₹30,000/mo',
      skills: ['FastAPI', 'Python', 'PostgreSQL', 'Docker'],
      matchPercentage: 100,
      postedAgo: '2h ago',
      isUrgent: true
    },
    {
      id: 'job-2',
      role: 'Flutter Mobile Engineer Intern',
      company: 'FinFlow India',
      logoInitial: 'FF',
      location: 'Bengaluru',
      type: 'Internship',
      stipend: '₹25,000/mo',
      skills: ['Flutter', 'Dart', 'Architecture'],
      matchPercentage: 85,
      postedAgo: '5h ago',
      isUrgent: true
    },
    {
      id: 'job-3',
      role: 'Junior Full-Stack Engineer',
      company: 'ZetaPay Fintech',
      logoInitial: 'ZP',
      location: 'Gurugram',
      type: 'Full-time',
      stipend: '₹8-12 LPA',
      skills: ['Next.js', 'TypeScript', 'Tailwind'],
      matchPercentage: 80,
      postedAgo: '1d ago',
      isUrgent: false
    },
    {
      id: 'job-4',
      role: 'Cloud & DevOps Intern',
      company: 'CloudScale Inc',
      logoInitial: 'CS',
      location: 'Remote',
      type: 'Internship',
      stipend: '₹20,000/mo',
      skills: ['Docker', 'Linux', 'AWS'],
      matchPercentage: 75,
      postedAgo: '2d ago',
      isUrgent: false
    }
  ]
};
