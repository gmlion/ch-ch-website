<template>
  <div :class="{ 'mb-0': !contentData.isLast }">
    <div v-if="contentData.isFirst" class="flex justify-end mb-7">
      <button class="relative text-lg font-semibold toggle" @click="toggleAll">
        {{ showOpenAll ? $t('openAll') : $t('closeAll') }}
      </button>
    </div>

    <accordion-item
      :accordion-anchor-hash="slug"
      :class="contentData.isFirst ? 'accordion-item--first' : ''"
    >
      <span slot="Title">
        <a :id="slug" class="anchor"></a>
        {{ title }}
      </span>
      <template slot="Body">
        <component
          :is="getContentComponent(contentBlock)"
          v-for="contentBlock in contentData.containers.body"
          :key="contentBlock.id"
          :content-data="contentBlock"
          class="mb-8"
          :is-inside-accordion="true"
        />
      </template>
    </accordion-item>
  </div>
</template>

<script>
import AccordionItem from '@/components/AccordionItem.vue'
import ContentComponentMixin from '@/components/ContentComponentMixin'
import AccordionMixin from '@/components/ContentBlock/AccordionMixin'
import { cleanUpText } from '@/utils/text'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  components: {
    AccordionItem,
  },
  mixins: [ContentBlockMixin, ContentComponentMixin, AccordionMixin],
  computed: {
    title() {
      if (!this.contentData.content?.title) {
        return ''
      }
      return cleanUpText(this.contentData.content.title)
    },
    slug() {
      if (this.contentData.content && 'slug' in this.contentData.content) {
        return this.contentData.content.slug
      }
      return ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.toggle {
  &:after {
    @apply bg-tertiary-yellow;
    @apply absolute bottom-[-3px] left-0;
    content: '';
    width: 100%;
    height: 2px;
  }
}
</style>
