/**
 * This method is used to slugify h2 and h3 elements. To generate the slug, we use the title of the element.
 * After the generation of the slug, we add it to the content block, to further use it in the template.
 * @param contentBlock The content block containing the title to be slugified
 */
export const slugifyAnchorElements = (contentBlock: {
  content?: { title?: string; slug?: string };
}): void => {
  const rawSlug = contentBlock.content?.title;
  if (!rawSlug) return;

  const slug = slugify(rawSlug);

  if (contentBlock.content) {
    contentBlock.content.slug = slug;
  }
};

/**
 * Converts a string into a URL-friendly slug
 * @param str The string to be slugified
 * @returns The slugified string
 */
export const slugify = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/&/g, "-y-") // Replace & with '-y-'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-"); // Replace multiple hyphens with a single hyphen
};
