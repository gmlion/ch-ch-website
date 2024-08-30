import type {FAQ, PublicationComponent} from "~/core/types/publicationsTypes";
import type {Image} from "~/components/HomeCarousel/types/types";

export interface CollapsibleContent {
    id: string;
    title: string;
    content: CollapsibleRichtext;
    slug: string
}

interface CollapsibleRichtext {
    content: string;
}

export type ContentComponent = {
    id: string;
    type: string;
    refTitle?: string;
    content: string | PublicationComponent[] | Image | CollapsibleContent[] | YoutubeContent | ContentComponent[] | TitleLead;
};

export interface TitleLead {
    title?: string;
    lead?: string;
}

export interface RichtextContent {
    title?: string;
    text: string;
}

export interface YoutubeContent {
    youtubeInclude: {
        service: string;
        params: {
            title: string;
            url: string;
            author: string;
            ratio: string;
        }
    }

}


export interface InfoboxContent {
    title?: string;
    text?: string;
    question: string;
    faq?: FAQ;
    richtext?: string[];
    image?: Image;
}



export interface BodyComponent<content> {
    component: string;
    identifier: string;
    id: string;
    content: content;
}