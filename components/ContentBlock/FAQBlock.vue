<template>
  <div
    class="accordion-container"
    itemscope
    itemprop="mainEntity"
    itemtype="https://schema.org/Question"
    :class="{ 'mb-0': !contentData.isLast }"
  >
    <div v-if="contentData.isFirst" class="flex justify-end mb-7">
      <button class="relative text-lg font-semibold toggle" @click="toggleAll">
        {{ showOpenAll ? $t("openAll") : $t("closeAll") }}
      </button>
    </div>
    <accordion-item
      :accordion-anchor-hash="slug"
      :is-faq="true"
      :is-inside-other="isInsideAccordion"
    >
      <span slot="Title" itemprop="name">{{ question }}</span>
      <template slot="Body">
        <div
          itemscope
          itemprop="acceptedAnswer"
          itemtype="https://schema.org/Answer"
        >
          <div itemprop="text">
            <component
              :is="getContentComponent(contentBlock)"
              v-for="contentBlock in items"
              :key="contentBlock.id"
              :content-data="contentBlock"
              class="mb-8"
            />
          </div>
        </div>
      </template>
    </accordion-item>
  </div>
</template>

<script>
import AccordionItem from "@/components/AccordionItem.vue";
import ContentComponentMixin from "@/components/ContentComponentMixin";
import { mapState } from "vuex";
import AccordionMixin from "@/components/ContentBlock/AccordionMixin";
import { slugify } from "@/utils/slugifyAnchorElements";
import { cleanUpText } from "../../utils/_text";
import ContentBlockMixin from "./ContentBlockMixin";

export default {
  components: {
    AccordionItem,
  },
  mixins: [ContentBlockMixin, ContentComponentMixin, AccordionMixin],
  props: {
    isInsideAccordion: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  fetch() {
    const faqDocument = this.faqs.find(
      (faq) =>
        faq.systemdata.documentId ===
        parseInt(this.contentData.content.faq.params.teaser.reference.id)
    );
    this.faqDocument = faqDocument;
  },
  data() {
    return {
      faqDocument: null,
    };
  },
  computed: {
    ...mapState("publications", ["faqs"]),
    items() {
      if (!this.faqDocument) {
        return [];
      }
      return this.faqDocument.content[0].containers.body;
    },
    question() {
      if (!this.faqDocument) {
        return "";
      }
      return cleanUpText(this.faqDocument.content[0].content?.question || "");
    },
    slug() {
      if (!this.question) return "";

      return slugify(this.question);
    },
  },
};
</script>
