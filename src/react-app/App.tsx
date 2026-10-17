import { useState, type CSSProperties, type FormEvent } from "react";
import "./App.css";
import { Icon, type IconName } from "./Icon";
import { trackSpotlight, useActiveSection, useReveal, useScroll } from "./hooks";

type Interest = "hire" | "freelance" | "learn";
type Audience = "business" | "developer";

const SECTIONS = ["digital", "learn", "learn-to-earn", "faq"];

const steps: Record<Audience, { icon: IconName; title: string; text: string }[]> = {
	business: [
		{ icon: "file", title: "Post your project", text: "Describe what you need built, your budget and your timeline." },
		{ icon: "search", title: "Match with developers", text: "Compare profiles, portfolios and proposals from verified developers." },
		{ icon: "wallet", title: "Pay by milestone", text: "Funds are released only when each milestone is delivered and approved." },
	],
	developer: [
		{ icon: "user", title: "Build your profile", text: "Show your skills, stack, certificates and past work in one place." },
		{ icon: "briefcase", title: "Pick your projects", text: "Browse briefs that match your skills and send focused proposals." },
		{ icon: "wallet", title: "Get paid on time", text: "Secure milestone payments, straight to your bank account." },
	],
};

const digitalFeatures: { icon: IconName; title: string; text: string }[] = [
	{ icon: "shield", title: "Verified developers", text: "Every profile is checked for skills and real work before it goes live." },
	{ icon: "wallet", title: "Milestone payments", text: "Money moves only when work is delivered — safe for both sides." },
	{ icon: "message", title: "Chat & files in one place", text: "Briefs, messages, files and feedback stay with the project." },
	{ icon: "clock", title: "Clear timelines", text: "Deadlines and progress for every milestone, always visible." },
];

const categories = ["Web Development", "Mobile Apps", "Backend & APIs", "UI / UX Design", "DevOps & Cloud", "AI & Automation"];

const stack = ["React", "Node.js", "Python", "TypeScript", "Kotlin", "Flutter", "Next.js", "MongoDB", "PostgreSQL", "Docker", "AWS", "Figma", "Git", "Tailwind"];

const tracks: { icon: IconName; title: string; text: string; skills: string[] }[] = [
	{ icon: "code", title: "Full-Stack Web", text: "From your first web page to a deployed full-stack app.", skills: ["HTML/CSS", "JavaScript", "React", "Node.js"] },
	{ icon: "phone", title: "App Development", text: "Build Android and cross-platform apps people can install.", skills: ["Kotlin", "Flutter", "Firebase"] },
	{ icon: "terminal", title: "Python & DSA", text: "Programming fundamentals and problem solving for interviews.", skills: ["Python", "Data structures", "Algorithms"] },
	{ icon: "database", title: "Backend & Databases", text: "APIs, authentication and data that scales.", skills: ["REST APIs", "SQL", "MongoDB", "Auth"] },
	{ icon: "cloud", title: "DevOps & Cloud", text: "Ship code with confidence, from laptop to production.", skills: ["Git", "Linux", "Docker", "CI/CD"] },
	{ icon: "sparkles", title: "AI for Developers", text: "Use AI tools and APIs to build smarter apps, faster.", skills: ["LLM APIs", "Prompting", "Automation"] },
];

const learnFeatures: { icon: IconName; title: string; text: string }[] = [
	{ icon: "code", title: "Project-first", text: "Every module ends with something real for your portfolio." },
	{ icon: "users", title: "Mentor support", text: "Code reviews and doubt-solving from working developers." },
	{ icon: "award", title: "Certificates", text: "Earn a certificate for each track you complete." },
	{ icon: "clock", title: "Your pace", text: "Live sessions plus recordings, so you never fall behind." },
];

