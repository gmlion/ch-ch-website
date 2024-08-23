import type {InfoBox} from "~/core/types/publications";

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
    content: CollapsibleContent[] | InfoBox[];
}

export interface RichtextContent {
    text: string;
}

export interface RichtextComponent {
    component: string;
    identifier: string;
    id: string;
    content: RichtextContent;
}