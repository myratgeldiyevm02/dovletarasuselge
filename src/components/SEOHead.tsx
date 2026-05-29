import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOHeadProps {
  titleKey: string
  descriptionKey: string
  path?: string
}

const LANGUAGES = ['en', 'ru', 'tk', 'zh']
const BASE_URL = 'https://dovletaraduselge.com.tm'

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Döwletara Düşelge",
  alternateName: "Dowletara Duselge",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description: "International freight forwarding, customs clearance and warehousing across Central Asia and beyond.",
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
      availableLanguage: ["English", "Russian", "Turkmen", "Chinese"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+98-905-504-83-38",
      contactType: "customer service",
      availableLanguage: ["Persian", "English"],
    },
  ],
  areaServed: ["Turkmenistan", "Russia", "China", "Turkey", "UAE", "Kazakhstan", "Uzbekistan", "Germany"],
  serviceType: ["International Freight Forwarding", "Customs Clearance", "Warehousing", "Railway Logistics"],
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FreightForwarder",
  name: "Döwletara Düşelge",
  image: `${BASE_URL}/og-image.jpg`,
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
  url: BASE_URL,
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
}

export default function SEOHead({ titleKey, descriptionKey, path = '' }: SEOHeadProps) {
  const { t, i18n } = useTranslation()

  const lang = i18n.language
  const title = `${t(titleKey)} | Döwletara Düşelge`
  const description = t(descriptionKey)
  const cleanPath = path === '/' ? '' : path
  const canonical = `${BASE_URL}${lang !== 'en' ? `/${lang}` : ''}${cleanPath}`
  const ogImage = `${BASE_URL}/og-image.jpg`

  const breadcrumbSchema = path && path !== '/' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}${lang !== 'en' ? `/${lang}` : ''}` },
      { "@type": "ListItem", position: 2, name: t(titleKey), item: `${BASE_URL}${lang !== 'en' ? `/${lang}` : ''}${path}` },
    ],
  } : null

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={
        lang === 'zh' ? 'zh_CN' : lang === 'ru' ? 'ru_RU' : lang === 'tk' ? 'tk_TM' : 'en_US'
      } />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {LANGUAGES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l === 'zh' ? 'zh-Hans' : l}
          href={`${BASE_URL}${l !== 'en' ? `/${l}` : ''}${cleanPath}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${cleanPath}`} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  )
}