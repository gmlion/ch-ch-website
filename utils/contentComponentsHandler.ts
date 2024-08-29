import type { PublicationContainerComponent } from "~/core/types/publicationsTypes";
import {
    createAccordionCollapsibleArray,
    createFAQCollapsibleArray
} from "~/components/Collapsible/utils/collapsibleUtils";
import type {
    ContentComponent,
    YoutubeContent,
    InfoboxContent,
    CollapsibleContent
} from "~/core/types/contentComponentsTypes";
import { randomUUID } from "uncrypto";
import type { Image } from "~/components/HomeCarousel/types/types";
import { getCompleteImageObject } from '~/utils/image';

export const contentComponents = async (content: PublicationContainerComponent[]): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = [];
    const accordionItems: PublicationContainerComponent[] = [];
    const accordionComponentsArray: CollapsibleContent[] = [];
    const contentComponentsArray: ContentComponent[] = [];

    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            }
            case "infobox": {
                if (contentItem.containers.infobox.length > 0) {
                    for (const component of contentItem.containers.infobox) {
                        switch (component.component) {
                            case "image": {
                                const infoboxContent = component.content as InfoboxContent;
                                if (infoboxContent.image) {
                                    contentComponentsArray.push({
                                        id: component.id,
                                        type: component.component,
                                        content: await getCompleteImageObject(infoboxContent.image) as Image
                                    });
                                }
                                break;
                            }
                            case "p": {
                                const infoboxContent = component.content as InfoboxContent;
                                if (infoboxContent.text) {
                                    contentComponentsArray.push({
                                        id: component.id,
                                        type: component.component,
                                        content: infoboxContent.text as string
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
            case "image": {
                const infoboxContent = contentItem.content as InfoboxContent;
                if (infoboxContent.image) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: await getCompleteImageObject(infoboxContent.image) as Image
                    });
                }
                break;
            }
            case "youtube": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content as YoutubeContent
                });
                break;
            }
            case "p": {
                const infoboxContent = contentItem.content as InfoboxContent;
                if (infoboxContent.text) {
                    contentComponentsArray.push({
                        id: contentItem.id,
                        type: contentItem.component,
                        content: infoboxContent.text as string
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
        const faqContent = await createFAQCollapsibleArray(faqItems);
        if (faqContent) {
            accordionComponentsArray.push(...faqContent);
        }
    }

    if (accordionItems.length > 0) {
        const accordionContent = createAccordionCollapsibleArray(accordionItems);
        if (accordionContent) {
            accordionComponentsArray.push(...accordionContent);
        }
    }

    if (accordionComponentsArray.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "collapsible",
            content: accordionComponentsArray
        });
    }

    return contentComponentsArray;
};