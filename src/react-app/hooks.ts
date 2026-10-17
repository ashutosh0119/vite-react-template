import { useEffect, useState, type PointerEvent } from "react";

/** Adds `.in` to every `.reveal` element once it scrolls into view. */
export function useReveal() {
	useEffect(() => {
		const els = document.querySelectorAll<HTMLElement>(".reveal");
		if (!("IntersectionObserver" in window)) {
			els.forEach((el) => el.classList.add("in"));
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}

/** Scroll position as a 0–1 fraction of the page, plus whether we've left the top. */
export function useScroll() {
	const [state, setState] = useState({ progress: 0, scrolled: false });
	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setState({ progress: max > 0 ? window.scrollY / max : 0, scrolled: window.scrollY > 12 });
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);
	return state;
}

/** Id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
	const [active, setActive] = useState("");
	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(e.target.id);
					else setActive((cur) => (cur === e.target.id ? "" : cur));
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	}, [ids]);
	return active;
}

/** Pointer handler that moves the glow on the nearest `.spot` card. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
	const el = (e.target as HTMLElement).closest<HTMLElement>(".spot");
	if (!el) return;
	const r = el.getBoundingClientRect();
	el.style.setProperty("--mx", `${e.clientX - r.left}px`);
	el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
