export default function composeSchema(name, innerHTML) {
  return {
    name,
    type: 'application/ld+json',
    innerHTML,
  }
}
