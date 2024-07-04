<template>
  <component :is="headingElement">{{ text }}</component>
</template>

<script>
import ContentBlockMixin from './ContentBlockMixin'

export default {
  mixins: [ContentBlockMixin],
  computed: {
    text() {
      return this.contentData.content.heading
    },
    headingElement() {
      const identifierComponent = this.contentData.identifier.split('.')[1]
      return identifierComponent
    },
  },
}
</script>
