import makeFetch from "../utils/makeFetch";

const resolveTags = async (tagObject) => {
  if (tagObject.$ref !== "documents") return null;

  const references = tagObject.references;
  if (!references) return null;

  const ids = references.map((ref) => ref.id);

  const tags = [];

  for (const id of ids) {
    const request = await makeFetch().request(
      `/documents/${id}/latestPublication`
    );
    const record = await request.json();

    if (record.systemdata.contentType !== "tag-category") {
      continue;
    }
    tags.push(record.metadata.name);
  }

  return tags;
};

export { resolveTags };
