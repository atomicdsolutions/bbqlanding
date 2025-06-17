import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://purplehaze-bbq.com/images/og-image.jpg', // Default OG image
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData
}) => {
  // Default structured data for the business
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    "name": "Purple Haze BBQ",
    "description": "Premium BBQ catering service in the DMV area, offering authentic smoked meats and sides for events of all sizes.",
    "url": "https://purplehaze-bbq.com",
    "logo": "https://purplehaze-bbq.com/images/logo.png",
    "image": ogImage,
    "telephone": "(202) 555-1234",
    "email": "contact@purplehaze-bbq.com",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 38.9072,
        "longitude": -77.0369
      },
      "geoRadius": "50 mi"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "DC",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "servesCuisine": ["Barbecue", "Southern", "American"],
    "founder": {
      "@type": "Person",
      "name": "Marcus Johnson",
      "jobTitle": "Executive Pitmaster"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      <title>{`${title} | Purple Haze BBQ`}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && (
        <>
          <meta property="og:url" content={canonicalUrl} />
          <link rel="canonical" href={canonicalUrl} />
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#5D2E8C" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
      
      {/* Local Business Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Purple Haze BBQ",
            "image": ogImage,
            "description": description,
            "@id": "https://purplehaze-bbq.com",
            "url": "https://purplehaze-bbq.com",
            "telephone": "(202) 555-1234",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "",
              "addressLocality": "Washington",
              "addressRegion": "DC",
              "postalCode": "",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 38.9072,
              "longitude": -77.0369
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "21:00"
            },
            "sameAs": [
              "https://www.facebook.com/purplehazebbq",
              "https://www.instagram.com/purplehazebbq",
              "https://twitter.com/purplehazebbq"
            ]
          })
        }}
      />
    </Head>
  );
};

export default SEO;