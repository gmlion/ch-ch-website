import type {PublicationContainerComponent} from "~/core/types/publications";
import {
    createAccordionCollapsibleArray,
    createFAQCollapsibleArray
} from "~/components/Collapsible/utils/collapsibleUtils";
import type {ContentComponent} from "~/core/types/contentComponents";
import {randomUUID} from "uncrypto";
import {handleInfoBox} from "~/components/InfoBox/utils/infoBoxUtils";
import type {Image} from "~/components/HomeCarousel/types/types";

export const contentComponents = async (content: PublicationContainerComponent[]): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = []
    const accordionItems: PublicationContainerComponent[] = []
    let contentComponentsArray: ContentComponent[] = []
    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            } case "infobox": {
                if (contentItem.containers.infobox.length > 1) {
                    contentItem.containers.infobox.forEach((component) => {
                        switch (component.component) {
                            case "image" : {
                                contentComponentsArray.push({
                                    id: component.id,
                                    type: component.component,
                                    content: component.content.image as Image
                                })
                            } break;
                            case "p" : {
                                contentComponentsArray.push({
                                    id: component.id,
                                    type: component.component,
                                    content: component.content.text as string
                                })
                            } break;

                        }
                    })
                }
                break;
            } case "accordion": {
                accordionItems.push(contentItem);
            } break;
            case "image" : {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content.image as Image
                })
            } break;
            case "p" : {
                contentComponentsArray.push({
                    id: contentItem.id,
                    type: contentItem.component,
                    content: contentItem.content.text as string
                })
            } break;
            // case "lead": {
            //     conosle.log(contentItem.content.text)
            //     contentComponentsArray.push({
            //         id: randomUUID(),
            //         type: "lead",
            //         content: contentItem.content.text
            //     })
            //     break;
            // } case "title": {
            //     contentComponentsArray.push({
            //         id: randomUUID(),
            //         type: "title",
            //         content: contentItem.content.title
            //     })
            // } break;
        }
    }
    if (faqItems.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "faq-teaser",
            content: await createFAQCollapsibleArray(faqItems)
        })
    }
    if (accordionItems.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "accordion",
            content: createAccordionCollapsibleArray(accordionItems)
        })
    }
    return contentComponentsArray;
}