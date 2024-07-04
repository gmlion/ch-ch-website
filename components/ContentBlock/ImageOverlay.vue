<template>
  <div
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-primary-blue bg-opacity-95"
  >
    <figure
      class="px-4 flex flex-col items-center justify-center max-w-[1200px]"
    >
      <picture>
        <img :src="content.image.url" :alt="altText" class="max-h-[65vh]" />
      </picture>

      <!-- eslint-disable vue/no-v-html -->
      <figcaption
        v-if="hasText && showText"
        class="mt-4 md:mt-24 text-primary-white"
        v-html="content.caption"
      ></figcaption>
    </figure>
    <button
      class="absolute top-[25px] right-[25px] md:top-[50px] md:right-[50px]"
      @click="close"
    >
      <svg-icon class="w-8 h-8 text-secondary-yellow" name="close-small" />
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
      <span class="hidden">
        {{ $t('searchCloseButtonTitle') }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    altText: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      default: () => {},
    },
    showText: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    hasText() {
      return this.content.caption || this.content.text
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped></style>
