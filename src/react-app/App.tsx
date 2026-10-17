import { useState, type FormEvent } from "react";
import "./App.css";

type Interest = "hire" | "freelance" | "learn";

const digitalClientSteps = [
	{ title: "Post your project", text: "Describe what you need built, your budget and timeline." },
	{ title: "Match with developers", text: "Review profiles, portfolios and proposals from vetted developers." },
	{ title: "Pay by milestone", text: "Funds are released only when each milestone is delivered." },
];

const digitalDevSteps = [
	{ title: "Build your profile", text: "Show your skills, stack and past work in one place." },
	{ title: "Pick your projects", text: "Browse briefs that match your skills and send proposals." },
	{ title: "Get paid on time", text: "Secure milestone payments, straight to your account." },
];

const digitalCategories = [
	"Web Development",
	"Mobile Apps",
	"Backend & APIs",
	"UI / UX Design",
	"DevOps & Cloud",
	"AI & Automation",
];

const learnTracks = [
	{ icon: "</>", title: "Full-Stack Web", text: "HTML, CSS, JavaScript, React and Node.js — from first page to deployed app." },
	{ icon: "📱", title: "App Development", text: "Build Android and cross-platform apps with Kotlin and Flutter." },
	{ icon: "🐍", title: "Python & DSA", text: "Programming fundamentals, data structures and problem solving for interviews." },
	{ icon: "⚙", title: "Backend & Databases", text: "APIs, authentication, SQL and NoSQL databases, and system basics." },
	{ icon: "☁", title: "DevOps & Cloud", text: "Git, Linux, Docker, CI/CD and shipping to the cloud." },
	{ icon: "✦", title: "AI for Developers", text: "Use AI tools and APIs to build smarter apps, faster." },
];

const learnFeatures = [
	{ title: "Project-first", text: "Every module ends with something real you can put in your portfolio." },
	{ title: "Mentor support", text: "Get your code reviewed and your doubts cleared by working developers." },
	{ title: "Certificates", text: "Earn a certificate for each track you complete." },
	{ title: "Learn at your pace", text: "Live sessions plus recordings, so you never fall behind." },
];