const faqs = [
	{ q: "When does Pragvix launch?", a: "We're opening early access in stages. Join the list below and you'll be among the first to get in — for Digital, Learn, or both." },
	{ q: "Is Pragvix Learn suitable for complete beginners?", a: "Yes. Every track starts from the fundamentals and builds up project by project, with mentors to help when you get stuck." },
	{ q: "How do payments work on Pragvix Digital?", a: "Projects are split into milestones. The client funds a milestone, the developer delivers, and the payment is released once the work is approved." },
	{ q: "Can I learn on Pragvix and then freelance?", a: "That's exactly the idea. Certificates and projects from Pragvix Learn show up on your Pragvix Digital profile, so clients can see what you've built." },
	{ q: "What kind of projects can I hire for?", a: "Websites, mobile apps, backends and APIs, UI/UX design, DevOps and AI automation — anything software." },
];

function Logo() {
	return (
		<a href="#top" className="logo" aria-label="Pragvix home">
			<img src="/favicon.svg" alt="" width={32} height={32} />
			<span>Pragvix</span>
		</a>
	);
}

function d(ms: number) {
	return { "--d": `${ms}ms` } as CSSProperties;
}

function HeroVisual() {
	return (
		<div className="hero-visual" aria-hidden>
			<div className="mock mock-project float-a">
				<div className="mock-head">
					<span className="pill pill-digital">Pragvix Digital</span>
					<span className="mock-dim">Active project</span>
				</div>
				<h4>Food delivery app</h4>
				<p className="mock-dim">React Native · Node.js</p>
				<ul className="milestones">
					<li className="done">
						<Icon name="check" size={14} /> UI design
					</li>
					<li className="done">
						<Icon name="check" size={14} /> API integration
					</li>
					<li className="current">
						<span className="dot-pulse" /> App store launch
					</li>
				</ul>
				<div className="mock-foot">
					<div className="avatars">
						<span style={{ background: "#7c5cff" }}>A</span>
						<span style={{ background: "#22d3a6" }}>R</span>
						<span style={{ background: "#f59e0b" }}>S</span>
					</div>
					<span className="mock-dim">Milestone 2 of 3 paid</span>
				</div>
			</div>

			<div className="mock mock-course float-b">
				<div className="mock-head">
					<span className="pill pill-learn">Pragvix Learn</span>
					<span className="mock-dim">Full-Stack Web</span>
				</div>
				<div className="progress-row">
					<span>Course progress</span>
					<strong>68%</strong>
				</div>
				<div className="progress">
					<span />
				</div>
				<p className="mock-next">
					<span className="mock-dim">Up next</span>
					Build a REST API with Node.js
				</p>
			</div>

			<div className="mock mock-toast float-c">
				<span className="toast-icon">
					<Icon name="award" size={16} />
				</span>
				<div>
					<strong>Certificate earned</strong>
					<span className="mock-dim">React Fundamentals</span>
				</div>
			</div>

			<div className="mock mock-code float-b">
				<span className="code-dots">
					<i />
					<i />
					<i />
				</span>
				<pre>
					<span className="c-k">const</span> skills = <span className="c-f">learn</span>();{"\n"}
					<span className="c-k">await</span> <span className="c-f">earn</span>(skills);
					<span className="caret" />
				</pre>
			</div>
		</div>
	);
}

function WaitlistForm({ interest, setInterest }: { interest: Interest; setInterest: (i: Interest) => void }) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setStatus("sending");
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, interest }),
			});
			setStatus(res.ok ? "done" : "error");
		} catch {
			setStatus("error");
		}
	}

	if (status === "done") {
		return (
			<div className="form-done" role="status">
				<span className="done-icon">
					<Icon name="check" size={22} />
				</span>
				<strong>You're on the list!</strong>
				<p>We'll email you as soon as early access opens.</p>
			</div>
		);
	}

	const options = [
		["hire", "Hire developers"],
		["freelance", "Work as a freelancer"],
		["learn", "Learn to code"],
	] as const;

	return (
		<form className="waitlist" onSubmit={onSubmit}>
			<fieldset className="interest">
				<legend>I want to…</legend>
				{options.map(([value, label]) => (
					<label key={value} className={interest === value ? "chip active" : "chip"}>
						<input
							type="radio"
							name="interest"
							value={value}
							checked={interest === value}
							onChange={() => setInterest(value)}
						/>
						{interest === value && <Icon name="check" size={14} />}
						{label}
					</label>
				))}
			</fieldset>
			<div className="email-row">
				<label htmlFor="email" className="sr-only">
					Email address
				</label>
				<input
					id="email"
					type="email"
					required
					autoComplete="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button type="submit" className="btn btn-primary" disabled={status === "sending"}>
					{status === "sending" ? (
						<>
							<span className="spinner" /> Joining…
						</>
					) : (
						<>
							Get early access <Icon name="arrow" size={18} />
						</>
					)}
				</button>
			</div>
			{status === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
		</form>
	);
}

