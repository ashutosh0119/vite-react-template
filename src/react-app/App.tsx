import { useState } from "react";
import "./App.css";
import { Icon, type IconName } from "./Icon";
import { useReveal, useScroll } from "./hooks";

// --- TYPES & DATA ---
interface DigitalService {
	id: string;
	title: string;
	category: string;
	desc: string;
	startingPrice: string;
	timeline: string;
	icon: IconName;
	tags: string[];
}

interface RegistrationPackage {
	id: string;
	title: string;
	subtitle: string;
	price: string;
	timeline: string;
	icon: IconName;
	features: string[];
}

interface LearnCourse {
	id: string;
	title: string;
	category: string;
	rating: number;
	students: string;
	price: string;
	originalPrice: string;
	badge: string;
	icon: IconName;
	skills: string[];
}

// 1. Digital Services (from pragvix_digital app)
const digitalServices: DigitalService[] = [
	{
		id: "custom-mobile",
		title: "Custom Flutter & Android Apps",
		category: "Mobile Engineering",
		desc: "High-performance enterprise cross-platform mobile apps for Android and iOS with native responsiveness and offline sync.",
		startingPrice: "₹45,000",
		timeline: "3–5 Weeks",
		icon: "phone",
		tags: ["Flutter", "Dart", "Firebase", "REST APIs", "Play Store"],
	},
	{
		id: "fullstack-web",
		title: "Full-Stack Web & SaaS Portals",
		category: "Web Platforms",
		desc: "Scalable web architectures with React, Next.js, Node.js, and high-frequency PostgreSQL databases.",
		startingPrice: "₹35,000",
		timeline: "2–4 Weeks",
		icon: "code",
		tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Cloudflare"],
	},
	{
		id: "backend-cloud",
		title: "Enterprise Backend & Microservices",
		category: "Backend & Cloud",
		desc: "Secure REST/GraphQL API engines, microservices, containerization with Docker, and cloud orchestration.",
		startingPrice: "₹40,000",
		timeline: "3–4 Weeks",
		icon: "database",
		tags: ["FastAPI", "Go", "Docker", "AWS", "Redis"],
	},
	{
		id: "ai-automation",
		title: "AI Automation & Custom Agents",
		category: "Automation AI",
		desc: "Workflow automation, LLM integration, autonomous AI assistant bots, and business process accelerators.",
		startingPrice: "₹50,000",
		timeline: "2–4 Weeks",
		icon: "bot",
		tags: ["Python", "Gemini API", "LangChain", "Vector DB", "Automation"],
	},
];

// 2. Registration & Compliance Packages (from pragvix_digital app)
const registrationPackages: RegistrationPackage[] = [
	{
		id: "pvt-ltd",
		title: "Private Limited Company (Pvt Ltd)",
		subtitle: "India's Gold Standard for Startups",
		price: "₹6,999",
		timeline: "7–10 Business Days",
		icon: "building",
		features: [
			"Name Approval (RUN form)",
			"2 Director DSCs & DINs",
			"SPICe+ Part B & AGILE-PRO",
			"PAN, TAN & Bank Account Assistance",
			"PF & ESIC Registration",
		],
	},
	{
		id: "llp",
		title: "Limited Liability Partnership (LLP)",
		subtitle: "Best for Consultancies & Agencies",
		price: "₹4,999",
		timeline: "5–7 Business Days",
		icon: "scale",
		features: [
			"Name Reservation (RUN-LLP)",
			"2 Partner DSCs",
			"FiLLiP Form Filing",
			"Drafting of LLP Agreement",
			"Certificate of Incorporation",
		],
	},
	{
		id: "trademark",
		title: "Trademark & Brand Protection",
		subtitle: "Protect Your Brand Name & Logo",
		price: "₹2,499",
		timeline: "24–48 Hours",
		icon: "shield",
		features: [
			"Comprehensive Trademark Search",
			"Class Selection Advice",
			"Form TM-A Online Filing",
			"Government Receipt & Application No.",
			"Legal Representation Assistance",
		],
	},
	{
		id: "startup-india",
		title: "DPIIT Startup India Recognition",
		subtitle: "Tax Holidays & Government Schemes",
		price: "₹3,499",
		timeline: "3–5 Days",
		icon: "sparkles",
		features: [
			"DPIIT Portal Application",
			"Tax Exemption (Section 80-IAC) guidance",
			"Fast-Track Patent Assistance",
			"Self-Certification under Labor Laws",
		],
	},
];

