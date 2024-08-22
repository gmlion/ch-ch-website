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
    content: CollapsibleContent[];
}