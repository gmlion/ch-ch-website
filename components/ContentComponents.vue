<script lang="ts" setup>
import type {CollapsibleContent, ContentComponent} from "~/core/types/contentComponents";
import Collapsible from "~/components/Collapsible/Collapsible.vue";

const props = defineProps<{
  contentComponent: ContentComponent[]
}>()
// merge content of collapsible components
let collapsibleContent: CollapsibleContent[] = [];
collapsibleContent = props.contentComponent.reduce((acc: CollapsibleContent[], component) => {
  if ( component.type === 'accordion' || component.type === 'faq-teaser') {
    return acc.concat(component.content as CollapsibleContent[]);
  }
  return acc;
}, [] as CollapsibleContent[]);

</script>
<template>
  <div v-if="collapsibleContent.length > 0">
    <Collapsible :content="collapsibleContent as CollapsibleContent[]"/>
  </div>
  <div v-for="component in props.contentComponent" :key="component.id">
    <div v-if="component.type ==='lead'">
      <!--      {{handleRichtext(component.content.text)}}-->
    </div>
    <div v-if="component.type ==='title'">
      <!--      {{handleRichtext(component.content.title)}}-->
    </div>
    <div v-if="component.type ==='image'">
      <ImageBlock :image="component.content" :has-light-box="true"/>
    </div>
    <div v-if="component.type ==='p'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'p', identifier: '', id: component.id, content: { text: component.content as string } }])">
      </div>

    </div>
  </div>
</template>