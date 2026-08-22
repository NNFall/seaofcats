import { describe, expect, it } from 'vitest';

import { siteData } from '../../src/data/site';

describe('siteData verified public facts', () => {
  it('stores the verified venue identity and phone number exactly', () => {
    expect(siteData.business).toMatchObject({
      name: 'Море Котиков',
      format: 'Котокафе-антикафе',
      address: {
        display: 'Самара, Дыбенко 33А',
        streetAddress: 'улица Дыбенко, 33А',
        addressLocality: 'Самара',
        addressCountry: 'RU',
      },
      phone: {
        display: '+7 902 299-55-43',
        href: 'tel:+79022995543',
      },
    });
  });

  it('records the dated opening-hours fact without presenting it as timeless', () => {
    expect(siteData.hours.sourceCheckedAt).toBe('2026-08-23');
    expect(siteData.hours.schedule).toEqual([
      {
        label: 'Понедельник',
        days: ['Monday'],
        closed: true,
      },
      {
        label: 'Вторник–воскресенье',
        days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '13:00',
        closes: '20:00',
        closed: false,
      },
    ]);
  });

  it.each([
    ['VK', 'vk', /(^|\.)vk\.ru$/],
    ['MAX', 'max', /(^|\.)max\.ru$/],
    ['маршрут', 'route', /(^|\.)yandex\.(ru|com)$/],
    ['Яндекс Карты', 'maps', /(^|\.)yandex\.(ru|com)$/],
  ] as const)('keeps the %s action on its real public host', (_label, key, hostPattern) => {
    const value = siteData.links[key];

    expect(value).toEqual(expect.any(String));
    expect(value).not.toMatch(/(?:example\.com|placeholder|^#$)/i);

    const url = new URL(value);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toMatch(hostPattern);
    expect(url.pathname).not.toBe('/');
  });

  it('keeps the verified VK page and route URLs unchanged', () => {
    expect(siteData.links.vk).toBe('https://vk.ru/club233883954');
    expect(siteData.links.route).toBe('https://yandex.ru/maps/-/CTwNq86O');
  });
});
