import { useEffect, useId, useRef, useState } from 'react';
import { navigation, site } from '../../data/site';
import mascot from '../../assets/images/brand/mascot.png';
import styles from './SiteNavigation.module.css';

const focusAnchorTarget = (href: string) => {
	if (!href.startsWith('#')) return;

	const targetId = decodeURIComponent(href.slice(1));
	const target = document.getElementById(targetId);

	if (!target) return;

	const needsTemporaryTabIndex = !target.hasAttribute('tabindex');

	if (needsTemporaryTabIndex) {
		target.setAttribute('tabindex', '-1');
	}

	target.focus({ preventScroll: true });

	if (needsTemporaryTabIndex) {
		target.addEventListener('blur', () => target.removeAttribute('tabindex'), {
			once: true,
		});
	}
};

const PhoneIcon = () => (
	<svg aria-hidden="true" className={styles.phoneIcon} viewBox="0 0 24 24">
		<path d="M7.3 3.75 9.7 8.2 7.92 9.77a14.7 14.7 0 0 0 6.3 6.3l1.58-1.77 4.45 2.4v2.16a1.7 1.7 0 0 1-1.7 1.7A15.1 15.1 0 0 1 3.44 5.45a1.7 1.7 0 0 1 1.7-1.7H7.3Z" />
	</svg>
);

const MenuIcon = ({ open }: { open: boolean }) => (
	<svg aria-hidden="true" className={styles.menuIcon} viewBox="0 0 24 24">
		<path className={styles.menuIconTop} d="M4 7.5h16" data-open={open} />
		<path className={styles.menuIconMiddle} d="M4 12h16" data-open={open} />
		<path className={styles.menuIconBottom} d="M4 16.5h16" data-open={open} />
	</svg>
);

export default function SiteNavigation() {
	const [isOpen, setIsOpen] = useState(false);
	const reactId = useId();
	const panelId = `site-menu-${reactId.replaceAll(':', '')}`;
	const toggleRef = useRef<HTMLButtonElement>(null);
	const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const focusFrame = window.requestAnimationFrame(() => {
			firstMobileLinkRef.current?.focus();
		});

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;

			event.preventDefault();
			setIsOpen(false);
			toggleRef.current?.focus();
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	const handleAnchorClick = (href: string) => {
		setIsOpen(false);
		focusAnchorTarget(href);
	};

	return (
		<header className={styles.siteHeader}>
			<div className={styles.inner}>
				<a
					aria-label={`${site.business.name} — на главную`}
					className={styles.brand}
					href={import.meta.env.BASE_URL}
				>
					<img
						alt=""
						aria-hidden="true"
						className={styles.brandMark}
						height={mascot.height}
						src={mascot.src}
						width={mascot.width}
					/>
					<span className={styles.brandCopy}>
						<span className={styles.brandName}>{site.business.name}</span>
						<span className={styles.brandFormat}>{site.business.format}</span>
					</span>
				</a>

				<nav aria-label="Основная навигация" className={styles.desktopNav}>
					<ul className={styles.desktopList}>
						{navigation.map((item) => (
							<li key={item.href}>
								<a href={item.href} onClick={() => handleAnchorClick(item.href)}>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<a
					aria-label={`Позвонить: ${site.business.phone.display}`}
					className={styles.phoneCta}
					href={site.business.phone.href}
				>
					<PhoneIcon />
					<span>Позвонить</span>
				</a>

				<button
					aria-controls={panelId}
					aria-expanded={isOpen}
					aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
					className={styles.menuButton}
					onClick={() => setIsOpen((open) => !open)}
					ref={toggleRef}
					type="button"
				>
					<MenuIcon open={isOpen} />
					<span>Меню</span>
				</button>
			</div>

			<div className={styles.mobilePanel} hidden={!isOpen} id={panelId}>
				<nav aria-label="Мобильная навигация" className={styles.mobileNav}>
					<ul className={styles.mobileList}>
						{navigation.map((item, index) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={() => handleAnchorClick(item.href)}
									ref={index === 0 ? firstMobileLinkRef : undefined}
								>
									<span>{item.label}</span>
									<svg aria-hidden="true" viewBox="0 0 20 20">
										<path d="m7 4 6 6-6 6" />
									</svg>
								</a>
							</li>
						))}
					</ul>
					<a
						aria-label={`Позвонить: ${site.business.phone.display}`}
						className={styles.mobilePhoneCta}
						href={site.business.phone.href}
					>
						<PhoneIcon />
						<span>Позвонить</span>
						<small>{site.business.phone.display}</small>
					</a>
				</nav>
			</div>
		</header>
	);
}
