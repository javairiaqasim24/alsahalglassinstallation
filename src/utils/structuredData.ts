// Structured Data (Schema.org) generators for SEO

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://alsahalglass.com/#organization",
  name: "Alsahal",
  alternateName: "Alsahal Glass & Cleaning Services",
  image: "https://alsahalglass.com/logo.jpg",
  url: "https://alsahalglass.com",
  telephone: "+971559201893",
  email: "hussnainqasim33@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dubai",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.2048",
    longitude: "55.2708",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  sameAs: [
    "https://wa.me/971559201893",
    // Add social media links when available
  ],
});

export const generateServiceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: serviceName,
  provider: {
    "@type": "LocalBusiness",
    name: "Alsahal",
  },
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  description: description,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alsahal",
  alternateName: "Alsahal Glass & Cleaning Services",
  url: "https://alsahalglass.com",
  logo: "https://alsahalglass.com/logo.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971559201893",
    contactType: "customer service",
    areaServed: "AE",
    availableLanguage: ["en", "ar"],
  },
  sameAs: [
    "https://wa.me/971559201893",
  ],
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://alsahalglass.ae${item.url}`,
  })),
});

export const generateReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Alsahal",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: reviews.length.toString(),
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toString(),
    },
  })),
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
