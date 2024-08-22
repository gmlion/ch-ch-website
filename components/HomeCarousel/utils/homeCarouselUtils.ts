import type { Carousel, CarouselItem } from "../types/types";
import { makeKeyedPublications } from "~/generate/store/publicationStore";
export const getCarouselItems = async (
  carouselItems: Carousel[]
): Promise<CarouselItem[]> => {
  const publications = await makeKeyedPublications();
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
      carouselObject.backgroundColor = item.styles["carousel-color"];
    }
    const id = item.content.link?.params?.link?.reference?.id;
    if (publications && id && publications[id]) {
      if (publications[id]) {
        const url = buildUrlFromPublication(publications[id]);
        carouselObject.href = url;
      }
    }
    for (const content of item.containers["carousel-content"]) {
      if (content.content.title) {
        carouselObject.title = content.content.title;
      }
      if (content.content.text) {
        if (publications) {
          const regex = /data-li-document-ref="(\d+)"/g;
          const matches = content.content.text.matchAll(regex);
          let replacedHTML = content.content.text;
          for (const match of matches) {
            const regexId = match[1];
            if (regexId) {
              const url = buildUrlFromPublication(publications[regexId]);
              const hrefRegex = new RegExp(`href="[^"]*"`);
              replacedHTML = replacedHTML.replace(hrefRegex, `href="${url}"`);
            }
          }
          carouselObject.text = replacedHTML;
        }
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
