// Stroke icons adapted from Lucide (ISC licence).
const paths = {
	arrow: (
		<>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</>
	),
	check: <path d="M20 6 9 17l-5-5" />,
	code: (
		<>
			<path d="m16 18 6-6-6-6" />
			<path d="m8 6-6 6 6 6" />
		</>
	),
	phone: (
		<>
			<rect x="5" y="2" width="14" height="20" rx="2" />
			<path d="M12 18h.01" />
		</>
	),
	terminal: (
		<>
			<path d="m4 17 6-6-6-6" />
			<path d="M12 19h8" />
		</>
	),
	database: (
		<>
			<ellipse cx="12" cy="5" rx="9" ry="3" />
			<path d="M3 5v14a9 3 0 0 0 18 0V5" />
			<path d="M3 12a9 3 0 0 0 18 0" />
		</>
	),
	cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
	sparkles: (
		<>
			<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z" />
			<path d="M19 17v4" />
			<path d="M17 19h4" />
		</>
	),
	shield: (
		<>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
			<path d="m9 12 2 2 4-4" />
		</>
	),
	users: (
		<>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</>
	),
	wallet: (
		<>
			<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
			<path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
		</>
	),
	award: (
		<>
			<circle cx="12" cy="8" r="6" />
			<path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
		</>
	),
	message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
	file: (
		<>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<path d="M14 2v6h6" />
			<path d="M16 13H8" />
			<path d="M16 17H8" />
		</>
	),
	search: (
		<>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</>
	),
	user: (
		<>
			<circle cx="12" cy="8" r="4" />
			<path d="M20 21a8 8 0 0 0-16 0" />
		</>
	),
	plus: (
		<>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</>
	),
	briefcase: (
		<>
			<rect x="2" y="7" width="20" height="14" rx="2" />
			<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
		</>
	),
	book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
	building: (
		<>
			<rect x="4" y="2" width="16" height="20" rx="2" />
			<path d="M9 22v-4h6v4" />
			<path d="M8 6h.01" />
			<path d="M16 6h.01" />
			<path d="M8 10h.01" />
			<path d="M16 10h.01" />
			<path d="M8 14h.01" />
			<path d="M16 14h.01" />
		</>
	),
	scale: (
		<>
			<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
			<path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
			<path d="M7 21h10" />
			<path d="M12 3v18" />
			<path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
		</>
	),
	cpu: (
		<>
			<rect x="4" y="4" width="16" height="16" rx="2" />
			<rect x="9" y="9" width="6" height="6" />
			<path d="M15 2v2" />
			<path d="M15 20v2" />
			<path d="M2 15h2" />
			<path d="M2 9h2" />
			<path d="M20 15h2" />
			<path d="M20 9h2" />
			<path d="M9 2v2" />
			<path d="M9 20v2" />
		</>
	),
	zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
	star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
	external: (
		<>
			<path d="M15 3h6v6" />
			<path d="M10 14 21 3" />
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		</>
	),
	bot: (
		<>
			<rect x="3" y="11" width="18" height="10" rx="2" />
			<circle cx="12" cy="5" r="2" />
			<path d="M12 7v4" />
			<line x1="8" y1="16" x2="8" y2="16" />
			<line x1="16" y1="16" x2="16" y2="16" />
		</>
	),
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
	const iconContent = paths[name] || paths.sparkles;
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{iconContent}
		</svg>
	);
}
