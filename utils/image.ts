import type { Image, ImageItem } from "~/components/HomeCarousel/types/types";

export const getCompleteImageObject = async (
  image: Image
): Promise<ImageItem> => {
  let setImage;
  const imageDataRequest = await makeFetch().request(
    `/mediaLibrary/${image.mediaId}`
  );
  const imageData = await imageDataRequest.json();

  setImage = imageData;

  return setImage;
};
