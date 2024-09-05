import type { Publication } from "~/core/types/publicationsTypes";
import {getBaseUrl} from "~/utils/url";

export default function metaDataGenerator(
  publication: Publication,
  locale: string
) {
  return {
    htmlAttrs: {
      lang: locale,
    },
    title: publication?.metadata?.metaTitle || "ch-ch",
    link: [
      {
        rel: "canonical",
        href: getBaseUrl() + locale + "/",
      },
    ],
    meta: [
      {
        hid: "robots",
        name: "robots",
        content: publication.metadata.seoRobots,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: publication?.metadata?.openGraphTitle || "",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: publication?.metadata?.openGraphDescription || "",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: publication?.metadata?.openGraphImage?.url || "",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: publication?.metadata?.openGraphType || "",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: publication?.metadata?.twitterTitle || "",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: publication?.metadata?.twitterDescription || "",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@ch_portal",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: publication?.metadata?.twitterCard || "",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: publication?.metadata?.twitterImage?.url || "",
      },
      {
        hid: "description",
        name: "description",
        content: publication?.metadata?.metaDescription || "",
      },
      {
        hid: "title",
        name: "title",
        content: publication?.metadata?.metaTitle || "",
      },
    ],
  };
}