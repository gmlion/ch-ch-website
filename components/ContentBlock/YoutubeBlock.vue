<template>
  <youtube-player
    :id="contentData.id"
    :width="width"
    :height="height"
    :url="url"
  />
</template>

<script>
import YoutubePlayer from '@/components/YoutubePlayer'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  components: { YoutubePlayer },
  mixins: [ContentBlockMixin],
  computed: {
    params() {
      return this.contentData.content.youtubeInclude.params
    },
    width() {
      return this.params.width || 560
    },
    height() {
      return this.params.height || 315
    },
    url() {
      const ytUrl = this.params.url
      let regex

      if (ytUrl.match(/^https?:\/\/youtu.be/)) {
        // the url is of the form
        // https://youtu.be/_snMPWw7K8M?list=PLEnHzNShzOwY9hO6PHz6gH-VwHW-Ge4Gq
        regex = /youtu.be\/([^?]+)/
      } else {
        regex = /watch\?v=([^&]+)/
      }
      const matches = ytUrl.match(regex)

      const identifier = (matches && matches[1]) || ''
      const url = `https://www.youtube.com/embed/${identifier}?autoplay=0`
      return url
    },
  },
}
</script>
