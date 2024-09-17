<script lang="ts" setup>
import type {
  CollapsibleContent,
  ContentComponent,
  TitleLead,
  YoutubeContent
} from "~/core/types/contentComponentsTypes";
import Collapsible from "~/components/Collapsible/Collapsible.vue";
import type {Image} from "~/components/HomeCarousel/types/types";
import List from "~/components/List/List.vue";

const props = defineProps<{
  contentComponent: ContentComponent[]
}>()
</script>

<template>
  <div v-for="component in props.contentComponent" :key="component.id">
    <div v-if="component.type === 'titleLead'">
      <TitleLead :titleLead="component.content as TitleLead"/>
    </div>
    <div v-if="component.type ==='image'">
      <ImageBlock :image="component.content as Image" :has-light-box="true" :text="component.content.text"/>
    </div>
    <div v-if="component.type ==='youtube'">
      <Youtube :youtube="component.content as YoutubeContent"/>
    </div>
    <div v-if="component.type ==='collapsible'">
      <Collapsible :content="component.content as CollapsibleContent[]"/>
    </div>
    <div v-if="component.type === 'infobox'">
      <InfoBox :title="component.refTitle" :content="component.content as ContentComponent[]"/>
    </div>
    <div v-if="component.type === 'subtitle'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'subtitle', identifier: '', id: component.id, content: { title: component.content as string } }])">
      </div>
    </div>
    <div v-if="component.type === 'faqCollapsible'">
      {{ component.content }}
    </div>
    <div v-if="component.type ==='p'">
      <div class="richtext" v-html="handleRichtext([{ component:
      'p', identifier: '', id: component.id, content: { text: component.content as string } }])">
      </div>
    </div>
    <div v-if="component.type === 'list'">
      <List :list="component.content as TypeList[]"/>
    </div>
  </div>
</template>