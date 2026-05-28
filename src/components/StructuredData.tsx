export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Döwletara Düşelge",
    alternateName: "Dowletara Duselge",
    url: "https://www.dovletaraduselge.com.tm",
    logo: "https://www.dovletaraduselge.com.tm/logo.svg",
    description:
      "International freight forwarding, customs clearance and warehousing across Central Asia and beyond.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Magtymguly str. 50",
      addressLocality: "Turkmenbashi",
      addressRegion: "Balkan",
      postalCode: "745010",
      addressCountry: "TM",
    },

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+993-65-39-83-38",
        contactType: "customer service",
        availableLanguage: [
          "English",
          "Russian",
          "Turkmen",
          "Chinese",
        ],
      },
      {
        "@type": "ContactPoint",
        telephone: "+98-905-504-83-38",
        contactType: "customer service",
        availableLanguage: ["Persian", "English"],
      },
    ],

    sameAs: [
      "https://www.dovletaraduselge.com.tm",
    ],

    areaServed: [
      "Turkmenistan",
      "Russia",
      "China",
      "Turkey",
      "UAE",
      "Kazakhstan",
      "Uzbekistan",
      "Germany",
      "Netherlands",
    ],

    serviceType: [
      "International Freight Forwarding",
      "Customs Clearance",
      "Warehousing",
      "Railway Logistics",
      "Air Freight",
      "Sea Freight",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FreightForwarder",

    name: "Döwletara Düşelge",

    image:
      "https://www.dovletaraduselge.com.tm/og-image.jpg",

    telephone: "+993-65-39-83-38",

    email: "dovletaraduselge@sanly.tm",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Magtymguly str. 50",
      addressLocality: "Turkmenbashi",
      addressRegion: "Balkan velayat",
      postalCode: "745010",
      addressCountry: "TM",
    },

    url: "https://www.dovletaraduselge.com.tm",

    priceRange: "$$",

    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  )
}
