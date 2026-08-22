import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CatRail from '../../src/components/ui/CatRail';

const items = [
  {
    src: '/images/cat-one.webp',
    alt: 'Чёрно-белый кот сидит на кресле',
    caption: 'Спокойный вечер в котокафе',
  },
  {
    src: '/images/cat-two.webp',
    alt: 'Рыжий кот лежит у окна',
    caption: 'Котик отдыхает у окна',
  },
  {
    src: '/images/cat-three.webp',
    alt: 'Серый кот смотрит в камеру',
    caption: 'Живой кадр из зала',
  },
];

describe('CatRail', () => {
  it('renders documentary images with descriptive alternatives', () => {
    render(<CatRail items={items} />);

    for (const item of items) {
      expect(screen.getByRole('img', { name: item.alt })).toBeInTheDocument();
      expect(screen.getByText(item.caption)).toBeInTheDocument();
    }
  });

  it('announces its position and exposes usable previous and next controls', () => {
    render(<CatRail items={items} />);

    const rail = screen.getByRole('region', { name: 'Фотографии котиков' });
    const previous = within(rail).getByRole('button', {
      name: 'Предыдущая фотография',
    });
    const next = within(rail).getByRole('button', {
      name: 'Следующая фотография',
    });
    const status = within(rail).getByText('Фото 1 из 3');

    expect(rail).toHaveAttribute('tabindex', '0');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    fireEvent.click(next);

    expect(within(rail).getByText('Фото 2 из 3')).toBeInTheDocument();
    expect(previous).toBeEnabled();
  });

  it('supports ArrowLeft and ArrowRight without moving past either end', () => {
    render(<CatRail items={items} />);

    const rail = screen.getByRole('region', { name: 'Фотографии котиков' });
    const previous = within(rail).getByRole('button', {
      name: 'Предыдущая фотография',
    });
    const next = within(rail).getByRole('button', {
      name: 'Следующая фотография',
    });

    fireEvent.keyDown(rail, { key: 'ArrowRight' });
    fireEvent.keyDown(rail, { key: 'ArrowRight' });
    fireEvent.keyDown(rail, { key: 'ArrowRight' });

    expect(within(rail).getByText('Фото 3 из 3')).toBeInTheDocument();
    expect(next).toBeDisabled();

    fireEvent.keyDown(rail, { key: 'ArrowLeft' });

    expect(within(rail).getByText('Фото 2 из 3')).toBeInTheDocument();
    expect(previous).toBeEnabled();
  });
});
