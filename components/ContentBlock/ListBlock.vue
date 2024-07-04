<template>
  <component :is="component" class="list-block">
    <template v-for="item in items">
      <li v-if="isContent(item)" :key="item.id">
        <component
          :is="getComponent(item)"
          class="inline-block"
          :content-data="item"
        />
      </li>
      <component
        :is="getComponent(item)"
        v-else
        :key="item.id"
        :class="{ 'inline-block': getComponent(item) !== 'ListBlock' }"
        :content-data="item"
      />
    </template>
  </component>
</template>

<script>
import TextBlock from '@/components/ContentBlock/TextBlock'
import ListBlock from '@/components/ContentBlock/ListBlock'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  name: 'ListBlock',
  components: {
    TextBlock,
    ListBlock,
  },
  mixins: [ContentBlockMixin],
  computed: {
    component() {
      return this.contentData.styles?.['list-type'] === 'list--numbers'
        ? 'ol'
        : 'ul'
    },
    items() {
      return this.contentData.containers.list
    },
  },
  methods: {
    getComponent(item) {
      if (!item.content && !item.containers) {
        return ''
      }
      if (item.content && 'text' in item.content) {
        return 'TextBlock'
      }
      if (item.containers && 'list' in item.containers) {
        return 'ListBlock'
      }
    },
    isContent(item) {
      return 'content' in item
    },
  },
}
</script>
