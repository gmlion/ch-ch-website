import makeFetch from "./makeFetch";

interface Reference {
  id: string;
}

interface TagObject {
  $ref: string;
  references?: Reference[];
}

interface Record {
  systemdata: {
    contentType: string;
  };
  metadata: {
    name: string;
  };
}

const resolveTags = async (tagObject: TagObject): Promise<string[] | null> => {
  if (tagObject.$ref !== "documents") return null;

  const references = tagObject.references;
  if (!references) return null;

  const ids = references.map((ref) => ref.id);

  const tags: string[] = [];

  for (const id of ids) {
    const request = await makeFetch().request(
      `/documents/${id}/latestPublication`
    );
    const record: Record = await request.json();

    if (record.systemdata.contentType !== "tag-category") {
      continue;
    }
    tags.push(record.metadata.name);
  }

  return tags;
};

export { resolveTags };
