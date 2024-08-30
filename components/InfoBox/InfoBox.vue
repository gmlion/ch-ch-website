<script setup lang="ts">
import type {ContentComponent} from "~/core/types/contentComponentsTypes";

const props = defineProps<{
  title?: string;
  content: ContentComponent[]
}>()
</script>

<template>
  <div class="px-6 pt-6 border-2 border-secondary-yellow mt-8" data-v-eec3be88="">
    <p
        class="mb-8 text-xl font-semibold leading-6" v-if="props.title">{{props.title}}</p>
    <ContentComponents :content-component="props.content"/>
  </div>
</template>