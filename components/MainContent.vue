<template>
  <div :itemscope="hasFaq" :itemtype="itemType" class="components">
    <div v-for="contentBlock in contentList" :key="contentBlock.id">
      <component
        :is="getContentComponent(contentBlock)"
        :content-data="contentBlock"
        class="mb-8"
      />
    </div>
  </div>
</template>

<script>
import ContentComponentMixin from '@/components/ContentComponentMixin'

export default {
  mixins: [ContentComponentMixin],
  props: {
    contentList: {
      type: Array,
      required: true,
    },
    showAccordions: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    hasFaq() {
      if (!this.contentList) {
        return false
      }
      let hasFaq = false
      // Search in the content for a faq
      this.contentList.forEach((content) => {
        if (content.content && content.content.faq) {
          hasFaq = true
        }
        if (content.containers?.body) {
          content.containers.body.forEach((item) => {
            if (item.content && item.content.faq) {
              hasFaq = true
            }
          })
        }
      })
      return hasFaq
    },
    itemType() {
      if (this.hasFaq) {
        return 'https://schema.org/FAQPage'
      }
      return ''
    },
  },
  created() {
    if (!this.contentList) {
      return
    }

    let isAccordion = false
    let lastAccordion = null

    for (const contentBlock of this.contentList) {
      if (!('content' in contentBlock) && !('containers' in contentBlock)) {
        continue
      }
      const componentIdentifier = contentBlock.identifier.split('.')[1]
      // If the content is a h2 element we will handle it as an accordion
      if (
        componentIdentifier === 'accordion' ||
        componentIdentifier === 'faq-teaser'
      ) {
        if (!isAccordion) {
          contentBlock.isFirst = true
        }
        lastAccordion = contentBlock
        isAccordion = true
      }
    }
    if (lastAccordion) {
      lastAccordion.isLast = true
    }
  },
}
</script>
