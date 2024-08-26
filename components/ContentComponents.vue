<script lang="ts" setup>
import type {CollapsibleContent, ContentComponent} from "~/core/types/contentComponents";
import Collapsible from "~/components/Collapsible/Collapsible.vue";

const props = defineProps<{
  contentComponent: ContentComponent[]
}>()
</script>
<template>

  <div v-for="component in props.contentComponent" :key="component.id">
    <div v-if="component.type === 'faq-teaser' || component.type === 'accordion'">
      <Collapsible :content="component.content as CollapsibleContent[]"/>
    </div>
    <div v-if="component.type ==='lead'">
      {{ component }}
      <!--      {{handleRichtext(component.content.text)}}-->
    </div>
    <div v-if="component.type ==='title'">
      {{ component }}
      <!--      {{handleRichtext(component.content.title)}}-->
    </div>
    <div v-if="component.type ==='image'">
      <ImageBlock :image="component.content"/>
    </div>
    <div v-if="component.type ==='p'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'p', identifier: '', id: component.id, content: { text: component.content as string } }])">
      </div>

    </div>
  </div>
</template>