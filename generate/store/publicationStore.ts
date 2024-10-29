import { atom } from "nanostores";
import makeFetch from "../../utils/makeFetch";
import type {
  CommuneMetadata,
  Publication,
  PublicationOptions,
} from "~/core/types/publicationsTypes";
import type { AllPublicationOptions } from "~/generate/types/slug";

export const publicationStore = atom<Publication[]>([]);
export const homePagesStore = atom<Publication[]>([]);
export const otherPagesStore = atom<Publication[]>([]);
export const communePagesStore = atom<CommuneMetadata[]>([]);
export const keyedPublicationsStore = atom<{
  [key: string]: Publication;
} | null>(null);

export const availableLanguages = atom<
  null | [{ locale: string; route: string }]
>(null);

export const usePublicationStore = async () => {
  if (publicationStore.get().length === 0) {
    console.log("no publication store, fetching");
    const publications = await getAllPublications();
    console.log("fetched total of " + publications.length + " publications");
    publicationStore.set(publications);
  } else {
    console.log("publication store already exists");
  }

  return publicationStore.get();
};

export const getAllPublications = async (options?: AllPublicationOptions[]) => {
  let publications: Publication[] = [];
  let offset = 0;

  // crawl through the api
  while (true) {
    // Get the next 10 pages
    const publicationResponses = await getNext10Pages({
      ...options,
      offset,
    });

    let publicationPages;
    if (publicationResponses) {
      publicationPages = publicationResponses.map((response) => {
        return (response as Response).json();
      });
    } else {
      publicationPages = publicationResponses;
    }

    for (const idx in publicationPages) {
      const publicationsList = await publicationPages[idx];
      publications = publications.concat(publicationsList);
    }

    offset += 1000;
    // If the publications length is not the offset length we reached the end
    if (publications.length !== offset) {
      break;
    }
  }
  return publications;
};

export const getCommunePages = async () => {
  console.log("getting communePages");
  if (communePagesStore.get().length === 0) {
    const publications = await usePublicationStore();
    const communePagesMetadata = publications
      .filter((publication) => publication.systemdata.contentType === "commune")
      .map((publication) => ({
        agency: publication.metadata.agency,
        streetAddress: publication.metadata.streetAddress,
        streetNumber: publication.metadata.streetNumber,
        postalcode: publication.metadata.postalcode,
        commune: publication.metadata.commune,
        email: publication.metadata.email,
        phoneNumber: publication.metadata.phoneNumber,
        website: publication.metadata.website,
      }));
    communePagesStore.set(communePagesMetadata);
    return communePagesMetadata;
  }
  return communePagesStore.get();
}
export const getHomePages = async () => {
  console.log("getting homePages");
  if (homePagesStore.get().length === 0) {
    const publications = await usePublicationStore();
    const homePages = publications.filter(
      (publication) => publication.systemdata.contentType === "homepage"
    );
    homePagesStore.set(homePages);
    return homePages;
  }
  return homePagesStore.get();
};

export const getOtherPages = async () => {
  console.log("getting other pages");

  if (otherPagesStore.get().length === 0) {
    const publications = await usePublicationStore();

    const homePages = publications.filter((publication) => {
      return (
        publication.systemdata.contentType === "cantonal-service" 
      );
    });

    otherPagesStore.set(homePages);
    return homePages;
  }

  return otherPagesStore.get();
};


/**
 * Turn the array of publications into an object using the documentId as key
 */
export const getKeyedPublications = async (): Promise<{
  [key: string]: Publication;
} | null> => {
  if (keyedPublicationsStore.get()) {
    console.log("keyedPublicationsStore already exists");
    return keyedPublicationsStore.get();
  }

  const publications = await usePublicationStore();
  console.log("keyedPublicationsStore does not exist, setup...");
  // Create a map where each key is associated with a single publication
  const publicationMap: { [key: string]: Publication } = {};

  publications.forEach((publication: Publication) => {
    const documentId = publication.systemdata?.documentId;
    if (publication.systemdata.contentType === "page") {
    }
    // Only set the first occurrence of a publication with a given documentId
    publicationMap[documentId] = publication;
  });

  keyedPublicationsStore.set(publicationMap);

  return publicationMap;
};

export const getPublicationById = async (
  id: string
): Promise<Publication | undefined> => {
  const keyedPublications = await getKeyedPublications();
  if (keyedPublications) return keyedPublications[id];
  return undefined;
};

async function getPage(
  url: string,
  trial = 1
): Promise<ResponseType | Response> {
  const delayTime = trial === 1 ? 0 : 10 * Math.pow(2, trial - 2);
  await delay(delayTime);

  return makeFetch()
    .request(`/${url}`)
    .catch((error: Error) => {
      console.warn(`error: ${error}, url: ${url}, trial: ${trial} / 11`);
      if (trial < 11) return getPage(url, trial + 1);
      else throw new Error(`Too many trials`);
    });
}

const getNext10Pages = async (options: PublicationOptions) => {
  const promises = [];
  for (let i = 1; i <= 10; i++) {
    const url = `documents/latestPublications?offset=${options.offset + (i - 1) * 100
      }${options.contentTypes ? `&contentTypes=${options.contentTypes}` : ""}`;
    promises.push(getPage(url));
  }
  return Promise.all(promises);
};

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
