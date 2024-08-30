import type {Metadata, PublicationContainerComponent, TypeCategory} from "~/core/types/publicationsTypes";
import {
    createAccordionCollapsibleArray,
    createFAQCollapsibleArray
} from "~/components/Collapsible/utils/collapsibleUtils";
import type {
    ContentComponent,
    YoutubeContent,
    InfoboxContent,
    CollapsibleContent, TitleLead
} from "~/core/types/contentComponentsTypes";
import { randomUUID } from "uncrypto";
import type { Image } from "~/components/HomeCarousel/types/types";
import { getCompleteImageObject } from '~/utils/image';
import {getTitleByTag} from "~/utils/tags";

export const contentComponents = async (content: PublicationContainerComponent[], locale: string): Promise<ContentComponent[] | []> => {
    const faqItems: PublicationContainerComponent[] = [];
    const accordionItems: PublicationContainerComponent[] = [];
    const accordionComponentsArray: CollapsibleContent[] = [];
    const contentComponentsArray: ContentComponent[] = [];
    const infoboxComponentsArray: ContentComponent[] = [];
    let infoBoxTitle: string = "";
    let titleLeadComponentsArray: TitleLead = {title: "", lead: ""};

    for (const contentItem of content) {
        switch (contentItem.component) {
            case "faq-teaser": {
                faqItems.push(contentItem);
                break;
            }
            case "infobox": {
                if (contentItem.containers.infobox.length > 0) {
                    const infoBoxRefMetadata = await getTitleByTag( (contentItem.content as { category: TypeCategory }).category.params.category.reference.id) ;
                    if (infoBoxRefMetadata) {
                        infoBoxTitle = infoBoxRefMetadata[`label_${locale}` as keyof Metadata];                        console.log(infoBoxTitle);
                    }
                    for (const component of contentItem.containers.infobox) {
                        switch (component.component) {
                            case "image": {
                                const infoboxContent = component.content as InfoboxContent;
                                if (infoboxContent.image) {
                                    infoboxComponentsArray.push({
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
                                    infoboxComponentsArray.push({
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
            case "title": {
                titleLeadComponentsArray.title = (contentItem.content as { title: string }).title;
                break;
            }
            case "lead": {
                titleLeadComponentsArray.lead = (contentItem.content as { text: string }).text;
            break;
            }
            default: {
                console.log(`component ${contentItem.component} not found`);
            }
        }
    }

    if (titleLeadComponentsArray.title || titleLeadComponentsArray.lead) {
        contentComponentsArray.push({
            id: randomUUID(),
            type: "titleLead",
            content: titleLeadComponentsArray
        });
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

    if (infoboxComponentsArray.length > 0) {
        contentComponentsArray.push({
            id: randomUUID(),
            refTitle: infoBoxTitle,
            type: "infobox",
            content: infoboxComponentsArray
        })
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