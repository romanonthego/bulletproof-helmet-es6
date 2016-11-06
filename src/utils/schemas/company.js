import composeSchema from './composeSchema'

export default function companySchema(company) {
  const {
    name,
    url,
    logo,
    sameAs = [],
  } = company

  const sameAsString = sameAs.map(s => `"${s}"`).join(', ')

  const content = `
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "${name}",
      "url": "${url}",
      ${sameAs.length ? `"sameAs" : [${sameAsString}],` : ''}
      "logo": "${logo}"
    }
  `

  return composeSchema('company', content)
}
