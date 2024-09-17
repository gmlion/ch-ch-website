import type {Image, ImageItem} from "~/components/HomeCarousel/types/types";

export const getCompleteImageObject = async (image?: Image, text?: string, alignment?: "left" | "right"): Promise<Image | null> => {
    if (!image) return null;
    let setImage = image;


    if (text) setImage.text = text;
    if (alignment) setImage.textAlign = alignment;

    const imageDataRequest = await makeFetch().request(
        `/mediaLibrary/${image.mediaId}`
    );
    if (!imageDataRequest.ok) {
        console.error(
            `Failed to fetch image data for mediaId: ${image.mediaId}`
        );
        return setImage;
    }
    return setImage;
};

export const getAltText = (
    locale: string,
    defaultLocale: string,
    imageMetaData?: ImageItem
) => {
    if (!imageMetaData) return "";
    const translations = imageMetaData?.translations;
    const defaultTranslation = imageMetaData.metadata?.title;
    if (locale !== defaultLocale && translations) {
        const translation = translations.find((t) => {
            t.locale === locale
        });
        return translation?.metadata?.title ?? "";
    }
    return defaultTranslation ?? "";
};