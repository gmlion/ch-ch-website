import type { Carousel, Image } from "~/components/HomeCarousel/types/types";
import type {
  ContentComponent,
  YoutubeContent,
} from "~/core/types/contentComponentsTypes";

type Design = { name: string; version: string };
type Language = { label: string; locale: string; groupId: string };

interface Content extends PublicationComponent {
  containers: {
    left: PublicationContainerComponent[] | [];
    right: PublicationContainerComponent[] | [];
    body: PublicationContainerComponent[];
  };
}

export interface PublicationContainerComponent extends PublicationComponent {
  styles?: { ["text-alignment"]?: string };
  containers: {
    carousel: Carousel[];
    infobox: PublicationComponent[];
    body: PublicationContainerComponent[] | TableRow[];
    list: TypeList[];
    gallery: ContentGallery[];
    header: TableRow[];
  };
}

export interface Tables {
  header: TableRow[];
  body: TableRow[];
}

export interface TableRow {
  component: string;
  identifier: string;
  id: string;
  containers: {
    [key: string]: TableCell[];
  };
}

export interface TableCell {
  component: string;
  identifier: string;
  id: string;
  containers: {
    [key: string]: TableContent[];
  };
}

export interface TableContent {
  component: string;
  identifier: string;
  id: string;
  content?: {
    text?: string;
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

export interface ContentGallery {
  id: string;
  component: string;
  identifier: string;
  content: {
    image: Image;
    source: string;
    caption: string;
  };
}

export interface PublicationComponent {
  component: string;
  identifier: string;
  id: string;
  position?: string;
  content:
  | {
    title?: string;
    text?: string;
    question: string;
    gallery?: ContentGallery[];
    list: TypeList[];
    faq?: FAQ;
    richtext?: string[];
    image?: Image;
    howTo?: any;
    category: TypeCategory;
  }
  | YoutubeContent
  | FreeHTML;
}

export interface FreeHTML {
  ["free-html"]: {
    service: string;
    params: {
      freehtml: string;
    };
  };
}
export interface TypeList {
  component: string;
  identifier: string;
  id: string;
  content: {
    text: string;
  };
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

export interface Metadata extends CommuneMetadata {
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
    references: [
      {
        id: string;
      }
    ];
  };
}

export interface CommuneMetadata extends CantonListMetadata {
  agency: string;
  streetAddress: string;
  streetNumber: string;
  postalcode: string;
  commune: string;
  email: string;
  phoneNumber: string;
  website: string;
}

export interface CantonListMetadata {
  ["BE-data"]: string,
  ["ZH-data"]: string,
  ["LU-data"]: string,
  ["UR-data"]: string,
  ["SZ-data"]: string,
  ["OW-data"]: string,
  ["NW-data"]: string,
  ["GL-data"]: string,
  ["ZG-data"]: string,
  ["FR-data"]: string,
  ["SO-data"]: string,
  ["BS-data"]: string,
  ["BL-data"]: string,
  ["SH-data"]: string,
  ["AR-data"]: string,
  ["AI-data"]: string,
  ["SG-data"]: string,
  ["GR-data"]: string,
  ["AG-data"]: string,
  ["TG-data"]: string,
  ["TI-data"]: string,
  ["VD-data"]: string,
  ["VS-data"]: string,
  ["NE-data"]: string,
  ["GE-data"]: string,
  ["JU-data"]: string
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
