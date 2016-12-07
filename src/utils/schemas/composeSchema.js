import compose from './compose'

export default function composeSchema(type, schemaObj = {}) {
  return {
    name: type,
    type: 'application/ld+json',
    innerHTML: compose(type, schemaObj),
  }
}