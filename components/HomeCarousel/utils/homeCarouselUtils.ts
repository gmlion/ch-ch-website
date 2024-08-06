import { getPublicationUrlById } from "~/core/utils/publicationUtils";
import type { Carousel, CarouselItem } from "../types/types";
import { usePublicationStore } from "~/generate/store/publicationStore";

export const getCarouselItems = async (
  carouselItems: Carousel[]
): Promise<CarouselItem[]> => {
  const publications = await usePublicationStore();
  let carouselItemsArray: CarouselItem[] = [];

  for (const item of carouselItems) {
    let carouselObject: CarouselItem = {
      id: item.id,
      title: "",
      text: "",
      image: undefined,
      href: undefined,
      backgroundColor: "",
    };

    if (item.styles && item.styles["carousel-color"]) {
      carouselObject.backgroundColor =
        item.styles["carousel-color"] || "bg-primary-red";
    }

    if (item.content.link?.params?.link?.reference?.id) {
      const id = parseInt(item.content.link.params.link.reference.id) || NaN;
      if (!isNaN(id)) {
        carouselObject.href = getPublicationUrlById(id, publications);
      }
    }

    for (const content of item.containers["carousel-content"]) {
      if (content.content.title) {
        carouselObject.title = content.content.title;
      }
      if (content.content.text) {
        carouselObject.text = replaceLivingDocsIdsWithUrls(
          content.content.text,
          publications
        );
      }
      if (content.content.image && carouselObject.image === undefined) {
        carouselObject.image = await getCompleteImageObject(
          content.content.image
        );
      }
    }

    carouselItemsArray.push(carouselObject);
  }

  return carouselItemsArray;
};
