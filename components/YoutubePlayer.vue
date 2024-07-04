<template>
  <div :style="wrapperStyle">
    <div class="relative w-full overflow-hidden" :style="containerStyle">
      <iframe
        :id="id"
        class="absolute inset-0 w-full h-full"
        type="text/html"
        :src="url"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 315,
    },
    width: {
      type: Number,
      default: 560,
    },
    url: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: 'ytplayer',
    },
  },
  computed: {
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
