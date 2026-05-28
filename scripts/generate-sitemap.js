import fs from "fs-extra"

const BASE_URL = "https://www.dovletaraduselge.com.tm"

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
]

const languages = ["en", "ru", "zh", "tk"]

function getUrl(lang, path) {
  if (lang === "en") return `${BASE_URL}${path}`
  return `${BASE_URL}/${lang}${path}`
}

function today() {
  return new Date().toISOString().split("T")[0]
}

let urls = ""

for (const route of routes) {
  urls += `
  <url>
    <loc>${getUrl("en", route.path)}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
`

  for (const lang of languages) {
    urls += `
    <xhtml:link rel="alternate" hreflang="${
      lang === "zh" ? "zh-Hans" : lang
    }" href="${getUrl(lang, route.path)}" />
`
  }

  urls += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl(
      "en",
      route.path
    )}" />
  </url>
`
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`

await fs.outputFile("public/sitemap.xml", sitemap)

console.log("✅ Sitemap generated!")