import { getPublicationUrlById } from "~/core/utils/publicationUtils";
import type { Carousel, CarouselItem } from "../types/types";
import { makeKeyedPublications } from "~/generate/store/publicationStore";

export const getCarouselItems = async (
  carouselItems: Carousel[]
): Promise<CarouselItem[]> => {
  const publications = await makeKeyedPublications();

  let carouselItemsArray: CarouselItem[] = [];
  if (publications === null) return carouselItemsArray;
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
      carouselObject.backgroundColor = item.styles["carousel-color"];
    }

    if (item.content.link?.params?.link?.reference?.id) {
      const id = item.content.link.params.link.reference.id;
      console.log("id", publications[6187][0]);
      if (publications)
        carouselObject.href = getPublicationUrlById(
          parseInt(id),
          publications[172][0]
        );
      console.log("carouselObject.href", carouselObject.href);
    }
    const id = item?.content?.link?.params.link.reference.id || "0";
    console.log("id", id);
    for (const content of item.containers["carousel-content"]) {
      if (content.content.title) {
        carouselObject.title = content.content.title;
      }
      if (content.content.text) {
        carouselObject.text = replaceLivingDocsIdsWithUrls(
          content.content.text,
          publications[id][0]
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

export const changeSectionBackground = (color: string | undefined) => {
  if (!window) return;
  const rightLayout = document.querySelector(".right-layout");
  if (rightLayout) {
    if (rightLayout.classList.contains("layout-yellow")) {
      rightLayout.classList.remove("layout-yellow");
    }
    if (color !== undefined && color === "bg-primary-yellow") {
      rightLayout.classList.add("layout-yellow");
    } else {
      rightLayout.classList.remove("layout-yellow");
    }
  }
};

export const onSlideChange = (
  slideIndex: number,
  carouselItems: CarouselItem[]
) => {
  if (!carouselItems) return;
  let bgColor: string | undefined = "";

  bgColor = carouselItems[slideIndex].backgroundColor;

  changeSectionBackground(bgColor);
};
