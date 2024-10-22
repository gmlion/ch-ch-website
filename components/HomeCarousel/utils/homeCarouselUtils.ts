import type { Carousel, CarouselItem, Image } from "../types/types";
import { getKeyedPublications } from "~/generate/store/publicationStore";

export const getCarouselItems = async (
  carouselItems: Carousel[]
): Promise<CarouselItem[]> => {
  const publications = await getKeyedPublications();
  let carouselItemsArray: CarouselItem[] = [];

  try {
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
      const id = item.content.link?.params?.link?.reference?.id;
      if (publications && id && publications[id]) {
        carouselObject.href = buildUrlFromPublication(publications[id]);
      }

      // Ensure item.containers["carousel-content"] exists
      if (item.containers && item.containers["carousel-content"]) {
        for (const content of item.containers["carousel-content"]) {
          // Safely access title
          if (content?.content?.title) {
            carouselObject.title = content.content.title;
          }

          // Safely access text
          if (content?.content?.text) {
            if (publications) {
              // TODO: BUILD FAIL
              carouselObject.text = content.content.text;
            }
          }

          // Safely access image
          if (content?.content?.image && carouselObject.image === undefined) {
            try {
              carouselObject.image = (await getCompleteImageObject(
                content.content.image
              )) as Image;
            } catch (err) {
              console.error("Error fetching image:", err);
            }
          }
        }
      }

      carouselItemsArray.push(carouselObject);
    }
  } catch (err) {
    console.error("Error processing carousel items:", err);
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
  let bgColor: string | undefined;

  bgColor = carouselItems[slideIndex].backgroundColor;

  changeSectionBackground(bgColor);
};
