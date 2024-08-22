<script lang="ts" setup>
import type {ContentComponent} from "~/core/types/contentComponents";
import Collapsible from "~/components/Collapsible/Collapsible.vue";
const props = defineProps<{
  contentComponent: ContentComponent[]
}>()
</script>
<template>

<div v-for="component in props.contentComponent" :key="component.id">
  <component v-if="component.type === 'faq-teaser'" :is="Collapsible" :content="component.content"  />
  <!-- <component v-else-if="props.contentComponents[0].component === 'another-component'" :is="AnotherComponen</div> !-->
</div>
</template>