function Logo() {
	return (
		<a href="#top" className="logo" aria-label="Pragvix home">
			<img src="/favicon.svg" alt="" width={32} height={32} />
			<span>Pragvix</span>
		</a>
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
				<strong>You're on the list!</strong>
				<p>We'll email you as soon as early access opens.</p>
			</div>
		);
	}

	return (
		<form className="waitlist" onSubmit={onSubmit}>
			<fieldset className="interest">
				<legend>I want to…</legend>
				{(
					[
						["hire", "Hire developers"],
						["freelance", "Work as a freelancer"],
						["learn", "Learn to code"],
					] as const
				).map(([value, label]) => (
					<label key={value} className={interest === value ? "chip active" : "chip"}>
						<input
							type="radio"
							name="interest"
							value={value}
							checked={interest === value}
							onChange={() => setInterest(value)}
						/>
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
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button type="submit" className="btn btn-primary" disabled={status === "sending"}>
					{status === "sending" ? "Joining…" : "Get early access"}
				</button>
			</div>
			{status === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
		</form>
	);
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [interest, setInterest] = useState<Interest>("hire");

	const goJoin = (i: Interest) => () => setInterest(i);

	return (
		<div id="top">
			<header className="nav">
				<div className="container nav-inner">
					<Logo />
					<button
						className="menu-toggle"
						aria-label="Toggle menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((o) => !o)}
					>
						<span />
						<span />
					</button>
					<nav className={menuOpen ? "nav-links open" : "nav-links"} onClick={() => setMenuOpen(false)}>
						<a href="#digital">Pragvix Digital</a>
						<a href="#learn">Pragvix Learn</a>
						<a href="#learn-to-earn">Learn → Earn</a>
						<a href="#join" className="btn btn-small">
							Join early access
						</a>
					</nav>
				</div>
			</header>

			<main>
				<section className="hero">
					<div className="glow glow-a" aria-hidden />
					<div className="glow glow-b" aria-hidden />
					<div className="container">
						<p className="eyebrow">Launching soon · pragvix.in</p>
						<h1>
							One platform.
							<br />
							<span className="gradient-text">Two ways to grow in tech.</span>
						</h1>
						<p className="lead">
							Hire skilled developers or find freelance work on <strong>Pragvix Digital</strong>. Learn
							coding and software development by building real projects on <strong>Pragvix Learn</strong>.
						</p>

						<div className="paths">
							<a href="#digital" className="path path-digital">
								<span className="path-tag">Pragvix Digital</span>
								<h2>Freelancing for developers</h2>
								<p>A marketplace where businesses meet trusted developers, with milestone-based payments.</p>
								<span className="path-cta">Explore Digital →</span>
							</a>
							<a href="#learn" className="path path-learn">
								<span className="path-tag">Pragvix Learn</span>
								<h2>Technical skills that pay</h2>
								<p>Hands-on courses in coding, web, app and backend development, guided by mentors.</p>
								<span className="path-cta">Explore Learn →</span>
							</a>
						</div>
					</div>
				</section>

				<section id="digital" className="section">
					<div className="container">
						<div className="section-head">
							<span className="badge badge-digital">Pragvix Digital</span>
							<h2>Get work done. Or get paid for yours.</h2>
							<p>
								A freelancing platform built for software work — clear briefs, verified developers and
								payments released milestone by milestone.
							</p>
						</div>

						<div className="two-col">
							<div className="panel">
								<h3>For businesses</h3>
								<ol className="steps steps-digital">
									{digitalClientSteps.map((s) => (
										<li key={s.title}>
											<strong>{s.title}</strong>
											<p>{s.text}</p>
										</li>
									))}
								</ol>
								<a href="#join" className="btn btn-digital" onClick={goJoin("hire")}>
									Hire a developer
								</a>
							</div>
							<div className="panel">
								<h3>For developers</h3>
								<ol className="steps steps-digital">
									{digitalDevSteps.map((s) => (
										<li key={s.title}>
											<strong>{s.title}</strong>
											<p>{s.text}</p>
										</li>
									))}
								</ol>
								<a href="#join" className="btn btn-outline" onClick={goJoin("freelance")}>
									Start freelancing
								</a>
							</div>
						</div>

						<div className="categories">
							{digitalCategories.map((c) => (
								<span key={c} className="tag">
									{c}
								</span>
							))}
						</div>
					</div>
				</section>

				<section id="learn" className="section section-alt">
					<div className="container">
						<div className="section-head">
							<span className="badge badge-learn">Pragvix Learn</span>
							<h2>Learn to code by building real things.</h2>
							<p>
								Structured tracks that take you from fundamentals to job-ready, with projects, mentor reviews
								and certificates.
							</p>
						</div>

						<div className="grid-3">
							{learnTracks.map((t) => (
								<article key={t.title} className="card">
									<span className="card-icon" aria-hidden>
										{t.icon}
									</span>
									<h3>{t.title}</h3>
									<p>{t.text}</p>
								</article>
							))}
						</div>

						<div className="features">
							{learnFeatures.map((f) => (
								<div key={f.title} className="feature">
									<strong>{f.title}</strong>
									<p>{f.text}</p>
								</div>
							))}
						</div>

						<div className="center">
							<a href="#join" className="btn btn-learn" onClick={goJoin("learn")}>
								Start learning
							</a>
						</div>
					</div>
				</section>

				<section id="learn-to-earn" className="section">
					<div className="container">
						<div className="bridge">
							<div className="bridge-step">
								<span className="bridge-num learn">1</span>
								<h3>Learn</h3>
								<p>Complete a track on Pragvix Learn and build a portfolio of real projects.</p>
							</div>
							<div className="bridge-arrow" aria-hidden>
								→
							</div>
							<div className="bridge-step">
								<span className="bridge-num mix">2</span>
								<h3>Get verified</h3>
								<p>Your certificates and projects show up on your Pragvix Digital profile.</p>
							</div>
							<div className="bridge-arrow" aria-hidden>
								→
							</div>
							<div className="bridge-step">
								<span className="bridge-num digital">3</span>
								<h3>Earn</h3>
								<p>Take on your first freelance projects with clients who are looking for you.</p>
							</div>
						</div>
						<p className="bridge-caption">
							<strong>Learn → Earn.</strong> Pragvix connects both sides, so skills you learn turn into
							paid work.
						</p>
					</div>
				</section>

				<section id="join" className="section join">
					<div className="container join-inner">
						<h2>Be the first in.</h2>
						<p>Join early access for Pragvix Digital and Pragvix Learn. No spam, just launch news.</p>
						<WaitlistForm interest={interest} setInterest={setInterest} />
					</div>
				</section>
			</main>

			<footer className="footer">
				<div className="container footer-inner">
					<Logo />
					<nav>
						<a href="#digital">Digital</a>
						<a href="#learn">Learn</a>
						<a href="#join">Early access</a>
					</nav>
					<p>© {new Date().getFullYear()} Pragvix. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
