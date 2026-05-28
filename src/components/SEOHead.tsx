import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOHeadProps {
  titleKey: string
  descriptionKey: string
  path?: string
}

const LANGUAGES = ['en', 'ru', 'tk', 'zh']

const BASE_URL = 'https://www.dovletaraduselge.com.tm'

export default function SEOHead({
  titleKey,
  descriptionKey,
  path = '',
}: SEOHeadProps) {
  const { t, i18n } = useTranslation()

  const lang = i18n.language

  const title = `${t(titleKey)} | Dövlətara Düşelge`

  const description = t(descriptionKey)

  const cleanPath = path === "/" ? "" : path

  const canonical = `${BASE_URL}${
    lang !== "en" ? `/${lang}` : ""
  }${cleanPath}`

  const ogImage = `${BASE_URL}/og-image.jpg`
  const breadcrumbSchema =
  path && path !== "/"
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}${lang !== "en" ? `/${lang}` : ""}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: titleKey,
            item: `${BASE_URL}${lang !== "en" ? `/${lang}` : ""}${path}`,
          },
        ],
      }
    : null

  return (
    <Helmet>
      <html lang={lang} />

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonical}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta
        property="og:description"
        content={description}
      />

      <meta property="og:url" content={canonical} />

      <meta
        property="og:image"
        content={ogImage}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:locale"
        content={
          lang === 'zh'
            ? 'zh_CN'
            : lang === 'ru'
            ? 'ru_RU'
            : lang === 'tk'
            ? 'tk_TM'
            : 'en_US'
        }
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={ogImage}
      />

      <meta name="robots" content="index, follow" />

      {/* hreflang */}
      {LANGUAGES.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l === 'zh' ? 'zh-Hans' : l}
          href={`${BASE_URL}${
            l !== 'en' ? `/${l}` : ''
          }${path}`}
        />
      ))}

      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${path}`}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </Helmet>
  )
}