import type {Carousel, Image} from "~/components/HomeCarousel/types/types";
import type {BodyComponent, RichtextContent} from "~/core/types/contentComponents";

type Design = { name: string; version: string };
type Language = { label: string; locale: string; groupId: string };

interface Content extends PublicationComponent {
    containers: {
        left: PublicationContainerComponent[] | [];
        right: PublicationContainerComponent[] | [];
        body: BodyComponent<RichtextContent>[] | [];
    };
}

export interface PublicationContainerComponent extends PublicationComponent {
    containers: {
        carousel: Carousel[];
        infobox: PublicationComponent[],
        body: BodyComponent<RichtextContent>[] | [];
    };
}





export interface Link {
    params: {
        link: {
            $ref: string;
            reference: { id: string };
        };
    };
    service: string;
}

export interface PublicationComponent {
    component: string;
    indentifier: string;
    id: string;
    position?: string;
    content: {
        title?: string;
        text?: string;
        question: string;
        faq?: FAQ,
        richtext?: string[];
        image?: Image;
    };

}


export interface FAQ {
    service: "faq-teaser";
    params: {
        teaser: {
            $ref: "document";
            reference: {
                id: string;
            };
        };
    };
}

type teaserImage = string | undefined;

export interface SystemData {
    projectId: number;
    channelId: number;
    documentId: number;
    contentType: string;
    documentType: string;
    title: string;
    publicationId: number;
    firstPublicationDate: string;
    lastPublicationDate: string;
    updatedAt: string;
    significantPublicationDate: string;
    visiblePublicationDate: string;
    design: Design;
    layout: string;
}

export interface Metadata {
    twitterImage: any;
    openGraphImage: any;
    title: string;
    language: Language;
    description: string;
    canonical: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterCard: string;
    openGraphTitle: string;
    openGraphDescription: string;
    openGraphType: string;
    slug: string;
    seoRobots: string;
    teaserImage: teaserImage;
    "tag-category"?: {
        $ref: string;
        reference: {
            id: string;
        };
    };
}

export interface Publication {
    systemdata: SystemData;
    metadata: Metadata;
    content: Content[];
}

export type WrapFunction = (...args: any[]) => any;

export type MinimizedPublicationType = {
    metadata: { title: string; language: { locale: string } };
    systemdata: { documentId: number };
};

export interface PublicationOptions {
    offset: number;
    contentTypes?: string;
}