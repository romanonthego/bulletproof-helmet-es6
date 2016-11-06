export function stringify(schemaObj = {}) {
  return JSON.stringify(schemaObj, null, '  ')
}

export default function composeSchema(type, schemaObj = {}) {
  return {
    name: type,
    type: 'application/ld+json',
    innerHTML: stringify({
      '@context': 'http://schema.org',
      '@type': type,
      ...schemaObj,
    }),
  }
}