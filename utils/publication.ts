import type {
  Publication,
  PublicationOptions,
  WrapFunction,
} from "~/core/types/publications";
import makeFetch from "@/utils/makeFetch";
import type { AllPublicationOptions } from "~/generate/types/slug";

/**
 * Turn the array of publications into an object using the documentId as key
 */
export const makeKeyedPublications = (publications: Publication[]) => {
  const pairs = publications.map((publication: Publication) => [
    publication.systemdata?.documentId || 0,
    publication,
  ]);
  return Object.fromEntries(pairs);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

const getNext10Pages = (options: PublicationOptions) => {
  const promises = [];
  for (let i = 1; i <= 10; i++) {
    const url = `documents/latestPublications?offset=${
      options.offset + (i - 1) * 100
    }${options.contentTypes ? `&contentTypes=${options.contentTypes}` : ""}`;
    promises.push(getPage(url));
  }
  return Promise.all(promises);
};

export const getAllPublications = async (options: AllPublicationOptions[]) => {
  let publications: Publication[] = [];
  let offset = 0;

  // Lets crawl trough the api
  while (true) {
    // Get the next 10 pages
    const publicationResponses = await getNext10Pages({
      ...options,
      offset,
    });

    // Sometimes it is nested in the property data,
    // sometimes not
    // Lets use data if it is defined
    let publicationPages;
    if (publicationResponses) {
      publicationPages = publicationResponses.map((response) =>
        (response as Response).json()
      );
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

export const getPublicationById = async (id: string, get: WrapFunction) => {
  return (await get(`documents/${id}/latestPublication`)).data;
};

export const getPublicationFromMediaLibrary = async (
  id: string,
  get: WrapFunction
) => {
  return (await get(`mediaLibrary/${id}`)).data;
};
