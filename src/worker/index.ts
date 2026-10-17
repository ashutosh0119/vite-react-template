import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

const INTERESTS = ["hire", "freelance", "learn"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/waitlist", async (c) => {
	const body = await c.req.json<{ email?: string; interest?: string }>().catch(() => null);
	const email = body?.email?.trim().toLowerCase();
	const interest = body?.interest;

	if (!email || !EMAIL_RE.test(email) || email.length > 254) {
		return c.json({ ok: false, error: "Invalid email" }, 400);
	}
	if (!interest || !INTERESTS.includes(interest)) {
		return c.json({ ok: false, error: "Invalid interest" }, 400);
	}

	// TODO: persist signups (e.g. a D1 table or KV namespace). For now they
	// are visible in the Worker's logs (observability is enabled in wrangler.json).
	console.log(JSON.stringify({ event: "waitlist_signup", email, interest, at: new Date().toISOString() }));

	return c.json({ ok: true });
});

app.get("/app", (c) => c.redirect("/app.html"));
app.get("/dashboard", (c) => c.redirect("/app.html"));
app.get("/learn", (c) => c.redirect("/learn.html"));
app.get("/courses", (c) => c.redirect("/learn.html#courses"));

export default app;
