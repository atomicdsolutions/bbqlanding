import React from 'react';
import Head from 'next/head';

interface LocalBusinessSchemaProps {
  priceRange?: string;
  servesCuisine?: string[];
  areaServed?: string[];
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  priceRange = "$$",
  servesCuisine = ["BBQ", "Southern", "American"],
  areaServed = ["Washington DC", "Maryland", "Virginia"]
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Catering",
    "name": "Purple Haze BBQ",
    "image": "https://purplehaze-bbq.com/images/logo.png", // Update with actual URL
    "description": "Premium BBQ catering service in the DMV area, specializing in authentic smoked meats and homemade sides for events of all sizes.",
    "priceRange": priceRange,
    "servesCuisine": servesCuisine,
    "areaServed": areaServed.map(area => ({
      "@type": "AdministrativeArea",
      "name": area
    })),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Washington",
      "addressRegion": "DC",
      "postalCode": "20001", // Update with actual address
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.9072,
      "longitude": -77.0369
    },
    "url": "https://purplehaze-bbq.com",
    "telephone": "+1-202-555-1234", // Update with actual phone
    "sameAs": [
      "https://www.facebook.com/purplehazebbq",
      "https://www.instagram.com/purplehazebbq",
      "https://twitter.com/purplehazebbq"
    ],
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
      "closes": "20:00"
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

interface MenuItemSchemaProps {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export const MenuItemSchema: React.FC<MenuItemSchemaProps> = ({
  name,
  description,
  price,
  image,
  category
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "name": name,
    "description": description,
    "offers": {
      "@type": "Offer",
      "price": price.replace(/[^0-9.]/g, ''),
      "priceCurrency": "USD"
    },
    "image": image,
    "category": category,
    "menuAddOn": [],
    "suitableForDiet": category === "sides" ? ["VeganDiet", "VegetarianDiet"] : []
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  location: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export const EventSchema: React.FC<EventSchemaProps> = ({
  name,
  description,
  startDate,
  location,
  image,
  offers
}) => {
  const schema: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    startDate: string;
    location: {
      "@type": string;
      name: string;
      address: {
        "@type": string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
      };
    };
    organizer: {
      "@type": string;
      name: string;
      url: string;
    };
    image?: string;
    offers?: {
      "@type": string;
      price: string;
      priceCurrency: string;
      url: string;
    };
  } = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Washington",
        "addressRegion": "DC",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Purple Haze BBQ",
      "url": "https://purplehaze-bbq.com"
    }
  };

  if (image) {
    schema["image"] = image;
  }

  if (offers) {
    schema["offers"] = {
      "@type": "Offer",
      ...offers,
      "url": "https://purplehaze-bbq.com"
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};