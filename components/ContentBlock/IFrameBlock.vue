<template>
  <div :style="wrapperStyle">
    <div class="relative w-full overflow-hidden" :style="containerStyle">
      <iframe
        class="absolute inset-0 w-full h-full"
        type="text/html"
        :src="url"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import ContentBlockMixin from './ContentBlockMixin'

export default {
  mixins: [ContentBlockMixin],
  computed: {
    params() {
      return this.contentData.content.iframeInclude.params
    },
    width() {
      return this.params.width || 560
    },
    height() {
      return this.params.height || 315
    },
    url() {
      return this.params.url
    },
    containerStyle() {
      const aspectRatio = (this.height / this.width) * 100

      return {
        'padding-top': `${aspectRatio}%`,
      }
    },
    wrapperStyle() {
      return {
        'max-width': `${this.width}px`,
      }
    },
  },
}
</script>
