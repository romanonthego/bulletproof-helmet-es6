export function stringify(schemaObj = {}) {
  return JSON.stringify(schemaObj, null, '  ')
}

export default function compose(type, schemaObj, opts = {skipContext: false}) {
  const {
    skipContext
  } = opts

  return stringify({
    ...(!skipContext ? {'@context': 'http://schema.org'} : {}),
    '@type': type,
    ...schemaObj,
  })
}