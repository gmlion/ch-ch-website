<template>
  <!-- eslint-disable-next-line vue/no-v-html-->
  <p v-if="cantonPickers.length === 0" tabindex="0" v-html="text"></p>
  <div v-else>
    <!-- Duplicate so we dont have a div if there is no canton picker -->
    <!-- eslint-disable-next-line vue/no-v-html-->
    <p tabindex="0" class="mb-8" v-html="text" />
    <canton-block
      v-for="cantonPicker in cantonPickers"
      ref="cantonBlocks"
      :key="cantonPicker.cantonPickerId"
      class="mb-8"
      :canton-service="cantonPicker.publication"
    />
  </div>
</template>

<script>
import { replaceInternalLinks, replaceEmptyLinks } from "../../utils/_text";
import ContentBlockMixin from "./ContentBlockMixin";

export default {
  mixins: [ContentBlockMixin],
  async fetch() {
    try {
      const text = this.contentData.content.text;
      const emptyLinksRemoved = replaceEmptyLinks(text);
      const { replacedText, cantonPickers } = await replaceInternalLinks(
        emptyLinksRemoved,
        this.$axios.get,
        this.$store.state.menu.isElection
      );
      this.text = replacedText;
      this.cantonPickers = cantonPickers;
    } catch (err) {
      this.text = this.contentData.content.text;
      // eslint-disable-next-line
      console.log(err);
    }
  },
  data() {
    return {
      text: "",
      cantonPickers: [],
    };
  },
  mounted() {
    // Initalize the cantonpicker links
    this.cantonPickers.forEach((cantonPicker, index) => {
      const element = document.querySelector(
        `[canton-picker-id="${cantonPicker.cantonPickerId}"]`
      );
      element.addEventListener("click", () => {
        this.$refs.cantonBlocks[index].showBlock();
      });
      element.classList.add("cursor-pointer");
    });
  },
};
</script>
