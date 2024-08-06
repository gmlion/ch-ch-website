<template>
  <h3 :id="slug" class="mb-4">{{ text }}</h3>
</template>

<script>
import { cleanUpText } from "~/utils/_text";
import ContentBlockMixin from "./ContentBlockMixin";

export default {
  mixins: [ContentBlockMixin],
  fetch() {
    this.text = cleanUpText(this.contentData.content.title);
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    slug() {
      if (this.contentData.content && "slug" in this.contentData.content) {
        return this.contentData.content.slug;
      }
      return "";
    },
  },
};
</script>
