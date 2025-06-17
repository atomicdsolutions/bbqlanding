import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const baseUrl = 'https://purplehaze-bbq.com'; // Replace with your actual domain

const defaultOgImage = `${baseUrl}/images/og-image.jpg`; // Replace with your actual OG image

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl = baseUrl,
  ogImage = defaultOgImage,
  ogType = 'website'
}) => {
  const fullTitle = `${title} | Purple Haze BBQ`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Purple Haze BBQ" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Additional Meta Tags for Local Business */}
      <meta name="geo.region" content="US-DC" />
      <meta name="geo.placename" content="Washington" />
      <meta name="geo.position" content="38.9072;-77.0369" />
      <meta name="ICBM" content="38.9072, -77.0369" />
    </Head>
  );
};

export default SEO;