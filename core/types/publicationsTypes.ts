import type {Carousel, Image} from "~/components/HomeCarousel/types/types";
import type {BodyComponent, RichtextContent, YoutubeContent} from "~/core/types/contentComponentsTypes";

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

export interface ContentComponents {

}

export interface PublicationComponent {
    component: string;
    identifier: string;
    id: string;
    position?: string;
    content: {
        title?: string;
        text?: string;
        question: string;
        faq?: FAQ,
        richtext?: string[];
        image?: Image;
        category: TypeCategory;
    } | YoutubeContent;

}

export interface TypeCategory {
    service: string;
    params: {
        category: {
            $ref: string;
            reference: {
                id: string;
            };
        };
    }

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
    name: string;
    name_de?: string;
    name_en?: string;
    name_fr?: string;
    name_it?: string;
    name_rm?: string;
    label_de?: string;
    label_en?: string;
    label_fr?: string;
    label_it?: string;
    label_rm?: string;
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
        references: [{
            id: string;
        }];
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