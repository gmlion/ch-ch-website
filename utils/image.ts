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
      console.log(t.locale, "t.locale");

      t.locale === locale;
    });
    console.log(translation, "translation");
    return translation?.metadata?.title ?? "";
  }
  return defaultTranslation ?? "";
};
