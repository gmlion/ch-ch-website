<template>
  <div v-for="contentEntry in carouselHead" :key="contentEntry.id">
    <component
      :is="titleElement"
      v-if="isTitle(contentEntry.identifier)"
      :href="documentLink"
    >
      <!-- eslint-disable vue/no-v-html -->
      <h2
        v-if="hasTitle(contentEntry)"
        :key="contentEntry.id"
        class="mb-4 text-navigation-fluid"
        v-html="title"
      ></h2>
      <!-- eslint-enable vue/no-v-html -->
    </component>

    <image-block
      v-if="isImage(contentEntry.identifier) && hasImage(contentEntry)"
      :content-data="contentEntry"
      img-class="w-auto m-auto mb-4 max-h-[20vh]"
      figure-class="mx-auto"
      :show-overlay="false"
    />
  </div>
  <div
    v-if="carouselLead && carouselLead.content"
    ref="leadContainer"
    class="h-full lg:overflow-hidden"
  >
    <text-block
      ref="lead"
      v-line-clamp="lines"
      :content-data="carouselLead"
      class="mb-4 carousel-lead"
    />
    <!-- Disable if lines are not clamped (lines === 9999) -->
    <!-- <v-popover
      ref="popover"
      :disabled="lines === 9999"
      trigger="hover"
      popover-inner-class="popover-inner tooltip-inner popover-inner-small"
    >
      <text-block
        ref="lead"
        v-line-clamp="lines"
        :content-data="carouselLead"
        class="mb-4 carousel-lead"
      />

      <span
        slot="popover"
        class="break-words"
        v-html="carouselLead.content.text"
      >
      </span>

    </v-popover> -->
  </div>
  <div v-if="carouselHtml">
    <free-html-block
      :content-data="carouselHtml"
      class="w-full"
    ></free-html-block>
  </div>
</template>

<script>
import ContentComponentMixin from "@/components/ContentComponentMixin";
// import { VPopover } from "v-tooltip";
import { getPublicationById } from "~/utils/publication";
import { mapState } from "vuex";
import { buildUrlFromPublication, getDocumentPath } from "../../utils/url";
import {
  cleanUpText,
  replaceEmptyLinks,
  replaceInternalLinks,
} from "../../utils/_text";
import FreeHtmlBlock from "./ContentBlock/FreeHtmlBlock.vue";

export default {
  components: {
    // VPopover,
    FreeHtmlBlock,
  },
  mixins: [ContentComponentMixin],
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  async fetch() {
    const documentId = this.content?.content?.link?.params?.link?.reference?.id;

    for (const carouselHead of this.carouselHead) {
      if (!this.isTitle(carouselHead.identifier)) {
        continue;
      }
      const title = carouselHead.content.title;

      const { replacedText } = await replaceInternalLinks(
        title,
        this.$axios.get,
        this.$store.state.menu.isElection
      );

      const emptyLinksRemoved = replaceEmptyLinks(replacedText);

      this.title = cleanUpText(emptyLinksRemoved);
    }

    if (!documentId) {
      return;
    }
    let publication;
    try {
      publication = await getPublicationById(documentId, this.$axios);
      const link = buildUrlFromPublication(
        publication,
        getDocumentPath(parseInt(documentId), this.menu)
      );
      this.documentLink = link;
    } catch (e) {
      const path = this.$route.fullPath;

      // eslint-disable-next-line no-console
      console.error("err", `No carousel content on homepage / ${path}`);
    }
  },
  data() {
    return {
      lines: 2,
      documentLink: "",
      title: "",
    };
  },
  computed: {
    ...mapState("menu", ["menu"]),
    carouselContent() {
      return this.content.containers["carousel-content"];
    },
    carouselHead() {
      return this.content.containers["carousel-content"].filter((content) => {
        return (
          this.isTitle(content.identifier) || this.isImage(content.identifier)
        );
      });
    },
    carouselBody() {
      return this.content.containers["carousel-content"].filter((content) => {
        return (
          !this.isTitle(content.identifier) && !this.isImage(content.identifier)
        );
      });
    },
    carouselLead() {
      return this.content.containers["carousel-content"].find((content) =>
        this.isLead(content.identifier)
      );
    },
    carouselHtml() {
      return this.content.containers["carousel-content"].find((content) =>
        this.isFreeHtml(content.identifier)
      );
    },
    titleElement() {
      if (this.documentLink) {
        return "a";
      }
      return "div";
    },
  },
  mounted() {
    if (this.$refs.leadContainer) {
      window.addEventListener("resize", this.onResize);
      window.requestAnimationFrame(() => {
        this.onResize();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    splitIdentifier(identifier) {
      return identifier.split(".")[1];
    },
    isTitle(identifier) {
      return this.splitIdentifier(identifier) === "title";
    },
    isParagraph(identifier) {
      return this.splitIdentifier(identifier) === "p";
    },
    isImage(identifier) {
      return this.splitIdentifier(identifier) === "image";
    },
    isLead(identifier) {
      return this.splitIdentifier(identifier) === "lead";
    },
    isFreeHtml(identifier) {
      return this.splitIdentifier(identifier) === "free-html";
    },
    hasImage(entry) {
      return entry.content?.image !== undefined;
    },
    hasTitle(entry) {
      return entry.content?.title !== undefined;
    },
    hasText(entry) {
      return entry.content?.text !== undefined;
    },
    onResize() {
      const parent = this.$refs.popover.$el.children[0];

      // if this is true the height is enough too show the full text
      if (parent.clientHeight >= this.$refs.lead.$el.scrollHeight) {
        this.lines = 9999;
      } else {
        // 30 is the height per line
        this.lines = Math.floor(this.$refs.leadContainer.clientHeight / 30);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.carousel-lead {
  @apply whitespace-pre-line;
  /* override the plugin which clamps*/
  word-break: break-word !important;
}

@screen !lg {
  .carousel-lead {
    /* Override the display webkit-box */
    @apply block !important;
  }
}

@screen lg {
  :deep(.trigger),
  .v-popover {
    @apply h-full overflow-hidden;
  }
}
</style>

<style lang="postcss">
.slick-slide {
  visibility: hidden;
}

.slick-active {
  visibility: visible;
}
</style>
