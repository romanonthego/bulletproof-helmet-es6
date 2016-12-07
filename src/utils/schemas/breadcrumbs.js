import composeSchema from './composeSchema'
import listItem from './listItem'

export default function breadcrumbsSchema(breadcrumbs = []) {
  return composeSchema('BreadcrumbList', {
    itemListElement: breadcrumbs.map(({id, name, image}, index) => {
      return listItem({
        position: index + 1,
        item: {
          '@id': id,
          name,
          image,
        }
      })
    })
  })
}
