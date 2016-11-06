export default function metaOrNull(name, content, predicate = true) {
  if (content && predicate) {
    return {name, content}
  }

  return null
}