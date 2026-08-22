const setupReveal = () => {
	const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal, [data-reveal]'));

	if (!nodes.length) return;

	document.documentElement.dataset.revealReady = '';

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
		nodes.forEach((node) => node.setAttribute('data-revealed', ''));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.setAttribute('data-revealed', '');
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -9% 0px', threshold: 0.08 },
	);

	nodes.forEach((node) => observer.observe(node));
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupReveal, { once: true });
} else {
	setupReveal();
}
