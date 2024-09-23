<script setup lang="ts">
import type {ContentComponent} from "~/core/types/contentComponentsTypes";

const props = defineProps<{ contentComponent: ContentComponent[] }>()
</script>

<template>
  {{ props.contentComponent }}

  <ContentComponents :content-component="props.contentComponent"/>
</template>

<style scoped lang="postcss">

</style>