import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shieldquantum.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/ai-quantum',
    '/campus',
    '/collaborate',
    '/cryptography',
    '/hardware',
    '/knowledge',
    '/labs',
    '/labs/cryogenic',
    '/labs/photonics',
    '/network',
    '/quantum-machines',
    '/research',
    '/roadmap',
    '/security',
    '/simulator',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/simulator' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : route === '/simulator' || route === '/quantum-machines' ? 0.9 : 0.8,
  }));
}
