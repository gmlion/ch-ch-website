<script lang="ts" setup>
import type { CarouselItem } from "./types/types";

const props = defineProps<{
  carouselContent: CarouselItem;
}>();
</script>

<template>
  <div>
    <h1>{{ props.carouselContent }}</h1>
  </div>
</template>