// 3. Learn Featured Courses (from pragvix_web / pragvix-learn)
const learnCourses: LearnCourse[] = [
	{
		id: "fullstack-ai",
		title: "Full-Stack AI Software Architect Masterclass",
		category: "AI & Full-Stack",
		rating: 4.9,
		students: "2,480+",
		price: "₹4,999",
		originalPrice: "₹19,999",
		badge: "Bestseller",
		icon: "sparkles",
		skills: ["React 19", "Node.js", "Docker", "Gemini API", "Microservices"],
	},
	{
		id: "flutter-production",
		title: "Production Flutter & Mobile Architecture (Android/iOS)",
		category: "Mobile Apps",
		rating: 4.9,
		students: "1,920+",
		price: "₹3,999",
		originalPrice: "₹14,999",
		badge: "Industry Favorite",
		icon: "phone",
		skills: ["Flutter 3", "Dart", "BLoC/Riverpod", "Clean Architecture", "CI/CD"],
	},
	{
		id: "backend-distributed",
		title: "Distributed Backend & High-Scale Systems",
		category: "Cloud & Systems",
		rating: 4.8,
		students: "1,450+",
		price: "₹4,499",
		originalPrice: "₹16,999",
		badge: "Advanced",
		icon: "database",
		skills: ["Go", "Kafka", "PostgreSQL", "Kubernetes", "Redis"],
	},
	{
		id: "cybersecurity-devops",
		title: "Cloud Infrastructure, DevSecOps & Security",
		category: "DevOps & Security",
		rating: 4.9,
		students: "980+",
		price: "₹3,999",
		originalPrice: "₹15,499",
		badge: "Trending",
		icon: "shield",
		skills: ["AWS", "Terraform", "Docker", "OWASP", "CI/CD Pipelines"],
	},
];

