import { atom } from "nanostores";
import makeFetch from "../../utils/makeFetch";
import type {
    MinimizedPublicationType,
    Publication,
    PublicationOptions,
} from "../../core/types/publications";
import type { AllPublicationOptions } from "~/generate/types/slug";
import type {
    MenuResponse,
    MenuResponseData,
    PathType,
} from "../types/routing";

export const publicationStore = atom<Publication[]>([]);
export const indexPublicationStore = atom<Publication | null>(null);
export const usedPublicationsStore = atom<MinimizedPublicationType[]>([]);
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

/**
 * Turn the array of publications into an object using the documentId as key
 */
export const makeKeyedPublications = async (): Promise<{
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
        if (publication.systemdata?.documentId === 6187) {
            console.log("publication without documentId", publication);
        }
        const documentId = publication.systemdata?.documentId;

        // Only set the first occurrence of a publication with a given documentId
        if (!publicationMap[documentId]) {
            publicationMap[documentId] = publication;
        }
    });

    keyedPublicationsStore.set(publicationMap);

    return publicationMap;
};

export const useUsedPublications = async (menuForLanguage: MenuResponse) => {
    if (usedPublicationsStore.get().length > 0) {
        console.log("usedPublicationsStore already exists");
        return usedPublicationsStore.get();
    }
    console.log("usedPublicationsStore does not exist, setup...");

    const usedPublications: MinimizedPublicationType[] = [];
    const publications = await usePublicationStore();

    function crawlMenu(nodes: MenuResponseData[], path: PathType[]) {
        for (const entry of nodes) {
            if (entry.nodes && entry.nodes.length > 0) {
                crawlMenu(entry.nodes, path.concat([entry]));
            } else {
                const publication = publications.find(
                    (publication) =>
                        publication &&
                        publication.systemdata.documentId === Number(entry.documentId)
                );
                if (publication) {
                    const minimizedPublication: MinimizedPublicationType = {
                        metadata: {
                            title: publication.metadata.title,
                            language: {
                                locale: publication.metadata.language.locale,
                            },
                        },
                        systemdata: {
                            documentId: publication.systemdata.documentId,
                        },
                    };
                    usedPublications.push(minimizedPublication);
                }
            }
        }
    }

    crawlMenu(menuForLanguage.nodes, []);

    usedPublicationsStore.set(usedPublications);
    console.log("usedPublicationsStore set");
    return usedPublications;
};

export const setIndexPublication = async (locale: string) => {
    console.log("indexPublicationStore does not exist, setup...");
    const publications = await usePublicationStore();
    for (const publication of publications) {
        if (!publication.metadata.language) {
            continue;
        }
        const language = publication.metadata.language.locale;
        const isoCode = getIsoCodeFromLocale(language);

        if (isoCode !== locale) {
            continue;
        }

        const contentType = publication.systemdata.contentType;
        if (contentType !== "homepage") {
            continue;
        }

        if (publication.metadata["tag-category"]) {
            // const tags = await resolveTags(
            //   $axios,
            //   publication.metadata['tag-category']
            // )
            // if (tags.length === 0 || !tags.includes('chch')) {
            //   // not chch tags. We skip
            //   continue
            // }
            console.error(
                "tags not implemented",
                publication.metadata["tag-category"]
            );
        }
        indexPublicationStore.set(publication);
        return indexPublicationStore.get();
    }
};

export const getPublicationById = async (id: string): Promise<Publication | undefined> => {
    const keyedPublications = await makeKeyedPublications()
    if (keyedPublications) return keyedPublications[id];
    return undefined
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
        const url = `documents/latestPublications?offset=${options.offset + (i - 1) * 100
            }${options.contentTypes ? `&contentTypes=${options.contentTypes}` : ""}`;
        promises.push(getPage(url));
    }
    return Promise.all(promises);
};
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}