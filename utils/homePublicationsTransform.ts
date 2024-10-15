import type { Publication } from "~/core/types/publicationsTypes";
import path from "path";

const checkIsElection = (title: string): boolean => {
  // Logic to determine if the publication is an election. Unfortunatly Livingdocs does not provide a flag for this.
  return [
    `Wahlen ${process.env.ELECTION_YEAR}`,
    `Elections ${process.env.ELECTION_YEAR}`,
    `Elezioni ${process.env.ELECTION_YEAR}`,
    `Elecziuns ${process.env.ELECTION_YEAR}`,
  ].some((election) => title.includes(election));
};

export const getElectionLabel = (locale: string) => {
  switch (locale) {
    case "de":
      return `wahlen${process.env.ELECTION_YEAR}`;
    case "fr":
      return `elections${process.env.ELECTION_YEAR}`;
    case "it":
      return `elezioni${process.env.ELECTION_YEAR}`;
    case "rm":
      return `elecziuns${process.env.ELECTION_YEAR}`;
    default:
      return `wahlen${process.env.ELECTION_YEAR}`;
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