export function App() {
	const [activePanelTab, setActivePanelTab] = useState<"digital" | "learn">("digital");
	const [digitalSubTab, setDigitalSubTab] = useState<"dev" | "reg">("dev");
	const { scrolled } = useScroll();
	const [menuOpen, setMenuOpen] = useState(false);
	useReveal();

	return (
		<div id="top" className="site-root">
			{/* TOP NAVBAR */}
			<header className={scrolled || menuOpen ? "nav scrolled" : "nav"}>
				<div className="container nav-inner">
					<a href="#top" className="brand-wrapper">
						<img src="/assets/pragvix_official_logo.png" alt="Pragvix Logo" className="brand-logo-img" />
						<div className="brand-text-col">
							<span className="brand-title">
								PRAGVIX <span className="glow-cyan">DIGITAL</span> &amp; <span className="glow-purple">LEARN</span>
							</span>
							<span className="brand-badge">
								Powered by <strong>SehatGraph Technologies Private Limited</strong>
							</span>
						</div>
					</a>

					<button
						className={menuOpen ? "menu-toggle open" : "menu-toggle"}
						aria-label="Toggle Navigation"
						onClick={() => setMenuOpen((o) => !o)}
					>
						<span />
						<span />
					</button>

					<nav className={menuOpen ? "nav-links open" : "nav-links"} onClick={() => setMenuOpen(false)}>
						<a href="#about-ecosystem" className="nav-item">Ecosystem</a>
						<a href="#digital-section" className="nav-item">Pragvix Digital</a>
						<a href="#learn-section" className="nav-item">Pragvix Learn</a>
						<a href="#panels-section" className="nav-item">Explore Panels</a>
						<a href="#governance" className="nav-item">Corporate Legal</a>
						
						<a href="/learn" className="btn btn-small btn-ghost" style={{ border: "1px solid rgba(56, 189, 248, 0.4)", color: "#38bdf8" }}>
							Course Catalog 🎓
						</a>
						<a href="/app" className="btn btn-small btn-primary">
							Student App →
						</a>
					</nav>
				</div>
			</header>

			{/* HERO SECTION */}
			<section className="hero">
				<div className="hero-bg">
					<div className="aurora aurora-a" />
					<div className="aurora aurora-b" />
					<div className="grid-lines" />
				</div>

				<div className="container hero-inner">
					<div className="hero-content">
						<div className="hero-eyebrow">
							<span className="live-dot" />
							Next-Gen Tech &amp; Autonomous Automation Ecosystem
						</div>

						<h1>
							PRAGVIX <span className="glow-cyan">DIGITAL</span>
							<br />
							&amp; <span className="glow-purple">LEARN</span>
						</h1>

						<p className="hero-subtitle">
							<strong>India's Dual Engine for Engineering Excellence.</strong> Powered by{" "}
							<strong>SehatGraph Technologies Private Limited</strong>. Pragvix Digital delivers cutting-edge
							software development and corporate legal automation, while Pragvix Learn empowers thousands with
							hands-on 1-on-1 industry engineering mastery.
						</p>

						<div className="hero-ctas">
							<a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("dev"); }} className="btn btn-digital btn-lg">
								<Icon name="briefcase" size={20} />
								Explore Pragvix Digital
							</a>
							<a href="#panels-section" onClick={() => setActivePanelTab("learn")} className="btn btn-learn btn-lg">
								<Icon name="book" size={20} />
								Explore Pragvix Learn
							</a>
							<a href="/app" className="btn btn-ghost btn-lg">
								Open Student Dashboard →
							</a>
						</div>

						<ul className="hero-pills">
							<li><Icon name="shield" size={16} /> Verified MCA Compliance</li>
							<li><Icon name="cpu" size={16} /> Autonomous CI/CD Automation</li>
							<li><Icon name="award" size={16} /> ISO Registered Standards</li>
						</ul>
					</div>

					{/* HERO RIGHT: AUTOMATION UI INTERACTIVE ENGINE */}
					<div className="hero-visual-card">
						<div className="scanner-line" />
						<div className="pulse-badge">
							<span className="live-dot" /> Automation Engine Active
						</div>

						<h3>
							<span>SehatGraph Core Architecture</span>
							<span style={{ fontSize: "0.8rem", color: "#38bdf8" }}>v2.4 Live</span>
						</h3>

						<div className="engine-grid">
							<div className="engine-item">
								<div className="engine-left">
									<div className="engine-icon icon-purple">
										<Icon name="briefcase" size={20} />
									</div>
									<div>
										<strong>Pragvix Digital Engine</strong>
										<small>Enterprise Apps • Web Dev • Legal MCA</small>
									</div>
								</div>
								<span className="status-indicator status-active">Operational</span>
							</div>

							<div className="engine-item">
								<div className="engine-left">
									<div className="engine-icon icon-green">
										<Icon name="book" size={20} />
									</div>
									<div>
										<strong>Pragvix Learn Ecosystem</strong>
										<small>77+ Tech Tracks • 1-on-1 Mentorship</small>
									</div>
								</div>
								<span className="status-indicator status-active">Active</span>
							</div>

							<div className="engine-item">
								<div className="engine-left">
									<div className="engine-icon icon-cyan">
										<Icon name="shield" size={20} />
									</div>
									<div>
										<strong>SehatGraph Technologies</strong>
										<small>Corporate Parent • IP &amp; Governance</small>
									</div>
								</div>
								<span className="status-indicator status-active">Verified</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* TECH MARQUEE BANNER */}
			<div className="marquee" aria-label="Ecosystem Technologies">
				<div className="marquee-track">
					{["Flutter 3.x", "React 19", "Python AI", "FastAPI", "TypeScript", "Docker", "PostgreSQL", "Cloudflare Workers", "MCA Automation", "DPIIT Certified", "Microservices", "Kubernetes", "Flutter 3.x", "React 19", "Python AI"].map((tech, idx) => (
						<div key={idx} className="marquee-item">
							<span className="dot" />
							<span>{tech}</span>
						</div>
					))}
				</div>
			</div>

			{/* DUAL PILLAR SECTION: WHAT EACH DOES */}
			<section id="about-ecosystem" className="pillars-section">
				<div className="container">
					<div className="center">
						<span className="section-badge corp">Two Unified Pillars</span>
						<h2 className="section-title">What Pragvix Digital &amp; Learn Do</h2>
						<p className="section-desc" style={{ margin: "0 auto 50px" }}>
							Under the leadership of SehatGraph Technologies Private Limited, Pragvix operates two dedicated
							divisions designed to empower modern businesses and tech innovators.
						</p>
					</div>

					<div className="pillars-grid">
						{/* PILLAR 1: PRAGVIX DIGITAL */}
						<div id="digital-section" className="pillar-card digital">
							<div className="pillar-header">
								<div className="pillar-icon-box digital">
									<Icon name="briefcase" size={28} />
								</div>
								<span className="section-badge digital">Enterprise &amp; Compliance</span>
								<h3>Pragvix Digital</h3>
								<p className="pillar-lead">
									<strong>Full-Cycle Digital Agency &amp; Business Legal Suite.</strong> We build scalable web &amp; mobile
									applications, design cloud infrastructure, and handle complete corporate legal registrations
									(Pvt Ltd, LLP, Trademarks, DPIIT) with automated tracking.
								</p>

								<ul className="pillar-features-list">
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>Custom App &amp; Web Engineering:</strong> Production-grade Flutter mobile apps, Next.js web applications, and microservice APIs.
										</div>
									</li>
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>Startup Incorporation &amp; Legal:</strong> Rapid Pvt Ltd / LLP registration, Trademark filings, and MCA compliance with real-time tracking.
										</div>
									</li>
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>Enterprise Milestone Architecture:</strong> Transparent deliverables, dedicated project managers, and automated security audits.
										</div>
									</li>
								</ul>
							</div>

							<div className="pillar-actions">
								<a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("dev"); }} className="btn btn-digital">
									Open Digital Panel <Icon name="arrow" size={16} />
								</a>
								<a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("reg"); }} className="btn btn-ghost">
									Company Registrations →
								</a>
							</div>
						</div>

						{/* PILLAR 2: PRAGVIX LEARN */}
						<div id="learn-section" className="pillar-card learn">
							<div className="pillar-header">
								<div className="pillar-icon-box learn">
									<Icon name="book" size={28} />
								</div>
								<span className="section-badge learn">Education &amp; Careers</span>
								<h3>Pragvix Learn</h3>
								<p className="pillar-lead">
									<strong>Premier Hands-On Engineering Career Ecosystem.</strong> We transition students and professionals
									into world-class software engineers through production codebases, 1-on-1 mentorship,
									verified portfolio capstones, and direct startup internship pipelines.
								</p>

								<ul className="pillar-features-list">
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>77+ Specialized Industry Tracks:</strong> Full-Stack AI, Cross-Platform Flutter, Distributed Go Systems, Cloud DevOps, and Cybersecurity.
										</div>
									</li>
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>1-on-1 Architect Guidance:</strong> Weekly personalized code reviews, mock technical interviews, and resume architectural overhauls.
										</div>
									</li>
									<li>
										<span className="check-icon"><Icon name="check" size={18} /></span>
										<div>
											<strong>Verifiable Certification &amp; Internships:</strong> Cryptographically signed QR certificate IDs and direct hiring pathways across high-growth startups.
										</div>
									</li>
								</ul>
							</div>

							<div className="pillar-actions">
								<a href="#panels-section" onClick={() => setActivePanelTab("learn")} className="btn btn-learn">
									Open Learn Panel <Icon name="arrow" size={16} />
								</a>
								<a href="/learn" className="btn btn-ghost">
									All 77+ Courses <Icon name="external" size={16} />
								</a>
								<a href="/app" className="btn btn-primary btn-small">
									Student Portal →
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* LIVE INTERACTIVE PANELS: PRAGVIX DIGITAL & LEARN */}
			<section id="panels-section" className="panels-section">
				<div className="container">
					<div className="panel-container">
						<div className="panel-tabs-header">
							<div>
								<span className="section-badge corp">Interactive Portals</span>
								<h3 style={{ fontSize: "1.9rem", color: "#ffffff", margin: "6px 0" }}>
									{activePanelTab === "digital" ? "Pragvix Digital Portal" : "Pragvix Learn Portal"}
								</h3>
								<p style={{ color: "#94a3b8", margin: 0, fontSize: "0.95rem" }}>
									{activePanelTab === "digital"
										? "Select between Software Engineering Services or Business Compliance Packages"
										: "Explore our industry-verified curriculum, learning tracks, and student platform"}
								</p>
							</div>

							<div className="panel-switch-buttons">
								<button
									className={`panel-tab-btn ${activePanelTab === "digital" ? "active digital" : ""}`}
									onClick={() => setActivePanelTab("digital")}
								>
									<Icon name="briefcase" size={18} />
									<span>Pragvix Digital Panel</span>
								</button>
								<button
									className={`panel-tab-btn ${activePanelTab === "learn" ? "active learn" : ""}`}
									onClick={() => setActivePanelTab("learn")}
								>
									<Icon name="book" size={18} />
									<span>Pragvix Learn Panel</span>
								</button>
							</div>
						</div>

						{/* --- TAB 1: PRAGVIX DIGITAL PANEL --- */}
						{activePanelTab === "digital" && (
							<div>
								<div className="sub-nav-row">
									<button
										className={`sub-pill-btn ${digitalSubTab === "dev" ? "active" : ""}`}
										onClick={() => setDigitalSubTab("dev")}
									>
										💻 Custom Software &amp; App Services
									</button>
									<button
										className={`sub-pill-btn ${digitalSubTab === "reg" ? "active" : ""}`}
										onClick={() => setDigitalSubTab("reg")}
									>
										🏛️ Company Registration &amp; Legal Compliance
									</button>
								</div>

								{digitalSubTab === "dev" ? (
									<div className="cards-catalog-grid">
										{digitalServices.map((service) => (
											<div key={service.id} className="catalog-card">
												<div>
													<div className="catalog-top">
														<span className="badge-tag blue">{service.category}</span>
														<span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>⏱️ {service.timeline}</span>
													</div>
													<h4>{service.title}</h4>
													<p>{service.desc}</p>
													<div className="tag-pills-row">
														{service.tags.map((t) => (
															<span key={t} className="tag-pill">{t}</span>
														))}
													</div>
												</div>
												<div className="catalog-foot">
													<div className="catalog-price">
														{service.startingPrice}
														<small>Starting investment</small>
													</div>
													<a href="mailto:support@pragvix.com?subject=Inquiry:%20" className="btn btn-small btn-digital">
														Request Quote <Icon name="arrow" size={14} />
													</a>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="cards-catalog-grid">
										{registrationPackages.map((pkg) => (
											<div key={pkg.id} className="catalog-card">
												<div>
													<div className="catalog-top">
														<span className="badge-tag purple">MCA Reg &amp; Tax</span>
														<span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>⏱️ {pkg.timeline}</span>
													</div>
													<h4>{pkg.title}</h4>
													<p style={{ color: "#38bdf8", fontWeight: 500 }}>{pkg.subtitle}</p>
													<div style={{ marginBottom: "20px" }}>
														{pkg.features.map((f, i) => (
															<div key={i} style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "6px" }}>
																<span style={{ color: "#34d399" }}>✓</span> {f}
															</div>
														))}
													</div>
												</div>
												<div className="catalog-foot">
													<div className="catalog-price">
														{pkg.price}
														<small>Government + Professional fees</small>
													</div>
													<a href="mailto:support@pragvix.com?subject=Registration:%20" className="btn btn-small btn-digital">
														Apply Now <Icon name="arrow" size={14} />
													</a>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{/* --- TAB 2: PRAGVIX LEARN PANEL --- */}
						{activePanelTab === "learn" && (
							<div>
								<div className="sub-nav-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
									<div style={{ display: "flex", gap: "10px" }}>
										<span className="sub-pill-btn active">Featured 77+ Course Catalog</span>
									</div>
									<div style={{ display: "flex", gap: "12px" }}>
										<a href="/learn" className="btn btn-small btn-learn">
											Full Catalog with Search &amp; Filters ↗
										</a>
										<a href="/app" className="btn btn-small btn-primary">
											Enter Student App →
										</a>
									</div>
								</div>

								<div className="cards-catalog-grid">
									{learnCourses.map((course) => (
										<div key={course.id} className="catalog-card">
											<div>
												<div className="catalog-top">
													<span className="badge-tag green">{course.badge}</span>
													<span style={{ fontSize: "0.82rem", color: "#fbbf24" }}>★ {course.rating} ({course.students})</span>
												</div>
												<h4>{course.title}</h4>
												<p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
													Industry project curriculum, live code debugging, and verified portfolio capstones.
												</p>
												<div className="tag-pills-row">
													{course.skills.map((s) => (
														<span key={s} className="tag-pill">{s}</span>
													))}
												</div>
											</div>
											<div className="catalog-foot">
												<div className="catalog-price">
													{course.price} <span style={{ textDecoration: "line-through", color: "#64748b", fontSize: "0.85rem", fontWeight: 400 }}>{course.originalPrice}</span>
													<small>Lifetime Access + Mentorship</small>
												</div>
												<a href="/learn" className="btn btn-small btn-learn">
													Enroll Now <Icon name="arrow" size={14} />
												</a>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* CORPORATE LEGAL & GOVERNANCE: SEHATGRAPH TECHNOLOGIES */}
			<section id="governance" className="corporate-section">
				<div className="container">
					<div className="corp-grid">
						<div>
							<span className="corp-badge">
								<Icon name="shield" size={16} /> Official Corporate Governance
							</span>
							<h2 className="section-title">Powered by SehatGraph Technologies Private Limited</h2>
							<p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "1.05rem", marginBottom: "20px" }}>
								Both <strong>Pragvix Digital</strong> and <strong>Pragvix Learn</strong> operate under the unified legal,
								technological, and regulatory framework of <strong>SehatGraph Technologies Private Limited</strong>.
							</p>
							<p style={{ color: "#94a3b8", lineHeight: 1.6, fontSize: "0.95rem" }}>
								From our enterprise customer agreements to student certifications and intellectual property protection,
								all services adhere strictly to Indian Ministry of Corporate Affairs (MCA) compliance, data privacy
								standards, and cryptographic verification.
							</p>

							<div className="corp-stat-row">
								<div className="corp-stat">
									<h4>100%</h4>
									<p>MCA &amp; GST Registered</p>
								</div>
								<div className="corp-stat">
									<h4>77+</h4>
									<p>Verified Tech Courses</p>
								</div>
								<div className="corp-stat">
									<h4>24/7</h4>
									<p>Autonomous Infrastructure</p>
								</div>
							</div>
						</div>

						<div className="corp-card-box">
							<div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
								<img src="/assets/pragvix_official_logo.png" alt="Company Logo" style={{ width: 44, height: 44, borderRadius: 10 }} />
								<div>
									<h4 style={{ margin: 0, color: "#ffffff", fontSize: "1.1rem" }}>SehatGraph Technologies Pvt. Ltd.</h4>
									<span style={{ fontSize: "0.75rem", color: "#38bdf8" }}>CIN Registered Corporate Entity</span>
								</div>
							</div>

							<div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "#94a3b8" }}>
								<div>
									<strong style={{ color: "#f1f5f9" }}>Corporate Headquarters:</strong>
									<div>India Operations &amp; Technology Center</div>
								</div>
								<div>
									<strong style={{ color: "#f1f5f9" }}>Official Divisions:</strong>
									<div>• Pragvix Digital (Software &amp; Corporate Registrations)</div>
									<div>• Pragvix Learn (Tech Education, Capstones &amp; Career Mentorship)</div>
								</div>
								<div>
									<strong style={{ color: "#f1f5f9" }}>Verification &amp; Support:</strong>
									<div>Official Desk: support@pragvix.com</div>
								</div>
							</div>

							<div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
								<a href="mailto:support@pragvix.com" className="btn btn-small btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
									Contact Corporate Office →
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="site-footer">
				<div className="container">
					<div className="footer-top-grid">
						<div className="footer-col">
							<div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
								<img src="/assets/pragvix_official_logo.png" alt="Logo" style={{ width: 36, height: 36, borderRadius: 8 }} />
								<span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#ffffff" }}>
									PRAGVIX
								</span>
							</div>
							<p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "320px" }}>
								Next-generation digital agency, startup registration platform, and hands-on developer training ecosystem.
								Proudly powered by SehatGraph Technologies Private Limited.
							</p>
						</div>

						<div className="footer-col">
							<h5>Pragvix Digital</h5>
							<ul className="footer-links-list">
								<li><a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("dev"); }}>Mobile App Development</a></li>
								<li><a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("dev"); }}>Web &amp; SaaS Portals</a></li>
								<li><a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("reg"); }}>Pvt Ltd Company Registration</a></li>
								<li><a href="#panels-section" onClick={() => { setActivePanelTab("digital"); setDigitalSubTab("reg"); }}>Trademark Filing</a></li>
							</ul>
						</div>

						<div className="footer-col">
							<h5>Pragvix Learn</h5>
							<ul className="footer-links-list">
								<li><a href="/learn">77+ Course Catalog</a></li>
								<li><a href="/app">Student Dashboard</a></li>
								<li><a href="/learn#founders">Founders' Desk</a></li>
								<li><a href="/learn#about">About Education</a></li>
							</ul>
						</div>

						<div className="footer-col">
							<h5>Legal &amp; Desk</h5>
							<ul className="footer-links-list">
								<li><a href="/learn#terms">Terms &amp; Conditions</a></li>
								<li><a href="/learn#terms">Privacy Policy</a></li>
								<li><a href="mailto:support@pragvix.com">Corporate Support</a></li>
								<li><a href="#governance">MCA Compliance</a></li>
							</ul>
						</div>
					</div>

					<div className="footer-bottom-bar">
						<div>
							© 2025–2026 <strong>Pragvix Digital &amp; Learn</strong>. Wholly owned and operated by{" "}
							<strong>SehatGraph Technologies Private Limited</strong>. All rights reserved.
						</div>
						<div style={{ display: "flex", gap: "20px" }}>
							<a href="/learn" style={{ color: "#94a3b8" }}>Course Portal</a>
							<a href="/app" style={{ color: "#94a3b8" }}>Student App</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
