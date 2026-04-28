export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Altitude UK Drone Operations",
    "description": "Professional nationwide drone pilot network and operations management.",
    "provider": {
      "@type": "Organization",
      "name": "Altitude UK",
      "url": "https://altitude-hire.com",
    },
    "areaServed": "United Kingdom",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Drone Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aerial Photography & Video"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "3D Scanning & Gaussian Splatting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof & Infrastructure Inspection"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
