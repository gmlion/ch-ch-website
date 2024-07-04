const resolveTags = async ($axios, tagObject) => {
  if (tagObject.$ref !== 'documents') return null

  const references = tagObject.references
  if (!references) return null

  const ids = references.map((ref) => ref.id)

  const tags = []

  for (const id of ids) {
    const record = (await $axios.get(`/documents/${id}/latestPublication`)).data
    if (record.systemdata.contentType !== 'tag-category') {
      continue
    }
    tags.push(record.metadata.name)
  }

  return tags
}

export { resolveTags }
