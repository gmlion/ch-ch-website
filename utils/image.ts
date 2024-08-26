import type { Image, ImageItem } from "~/components/HomeCarousel/types/types";
export const getCompleteImageObject = async (image: Image): Promise<Image> => {
  let setImage = image;
  const imageDataRequest = await makeFetch().request(
    `/mediaLibrary/${image.mediaId}`
  );
  const imageData = await imageDataRequest.json();

  setImage.additionalData = imageData;

  return setImage;
};

export const getAltText = (
  locale: string,
  defaultLocale: string,
  imageMetaData: ImageItem
) => {
  const translations = imageMetaData?.translations;
  const defaultTranslation = imageMetaData.metadata?.title;
  if (locale !== defaultLocale && translations) {
    const translation = translations.find((t) => {

      t.locale === locale;
    });
    return translation?.metadata?.title ?? "";
  }
  return defaultTranslation ?? "";
};