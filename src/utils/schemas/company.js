import composeSchema from './composeSchema'

export default function companySchema(company) {
  const {
    name,
    url,
    logo,
    sameAs = [],
  } = company

  return composeSchema('Organization', {
    name,
    url,
    logo,
    ...(sameAs && sameAs.length ? {sameAs} : {})
  })
}
