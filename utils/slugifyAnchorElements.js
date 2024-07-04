/**
 * This method is used to slugify h2 and h3 elements. To generate the slug, we use the title of the element.
 * After the generation of the slug we add it to the content block, to further use it in the template.
 * @param {} element
 */
export const slugifyAnchorElements = (contentBlock) => {
  const rawSlug = contentBlock.content?.title
  if (!rawSlug) return

  const slug = slugify(rawSlug)

  contentBlock.content.slug = slug
}

export const slugify = (string) => {
  string = string.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
  return string
    .toLowerCase() // All chars to lower case
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-y-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}
