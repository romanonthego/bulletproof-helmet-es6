export function stringify(schemaObj = {}) {
  return JSON.stringify(schemaObj, null, '  ')
}

export default function compose(type, schemaObj, opts = {nested: false}) {
  const {
    nested
  } = opts

  const schema = {
    ...(!nested ? {'@context': 'http://schema.org'} : {}),
    '@type': type,
    ...schemaObj,
  }

  return nested ? schema : stringify(schema)
}