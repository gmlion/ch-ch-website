<script lang="ts" setup>
import type {CollapsibleContent, ContentComponent, YoutubeContent} from "~/core/types/contentComponentsTypes";
import Collapsible from "~/components/Collapsible/Collapsible.vue";
import type {Image} from "~/components/HomeCarousel/types/types";

const props = defineProps<{
  contentComponent: ContentComponent[]
}>()
</script>

<template>
  <div v-for="component in props.contentComponent" :key="component.id">
    <div v-if="component.type ==='lead'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'p', identifier: '', id: component.id, content: { text: component.content as string } }])">
      </div>
    </div>
    <div v-if="component.type ==='title'">
      <div class="richtext" v-html="handleRichtext([{ component: 'h2', identifier: '', id: component.id, content: { text: component.content as string } }])"></div>
    </div>
    <div v-if="component.type ==='image'">
      <ImageBlock :image="component.content as Image" :has-light-box="true"/>
    </div>
    <div v-if="component.type ==='youtube'">
      <Youtube :youtube="component.content as YoutubeContent"/>
    </div>
    <div v-if="component.type ==='collapsible'">
      <Collapsible :content="component.content as CollapsibleContent[]"/>
    </div>
    <div v-if="component.type ==='p'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'p', identifier: '', id: component.id, content: { text: component.content as string } }])">
      </div>
    </div>
    <div v-else >
        <p>{{`Component ${component.type} not implemented yet`}}</p>
    </div>
  </div>
</template>