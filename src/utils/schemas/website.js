import composeSchema from './composeSchema'

export default function websiteSchema(website) {
  const {
    name,
    alternateName,
    url,
    searchUrl,
  } = website

  return composeSchema('website', stringify({
    '@context': 'http://schema.org',
    '@type' : 'WebSite',
    name,
    url,
    ...(alternateName ? {alternateName} : {}),
    ...(searchUrl ? {
      potentialAction: {
        '@type': 'SearchAction',
        target: `${searchUrl}={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    } : {})
  }))
}
