import composeSchema from './composeSchema'

export default function websiteSchema(website) {
  const {
    name,
    alternateName,
    url,
  } = website

  const content = `
    {
      "@context" : "http://schema.org",
      "@type" : "WebSite",
      "name" : "${name}",
      ${alternateName ? `"alternateName" : "${alternateName}",` : ''}
      "url" : "${url}"
    }
  `

  return composeSchema('website', content)
}
