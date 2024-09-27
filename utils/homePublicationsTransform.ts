import type { Publication } from "~/core/types/publicationsTypes";
import path from "path";

const checkIsElection = (title: string): boolean => {
  // Logic to determine if the publication is an election. Unfortunatly Livingdocs does not provide a flag for this.
  return [
    "Wahlen 2023",
    "Elections 2023",
    "Elezioni federali 2023",
    "Elecziuns 2023",
  ].some((election) => title.includes(election));
};

export const getElectionLabel = (locale: string) => {
  switch (locale) {
    case "de":
      return "wahlen2023";
    case "fr":
      return "elections2023";
    case "it":
      return "elezioni2023";
    case "rm":
      return "elecziuns2023";
    default:
      return "wahlen2023";
  }
};

export const transformPublicationsToHomeRoutes = (
  publications: Publication[]
) => {
  return publications.map((publication: Publication) => {
    // Extract values from publication
    const name = publication?.metadata?.title || "";
    const isElection = checkIsElection(publication?.systemdata?.title);
    const routePath = isElection
      ? `/${publication?.metadata?.language?.locale}/${getElectionLabel(
          publication?.metadata?.language?.locale
        )}`
      : `/${publication?.metadata?.language?.locale}`;
    const documentId = publication?.systemdata?.documentId;
    const groupId = publication?.metadata?.language?.groupId;
    const language = publication?.metadata?.language?.locale;
    const rootDir = path.resolve(__dirname, "../");

    return {
      name: name,
      path: routePath,
      file: isElection
        ? `${rootDir}/pages/election/index.vue`
        : `${rootDir}/pages/index.vue`,
      meta: {
        id: documentId,
        isElection: isElection,
        contentType: publication?.systemdata?.contentType || "",
        groupId: {
          id: groupId,
          language: language,
        },
      },
    };
  });
};
