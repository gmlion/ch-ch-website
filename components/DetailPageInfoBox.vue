<template>
  <div v-if="category" class="px-6 pt-6 border-2 border-secondary-yellow">
    <p class="mb-8 text-xl font-semibold leading-6">{{ category }}</p>
    <component
      :is="getContentComponent(itemContentBlock)"
      v-for="itemContentBlock in items"
      :key="itemContentBlock.id"
      :content-data="itemContentBlock"
      class="mb-8 not-italic"
      :style="getStyle(itemContentBlock)"
    />
  </div>
</template>

<script>
import ContentComponentMixin from '@/components/ContentComponentMixin'
import { mapState } from 'vuex'

export default {
  mixins: [ContentComponentMixin],
  props: {
    contentBlock: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('publications', ['categories']),
    category() {
      if (!this.contentBlock?.content?.category?.params) {
        return ''
      }

      const documentId = parseInt(
        this.contentBlock.content.category.params.category.reference.id
      )
      const category = this.categories.find(
        (category) => category.systemdata.documentId === documentId
      )
      return category?.metadata[`label_${this.$i18n.locale}`] || ''
    },
    items() {
      return this.contentBlock.containers.infobox
    },
  },
  methods: {
    getStyle(contentBlock) {
      if (contentBlock.content && 'image' in contentBlock.content) {
        return { width: '280px' }
      }
      return {}
    },
  },
}
</script>
