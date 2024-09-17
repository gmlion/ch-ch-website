import type {FAQ, PublicationComponent} from "~/core/types/publicationsTypes";
import type {Image} from "~/components/HomeCarousel/types/types";

// Union type of valid components
export type ValidComponentType =
    | "p"
    | "subtitle"
    | "youtube"
    | "list"
    | "image" // Add more components as needed
    | "accordion";

export interface CollapsibleContent {
    id: string;
    title: string;
    content?: ContentComponent[];
    slug: string;
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

// Title and lead content structure
export interface TitleLead {
    title?: string;
    lead?: string;
}

// Richtext content structure
export interface RichtextContent {
    title?: string;
    text?: string;
}

// Youtube content structure
export interface YoutubeContent {
    youtubeInclude: {
        service: string;
        params: {
            title: string;
            url: string;
            author: string;
            ratio: string;
        };
    };
}

// Infobox content structure
export interface InfoboxContent {
    title?: string;
    text?: string;
    question: string;
    faq?: FAQ;
    richtext?: string[];
    image?: Image;
    ['text-alignment']?: string;
}

// List component content structure
export interface ListContent {
    items: string[]; // Define what kind of structure your list items have
}

// Image component content structure
export interface ImageContent {
    imageUrl: string;
    altText: string;
}

// Body component type, constrained by ValidComponentType
export interface BodyComponent<ContentType> {
    component: ValidComponentType;
    identifier: string;
    id: string;
    content: ContentType;
}