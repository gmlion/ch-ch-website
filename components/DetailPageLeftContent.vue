<template>
  <div class="flex flex-col justify-between h-full pb-8 mb-8 left-content">
    <div>
      <h1 tabindex="0" class="title">{{ title }}</h1>
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="mt-8 not-italic leading-6 lead"
        tabindex="0"
        v-html="leadText"
      ></p>
      <!-- eslint-enable vue/no-v-html -->
      <detail-page-info-box
        v-if="infoBoxContent !== undefined"
        :content-block="infoBoxContent"
        class="mt-8"
      />
    </div>

    <all-topic-link class="!lg:hidden hover:text-tertiary-yellow" />
  </div>
</template>

<script>
import AllTopicLink from "~/components/BackToOverviewLink.vue";
import DetailPageInfoBox from "./DetailPageInfoBox.vue";
export default {
  components: {
    AllTopicLink,
    DetailPageInfoBox,
  },
  props: {
    content: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    leadText() {
      if (!this.content) {
        return "";
      }

      for (const contentBlock of this.content) {
        const identifier = contentBlock.identifier;

        // 'p:1:1.video', p:1:1.lead etc.
        const type = identifier.split(".").pop();
        if (type === "lead") {
          return contentBlock.content?.text;
        }
      }

      return "";
    },
    infoBoxContent() {
      if (!this.content) {
        return null;
      }
      return this.content.find(
        (content) => content.identifier.split(".")[1] === "infobox"
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
/* We need to override the SVG with a differently colored one, (currently, yellow) because on the detail page left content the background is blue */
:deep(p a[target="_blank"]:after) {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNLTEwMjAtMjQxMkg1ODB2NTEyMGgtMTYwMHoiLz48cGF0aCBkPSJNMTQuMDY3IDQuNzZsMTEuMTMuNDQyLjMyMyAxMS4wNjUtMi4yOTMuMDY4LS4yMTMtNy4zMTRMNS45NDggMjYuMDg2bC0xLjYyMS0xLjYyMkwyMS40NDMgNy4zNDhsLTcuNDY3LS4yOTd6IiBmaWxsPSIjOUE4QjE0IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+Cg==")
    no-repeat;
  background-size: cover;
}

.title {
  word-break: break-word;
  hyphens: auto;
}
</style>
