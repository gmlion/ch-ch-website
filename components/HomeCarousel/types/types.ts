export interface CarouselContent {
    component: string;
    identifier: string;
    id: string;
    content: {
        link?: {
            params: {
                link: {
                    $ref: string;
                    reference: {
                        id: string;
                    };
                };
            };
            service: string;
        };
        image?: Image;
        title?: string;
        text?: string;
    };
}

export interface Carousel {
    component: string;
    identifier: string;
    id: string;
    content: {
        link?: {
            params: {
                link: {
                    $ref: string;
                    reference: {
                        id: string;
                    };
                };
            };
            service: string;
        };
    };
    styles: {
        "carousel-color": string;
    };
    containers: {
        "carousel-content": CarouselContent[];
    };
}

export interface Image {
    url: string;
    width: number;
    height: number;
    mediaId: string;
    mimeType: string;
    originalUrl: string;
    imageService: string;
    additionalData?: ImageItem;
    text?: string;
    textAlign?: string;
}

export interface ImageMetaData {
    title?: string;
    description?: string;
    altText?: string;
}

export interface CarouselItem {
    id: string;
    href?: string;
    title?: string;
    text?: string;
    image?: Image;
    backgroundColor?: string;
}

type ImageAsset = {
    key: string;
    url: string;
    width: number;
    height: number;
    size: number;
    mimeType: string;
    filename: string;
};

type ImageTranslationMetadata = {
    title: string;
};

export type ImageTranslation = {
    locale: string;
    metadata: ImageTranslationMetadata;
};

type ImageLanguage = {
    label: string;
    locale: string;
};

type ImageMetadata = {
    title: string;
    language: ImageLanguage;
};

export type ImageItem = {
    id: string;
    version: number;
    mediaType: "image";
    asset: ImageAsset;
    translations: ImageTranslation[];
    metadata?: ImageMetadata;
    createdAt: string;
    updatedAt: string;
    state: "active" | "inactive";
};

export type CarouselOnChangeProperties = {
    currentSlideIndex: number;
    prevSlideIndex: number;
    slidesCount: number;
    slidingToIndex: number;
};