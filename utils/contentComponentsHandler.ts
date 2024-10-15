import type {
    ContentGallery,
    FreeHTML,
    Metadata,
    PublicationContainerComponent,
    Tables,
    TypeCategory,
    TypeList,
} from "~/core/types/publicationsTypes";
import {
    createAccordionCollapsibleArray,
    createFAQCollapsibleArray,
} from "~/components/Collapsible/utils/collapsibleUtils";
import type {
    CollapsibleContent,
    ContentComponent,
    InfoboxContent,
    YoutubeContent,
} from "~/core/types/contentComponentsTypes";
import { getCommunePages } from "~/generate/store/publicationStore";

import { randomUUID } from "uncrypto";
import type { Image } from "~/components/HomeCarousel/types/types";
import { getCompleteImageObject } from "~/utils/image";
import { getTitleByTag } from "~/utils/tags";
import { processCarouselData } from "~/components/ContentCarousel/contentCarouselUtils";
import { processHowToData } from "~/components/HowTo/utils/howToUtils";

export const contentComponents = async (
    content: PublicationContainerComponent[],
    locale: string,
    isNestedInCollapsible?: boolean
): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = [];
    const accordionItems: PublicationContainerComponent[] = [];
    const accordionComponentsArray: CollapsibleContent[] = [];
    const contentComponentsArray: ContentComponent[] = [];
    const infoboxComponentsArray: ContentComponent[] = [];
    let infoBoxTitle: string = "";

    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            }
            case "infobox": {
                if (contentItem.containers?.infobox?.length > 0) {
                    const category = (
                        contentItem.content as {
                            category: TypeCategory;
                        }
                    )?.category?.params?.category?.reference?.id;
                    if (category) {
                        const infoBoxRefMetadata = await getTitleByTag(category);
                        if (infoBoxRefMetadata) {
                            infoBoxTitle =
                                infoBoxRefMetadata[`label_${locale}` as keyof Metadata];
                        }
                    }
                    for (const component of contentItem.containers.infobox) {
                        switch (component.component) {
                            case "image": {
                                const infoboxContent = component.content as InfoboxContent;
                                if (infoboxContent?.image) {
                                    infoboxComponentsArray.push({
                                        id: component.id,
                                        type: component.component,
                                        content: (await getCompleteImageObject(
                                            infoboxContent.image
                                        )) as Image,
                                    });
                                }
                                break;
                            }
                            case "p": {
                                const infoboxContent = component.content as InfoboxContent;
                                if (infoboxContent?.text) {
                                    infoboxComponentsArray.push({
                                        id: component.id,
                                        type: component.component,
                                        content: infoboxContent.text as string,
                                    });
                                }
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case "accordion": {
                accordionItems.push(contentItem);
                break;
            }
            case "howto-teaser": {

                const howToData = await processHowToData(
                    // @ts-ignore - howto is not defined in the types TODO: fix this
                    (contentItem.content?.howto as any).params.teaser.reference.id, locale);

                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: howToData as Array<ContentComponent[]>,
                });
                break;
            }
            case "image": {
                const infoboxContent = contentItem.content as InfoboxContent;
                if (infoboxContent?.image) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: (await getCompleteImageObject(
                            infoboxContent.image,
                            infoboxContent?.text,
                            contentItem?.styles?.["text-alignment"] as "left" | "right"
                        )) as Image,
                    });
                }
                break;
            }
            case "youtube": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content as YoutubeContent,
                });
                break;
            }
            case "gallery-teaser": {
                // @ts-ignore - gallery is not defined in the types
                const galleryContent = await processCarouselData((contentItem.content?.gallery).params.teaser.reference.id);
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: galleryContent as ContentGallery[],
                });
                break;
            }
            case "p": {
                const infoboxContent = contentItem.content as InfoboxContent;
                if (infoboxContent?.text) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: infoboxContent.text as string,
                    });
                }
                break;
            }
            case "subtitle": {
                const infoboxContent = contentItem.content as InfoboxContent;
                if (infoboxContent?.title) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: infoboxContent.title as string,
                    });
                }
                break;
            }
            case "commune-agency-picker": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: await getCommunePages(),
                });
                break;
            }
            case "title": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: (contentItem.content as { title: string })?.title as string
                });
                break;
            }
            case "lead": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: (contentItem.content as { text: string })?.text as string
                });
                break;
            }
            case "table": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.containers as Tables
                });
                break;
            }
            case "free-html": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content as FreeHTML

                });
                break;
            }
            case "list": {
                const listContent = contentItem.containers?.list;
                if (listContent) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: listContent as TypeList[],
                    });
                }
                break;
            }

            default: {
                console.log(`component ${contentItem.component} not found`);
            }
        }
    }

    if (faqItems.length > 0) {
        const faqContent = await createFAQCollapsibleArray(faqItems, locale);
        if (faqContent && !isNestedInCollapsible) {
            accordionComponentsArray.push(...faqContent);
        } else if (faqContent) {
            contentComponentsArray.push({
                id: randomUUID(),
                type: "faqCollapsible",
                content: faqContent,
            });
        }
    }

    if (accordionItems.length > 0) {
        const accordionContent = await createAccordionCollapsibleArray(
            accordionItems, locale
        );
        if (accordionContent) {
            accordionComponentsArray.push(...accordionContent);
        }
    }

    if (infoboxComponentsArray.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            refTitle: infoBoxTitle,
            type: "infobox",
            content: infoboxComponentsArray,
        });
    }

    if (accordionComponentsArray.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "collapsible",
            content: accordionComponentsArray,
        });
    }

    return contentComponentsArray;
};
