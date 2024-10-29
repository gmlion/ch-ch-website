import type { Publication } from "~/core/types/publicationsTypes"

export const cantons = [
  'AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR',
  'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG',
  'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH',
]

export const cantonListMapper = (publication: Publication) => {


  // Map over the list of cantons, checking each for a corresponding metadata key
  return cantons.reduce((acc, canton) => {
    const urlKey = `${canton}-data`; // Form the metadata key, e.g., 'BE-data'

    // Check if the URL key exists in metadata
    //@ts-ignore
    if (publication.metadata[urlKey]) {
      //@ts-ignore
      acc.push({ canton, url: publication.metadata[urlKey] });
    }

    return acc;
  }, [] as { canton: string; url: string }[]);
}
