import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SiteNavigation from '../../src/components/ui/SiteNavigation';

function renderNavigation() {
  return render(
    <>
      <SiteNavigation />
      <main>
        <section id="cats" tabIndex={-1}>
          <h2>Котики</h2>
        </section>
      </main>
    </>,
  );
}

describe('SiteNavigation', () => {
  it('exposes the mobile menu state through its accessible toggle', () => {
    renderNavigation();

    const toggle = screen.getByRole('button', {
      name: 'Открыть меню',
    });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName('Закрыть меню');
  });

  it('closes on Escape and restores focus to the menu toggle', async () => {
    renderNavigation();

    const toggle = screen.getByRole('button', {
      name: 'Открыть меню',
    });

    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => document.activeElement).toBe(toggle);
  });

  it('closes after an anchor choice and moves focus to the target section', async () => {
    renderNavigation();

    const navigation = screen.getByRole('navigation', {
      name: 'Основная навигация',
    });
    const toggle = screen.getByRole('button', {
      name: 'Открыть меню',
    });

    fireEvent.click(toggle);
    fireEvent.click(within(navigation).getByRole('link', { name: 'Котики' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => document.activeElement).toBe(document.querySelector('#cats'));
  });
});
