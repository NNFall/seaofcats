import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';

import styles from './CatRail.module.css';

export interface CatRailItem {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  caption: string;
}

interface CatRailProps {
  items: readonly CatRailItem[];
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export default function CatRail({ items }: CatRailProps) {
  const railId = useId();
  const railRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maximumIndex, setMaximumIndex] = useState(Math.max(0, items.length - 1));

  const measureRail = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const cards = Array.from(rail.children) as HTMLElement[];

    if (cards.length === 0) {
      setActiveIndex(0);
      setMaximumIndex(0);
      return;
    }

    const railStyles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(railStyles.columnGap || railStyles.gap) || 0;
    const cardWidth = cards[0]?.getBoundingClientRect().width ?? 0;
    const visibleCount =
      cardWidth > 0
        ? Math.max(1, Math.floor((rail.clientWidth + gap + 1) / (cardWidth + gap)))
        : 1;
    const nextMaximumIndex = Math.max(0, items.length - visibleCount);
    const railStart = rail.getBoundingClientRect().left;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railStart);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setMaximumIndex(nextMaximumIndex);
    setActiveIndex(clamp(nearestIndex, 0, nextMaximumIndex));
  }, [items.length]);

  const scheduleMeasurement = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureRail();
    });
  }, [measureRail]);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return undefined;
    }

    measureRail();

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measureRail);

    resizeObserver?.observe(rail);
    window.addEventListener('resize', measureRail);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measureRail);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [measureRail]);

  const moveTo = useCallback(
    (requestedIndex: number) => {
      const rail = railRef.current;

      if (!rail) {
        return;
      }

      const nextIndex = clamp(requestedIndex, 0, maximumIndex);
      const card = rail.children.item(nextIndex) as HTMLElement | null;

      if (!card) {
        return;
      }

      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const left =
        rail.scrollLeft + card.getBoundingClientRect().left - rail.getBoundingClientRect().left;

      if (typeof rail.scrollTo === 'function') {
        rail.scrollTo({
          left,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      } else {
        rail.scrollLeft = left;
      }
      setActiveIndex(nextIndex);
    },
    [maximumIndex],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveTo(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveTo(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      moveTo(maximumIndex);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.root}
      role="region"
      aria-label="Фотографии котиков"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
		<ul
			className={styles.rail}
			id={railId}
			ref={railRef}
			aria-label="Лента фотографий котиков"
			tabIndex={0}
			onScroll={scheduleMeasurement}
		>
        {items.map((item, index) => (
          <li
            className={styles.item}
            key={item.src}
            aria-label={`Кадр ${index + 1} из ${items.length}`}
          >
            <figure className={styles.card}>
              <div className={styles.imageFrame}>
                <img
                  className={styles.image}
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.captionNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={styles.toolbar}>
        <button
          className={styles.control}
          type="button"
          aria-label="Предыдущая фотография"
          aria-controls={railId}
          disabled={activeIndex === 0}
          onClick={() => moveTo(activeIndex - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 5.5 8 12l6.5 6.5M8.5 12H20" />
          </svg>
        </button>

        <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
          Фото {activeIndex + 1} из {items.length}
        </p>

        <button
          className={styles.control}
          type="button"
          aria-label="Следующая фотография"
          aria-controls={railId}
          disabled={activeIndex === maximumIndex}
          onClick={() => moveTo(activeIndex + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9.5 5.5 6.5 6.5-6.5 6.5M4 12h11.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
