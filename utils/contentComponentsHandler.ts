import type { PublicationContainerComponent } from "~/core/types/publications";
import {
    createAccordionCollapsibleArray,
    createFAQCollapsibleArray
} from "~/components/Collapsible/utils/collapsibleUtils";
import type { ContentComponent } from "~/core/types/contentComponents";
import { randomUUID } from "uncrypto";
import type { Image } from "~/components/HomeCarousel/types/types";
import { getCompleteImageObject } from '~/utils/image';

export const contentComponents = async (content: PublicationContainerComponent[]): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = [];
    const accordionItems: PublicationContainerComponent[] = [];
    let contentComponentsArray: ContentComponent[] = [];

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
                                contentComponentsArray.push({
                                    id: component.id,
                                    type: component.component,
                                    content: await getCompleteImageObject(component.content.image) as Image
                                });
                                break;
                            }
                            case "p": {
                                contentComponentsArray.push({
                                    id: component.id,
                                    type: component.component,
                                    content: component.content.text as string
                                });
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
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: await getCompleteImageObject(contentItem.content.image) as Image
                });
                break;
            }
            case "p": {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content.text as string
                });
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
            contentComponentsArray.push({
                id: randomUUID(),
                type: "faq-teaser",
                content: faqContent
            });
        }
    }

    if (accordionItems.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "accordion",
            content: createAccordionCollapsibleArray(accordionItems)
        });
    }

    return contentComponentsArray;
};