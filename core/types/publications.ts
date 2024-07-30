type Design = { name: string; version: string };
type Language = { label: string; locale: string; groupId: string };
interface Content extends PublicationComponent {
  containers: {
    left: PublicationContainerComponent[] | [];
    right: PublicationContainerComponent[] | [];
  };
}
export interface Carousel extends PublicationComponent {
  content: {
    link: Link;
  };
}

export interface PublicationContainerComponent extends PublicationComponent {
  containers: {
    carousel: Carousel[];
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
  content: Content;
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
