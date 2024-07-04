<template>
  <div class="px-2 overflow-hidden font-sans xl:px-10">
    <Iframe
      ref="freeHtmlIframe"
      class="free-html--iframe"
      :srcdoc="freeHtmlContent"
    />
  </div>
</template>

<script>
// import AccordionEventBus from '@/utils/accordionEventBus'
import ContentComponentMixin from "@/components/ContentComponentMixin";
import ContentBlockMixin from "./ContentBlockMixin";

export default {
  mixins: [ContentBlockMixin, ContentComponentMixin],
  computed: {
    freeHtmlContent() {
      return this.contentData.content["free-html"]?.params?.freehtml;
    },
  },
  mounted() {
    // AccordionEventBus.$on('setIsAccordionOpen', this.setIsAccordionOpen)
    this.$nextTick(() => {
      // Set small timeout to wait for the whole iframe content to be loaded, to get the whole height.
      setTimeout(() => {
        this.calculateIframeHeight();
      }, 100);
    });
  },
  beforeDestroy() {
    AccordionEventBus.$off("setIsAccordionOpen", this.setIsAccordionOpen);
  },
  methods: {
    setIsAccordionOpen() {
      this.isAccordionOpen = !this.isAccordionOpen;
      // If an accordion is opened we need to recalculate the iframe height,
      // because inside a accordion the html isn't rendered yet and thus has a height of 0.
      this.calculateIframeHeight();
    },
    calculateIframeHeight() {
      const iframe = this.$refs.freeHtmlIframe;
      const iframeContent = iframe.contentWindow;
      let iframeContentHeight = iframeContent.document.body.scrollHeight;
      iframeContentHeight += 200;
      iframe.style.height = iframeContentHeight + "px";
    },
  },
};
</script>

<style lang="postcss" scoped>
:deep(.free-html--iframe) {
  @apply w-full min-h-[300px] h-full;
}
</style>
