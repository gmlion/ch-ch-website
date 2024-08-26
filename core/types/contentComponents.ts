import type {PublicationComponent} from "~/core/types/publications";
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

export interface ContentComponent {
    id: string;
    type: string;
    content: CollapsibleContent[] | PublicationComponent[] | Image | string  ;
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

export interface BodyComponent<content> {
    component: string;
    identifier: string;
    id: string;
    content: content;
}