function Faq() {
	const [open, setOpen] = useState<number | null>(0);
	return (
		<div className="faq-list">
			{faqs.map((f, i) => {
				const isOpen = open === i;
				return (
					// `.reveal` sits on a wrapper whose className never changes, so React
					// re-renders can't wipe the `.in` class the observer added.
					<div key={f.q} className="reveal" style={d(i * 60)}>
					<div className={isOpen ? "faq-item open" : "faq-item"}>
						<button
							className="faq-q"
							aria-expanded={isOpen}
							aria-controls={`faq-${i}`}
							onClick={() => setOpen(isOpen ? null : i)}
						>
							{f.q}
							<span className="faq-icon">
								<Icon name="plus" size={18} />
							</span>
						</button>
						<div className="faq-a" id={`faq-${i}`} role="region">
							<div>
								<p>{f.a}</p>
							</div>
						</div>
					</div>
					</div>
				);
			})}
		</div>
	);
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [interest, setInterest] = useState<Interest>("hire");
	const [audience, setAudience] = useState<Audience>("business");
	const { progress, scrolled } = useScroll();
	const active = useActiveSection(SECTIONS);
	useReveal();

	const goJoin = (i: Interest) => () => setInterest(i);
	const navLink = (id: string, label: string) => (
		<a href={`#${id}`} className={active === id ? "active" : undefined}>
			{label}
		</a>
	);

	return (
		<div id="top">
			<div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />

			<header className={scrolled || menuOpen ? "nav scrolled" : "nav"}>
				<div className="container nav-inner">
					<Logo />
					<button
						className={menuOpen ? "menu-toggle open" : "menu-toggle"}
						aria-label="Toggle menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((o) => !o)}
					>
						<span />
						<span />
					</button>
					<nav className={menuOpen ? "nav-links open" : "nav-links"} onClick={() => setMenuOpen(false)}>
						{navLink("digital", "Digital")}
						{navLink("learn", "Learn")}
						{navLink("learn-to-earn", "Learn → Earn")}
						{navLink("faq", "FAQ")}
						<a href="/learn.html" className="btn btn-small" style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.4)" }}>
							Courses (77+) 🎓
						</a>
						<a href="/app.html" className="btn btn-small btn-primary">
							Student App →
						</a>
					</nav>
				</div>
			</header>

			<main>
				<section className="hero">
					<div className="hero-bg" aria-hidden>
						<div className="aurora aurora-a" />
						<div className="aurora aurora-b" />
						<div className="grid-lines" />
					</div>
					<div className="container hero-inner">
						<div className="hero-copy">
							<p className="eyebrow reveal">
								<span className="live-dot" /> Early access opening soon
							</p>
							<h1 className="reveal" style={d(80)}>
								Learn tech skills.
								<br />
								<span className="gradient-text">Get paid to use them.</span>
							</h1>
							<p className="lead reveal" style={d(160)}>
								Pragvix brings two platforms together. <strong>Pragvix Learn</strong> teaches coding and
								development through real projects. <strong>Pragvix Digital</strong> connects businesses
								with skilled developers for freelance work.
							</p>
							<div className="hero-ctas reveal" style={d(240)}>
								<a href="#join" className="btn btn-primary btn-lg" onClick={goJoin("hire")}>
									Hire a developer <Icon name="arrow" size={18} />
								</a>
								<a href="/learn.html" className="btn btn-ghost btn-lg">
									Courses (77+) <Icon name="arrow" size={18} />
								</a>
								<a href="/app.html" className="btn btn-learn btn-lg">
									Student App →
								</a>
							</div>
							<ul className="trust reveal" style={d(320)}>
								<li>
									<Icon name="shield" size={16} /> Verified developers
								</li>
								<li>
									<Icon name="wallet" size={16} /> Milestone payments
								</li>
								<li>
									<Icon name="users" size={16} /> Mentor-led courses
								</li>
							</ul>
						</div>
						<HeroVisual />
					</div>
				</section>

				<div className="marquee" aria-label="Technologies on Pragvix">
					<div className="marquee-track">
						{[...stack, ...stack].map((s, i) => (
							<span key={i} aria-hidden={i >= stack.length}>
								{s}
							</span>
						))}
					</div>
				</div>

				<section className="paths-section">
					<div className="container paths" onPointerMove={trackSpotlight}>
						<a href="#digital" className="path path-digital spot reveal">
							<span className="path-icon">
								<Icon name="briefcase" size={22} />
							</span>
							<span className="path-tag">Pragvix Digital</span>
							<h2>Freelancing built for developers</h2>
							<p>A marketplace where businesses meet trusted developers, with milestone-based payments.</p>
							<span className="path-cta">
								Explore Digital <Icon name="arrow" size={16} />
							</span>
						</a>
						<a href="/learn.html" className="path path-learn spot reveal" style={d(120)}>
							<span className="path-icon">
								<Icon name="book" size={22} />
							</span>
							<span className="path-tag">Pragvix Learn</span>
							<h2>Technical skills that pay</h2>
							<p>Hands-on courses in coding, web, app and backend development, guided by mentors.</p>
							<span className="path-cta">
								Explore 77+ Courses <Icon name="arrow" size={16} />
							</span>
						</a>
					</div>
				</section>

				<section id="digital" className="section">
					<div className="container">
						<div className="section-head reveal">
							<span className="badge badge-digital">Pragvix Digital</span>
							<h2>Get work done. Or get paid for yours.</h2>
							<p>
								A freelancing platform built for software work — clear briefs, verified developers and
								payments released milestone by milestone.
							</p>
						</div>

						<div className="how reveal">
							<div className="segmented" role="tablist" aria-label="Who is it for">
								<span className={`seg-pill ${audience}`} aria-hidden />
								<button
									role="tab"
									aria-selected={audience === "business"}
									onClick={() => setAudience("business")}
								>
									For businesses
								</button>
								<button
									role="tab"
									aria-selected={audience === "developer"}
									onClick={() => setAudience("developer")}
								>
									For developers
								</button>
							</div>

							<ol className="steps" key={audience}>
								{steps[audience].map((s, i) => (
									<li key={s.title} style={d(i * 90)}>
										<span className="step-num">{i + 1}</span>
										<span className="step-icon">
											<Icon name={s.icon} />
										</span>
										<strong>{s.title}</strong>
										<p>{s.text}</p>
									</li>
								))}
							</ol>

							<div className="how-cta">
								{audience === "business" ? (
									<a href="#join" className="btn btn-digital" onClick={goJoin("hire")}>
										Hire a developer <Icon name="arrow" size={18} />
									</a>
								) : (
									<a href="#join" className="btn btn-digital" onClick={goJoin("freelance")}>
										Start freelancing <Icon name="arrow" size={18} />
									</a>
								)}
							</div>
						</div>

						<div className="bento" onPointerMove={trackSpotlight}>
							{digitalFeatures.map((f, i) => (
								<article key={f.title} className="feature-card spot reveal" style={d(i * 80)}>
									<span className="icon-box icon-digital">
										<Icon name={f.icon} />
									</span>
									<h3>{f.title}</h3>
									<p>{f.text}</p>
								</article>
							))}
						</div>

						<div className="categories reveal">
							<span className="categories-label">Popular categories</span>
							{categories.map((c) => (
								<span key={c} className="tag">
									{c}
								</span>
							))}
						</div>
					</div>
				</section>

				<section id="learn" className="section section-alt">
					<div className="container">
						<div className="section-head reveal">
							<span className="badge badge-learn">Pragvix Learn</span>
							<h2>Learn to code by building real things.</h2>
							<p>
								Structured tracks that take you from fundamentals to job-ready, with projects, mentor reviews
								and certificates.
							</p>
						</div>

						<div className="grid-3" onPointerMove={trackSpotlight}>
							{tracks.map((t, i) => (
								<article key={t.title} className="card spot spot-learn reveal" style={d((i % 3) * 90)}>
									<span className="icon-box icon-learn">
										<Icon name={t.icon} />
									</span>
									<h3>{t.title}</h3>
									<p>{t.text}</p>
									<div className="skills">
										{t.skills.map((s) => (
											<span key={s}>{s}</span>
										))}
									</div>
								</article>
							))}
						</div>

						<div className="features reveal">
							{learnFeatures.map((f) => (
								<div key={f.title} className="feature">
									<span className="feature-icon">
										<Icon name={f.icon} size={18} />
									</span>
									<div>
										<strong>{f.title}</strong>
										<p>{f.text}</p>
									</div>
								</div>
							))}
						</div>

						<div className="center reveal" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
							<a href="/learn.html" className="btn btn-learn">
								Explore All 77+ Courses <Icon name="arrow" size={18} />
							</a>
							<a href="/app.html" className="btn btn-ghost">
								Open Student Dashboard →
							</a>
						</div>
					</div>
				</section>

				<section id="learn-to-earn" className="section">
					<div className="container">
						<div className="section-head center-head reveal">
							<span className="badge badge-mix">Learn → Earn</span>
							<h2>From first line of code to first paid project.</h2>
						</div>
						<div className="bridge reveal">
							<div className="bridge-line" aria-hidden>
								<span />
							</div>
							{[
								{ n: 1, cls: "learn", title: "Learn", text: "Complete a track on Pragvix Learn and build a portfolio of real projects." },
								{ n: 2, cls: "mix", title: "Get verified", text: "Your certificates and projects appear on your Pragvix Digital profile." },
								{ n: 3, cls: "digital", title: "Earn", text: "Take on freelance projects from clients looking for your skills." },
							].map((s, i) => (
								<div key={s.n} className="bridge-step" style={d(300 + i * 250)}>
									<span className={`bridge-num ${s.cls}`}>{s.n}</span>
									<h3>{s.title}</h3>
									<p>{s.text}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="faq" className="section section-alt">
					<div className="container faq">
						<div className="section-head reveal">
							<span className="badge badge-neutral">FAQ</span>
							<h2>Questions, answered.</h2>
							<p>Everything you need to know before early access opens.</p>
						</div>
						<Faq />
					</div>
				</section>

				<section id="join" className="section join">
					<div className="container">
						<div className="join-card reveal">
							<div className="join-glow" aria-hidden />
							<h2>Be the first in.</h2>
							<p>Join early access for Pragvix Digital and Pragvix Learn. No spam — just launch news.</p>
							<WaitlistForm interest={interest} setInterest={setInterest} />
						</div>
					</div>
				</section>
			</main>

			<footer className="footer">
				<div className="container footer-inner">
					<div className="footer-brand">
						<Logo />
						<p>Learn tech skills. Get paid to use them.</p>
					</div>
					<nav>
						<a href="#digital">Digital</a>
						<a href="#learn">Learn</a>
						<a href="#faq">FAQ</a>
						<a href="#join">Early access</a>
					</nav>
				</div>
				<div className="container footer-bottom">
					<p>© {new Date().getFullYear()} Pragvix. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
