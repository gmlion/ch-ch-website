<template>
  <div :class="layoutClasses" class="flex">
    <image-overlay
      v-if="isOverlayOpen && showOverlay"
      :alt-text="altText"
      :content="contentData.content"
      :show-text="showTextInOverlay"
      @close="closeOverlay"
    />
    <figure class="flex flex-col" :class="figureClasses">
      <picture class="cursor-pointer" @click="isOverlayOpen = !isOverlayOpen">
        <img
          ref="image"
          :style="{ 'max-width': maxWidth }"
          class="w-full"
          :class="imgClasses"
          :src="contentData.content.image.url"
          :alt="altText"
        />
      </picture>

      <!-- eslint-disable vue/no-v-html -->
      <figcaption
        v-if="contentData.content.caption"
        class="max-w-full mt-5"
        :style="{ 'max-width': maxWidth }"
        v-html="contentData.content.caption"
      ></figcaption>
    </figure>

    <div
      v-if="hasText"
      class="mt-4 lg:w-1/2 lg:mt-0"
      :class="{ 'lg:pl-8': isTextRight, 'lg:pr-8': !isTextRight }"
      v-html="contentData.content.text"
    ></div>
  </div>
</template>

<script>
import ContentBlockMixin from './ContentBlockMixin'
import ImageOverlay from './ImageOverlay.vue'

export default {
  components: {
    ImageOverlay,
  },
  mixins: [ContentBlockMixin],
  props: {
    imgClass: {
      type: String,
      required: false,
      default: '',
    },
    figureClass: {
      type: String,
      required: false,
      default: '',
    },
    showOverlay: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  async fetch() {
    const metadata = await this.$axios.get(
      `/mediaLibrary/${this.contentData.content.image.mediaId}`
    )

    this.altText = metadata?.data?.metadata?.['alt-text'] || ''
  },
  data() {
    return {
      altText: '',
      isOverlayOpen: false,
      captionWidth: '100%',
    }
  },
  computed: {
    figureClasses() {
      const classes = { 'lg:w-1/2': this.hasText }

      if (this.figureClass) {
        classes[this.figureClass] = true
      }

      return classes
    },
    hasText() {
      return (
        this.contentData.content.text &&
        this.contentData?.styles?.['text-alignment']
      )
    },
    isTextRight() {
      return this.contentData?.styles?.['text-alignment'] === 'right'
    },
    /**
     * Determine whether the image and text are side by side or in the center
     * and in the first case, on which side!
     */
    layoutClasses() {
      const classes = {
        'flex-col': true,
        'lg:flex-row': this.hasText,
        'items-center': this.isVertical,
        'lg:items-start': this.hasText,
      }

      if (this.hasText) {
        return Object.assign(classes, {
          [`lg:space-x-2`]: this.isTextRight,
          [`lg:flex-row-reverse`]: !this.isTextRight,
        })
      }

      // If there's no text, have some more space around it on mobile
      if (this.isVertical) {
        return Object.assign(classes, { 'px-10': true })
      }

      return []
    },
    imgClasses() {
      const classes = this.imgClass.split(' ')
      if (this.isVertical) {
        classes.push('m-auto')
      }
      return classes
    },
    maxWidth() {
      const image = this.contentData.content.image
      if (image.crop) {
        const crop = image.crop
        if (crop.width < crop.height) {
          return crop.width + 'px'
        }
      } else if (image.width < image.height) {
        return image.width + 'px'
      }

      return '100%'
    },
    isVertical() {
      const image = this.contentData.content.image

      return image.height > image.width
    },
    showTextInOverlay() {
      return this.contentData.content.caption !== undefined
    },
  },
  methods: {
    closeOverlay() {
      this.isOverlayOpen = false
    },
  },
}
</script>
