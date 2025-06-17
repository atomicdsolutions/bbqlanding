import fs from 'fs';
import { resolve } from 'path';

const SITE_URL = 'https://purplehaze-bbq.com';

const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/menu',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/gallery',
    priority: '0.7',
    changefreq: 'weekly'
  }
];

export const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${SITE_URL}${page.path}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  fs.writeFileSync(resolve('./public/sitemap.xml'), sitemap);
};

export const generateRobotsTxt = () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(resolve('./public/robots.txt'), robotsTxt);
};

export const generateSocialImages = () => {
  // TODO: Implement social image generation
  // This could use a package like puppeteer to generate OG images
  // or canvas/sharp to create them programmatically
};