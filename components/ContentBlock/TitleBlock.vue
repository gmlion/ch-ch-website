<template>
  <div>
    <a :id="slug" class="anchor"></a>
    <h2 class="mb-4 title-anchor">{{ text }}</h2>
  </div>
</template>

<script>
import { cleanUpText } from '@/utils/text'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  mixins: [ContentBlockMixin],
  fetch() {
    this.text = cleanUpText(this.contentData.content.title)
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    slug() {
      if (this.contentData.content && 'slug' in this.contentData.content) {
        return this.contentData.content.slug
      }
      return ''
    },
  },
}
</script>
