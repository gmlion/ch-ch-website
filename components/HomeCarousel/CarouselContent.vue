<script lang="ts" setup>
import type { CarouselItem } from "./types/types";

const props = defineProps<{
  carouselContent: CarouselItem;
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-if="props.carouselContent.image"
      class="flex-shrink-0 flex items-center justify-center w-full"
    >
      <ImageBlock
        :image="props.carouselContent.image"
        classes="m-auto max-h-[20vh] "
      />
    </div>
    <div v-if="props.carouselContent.title">
      <h2 class="text-navigation-fluid carousel-title text-left">
        {{ props.carouselContent.title }}
      </h2>
    </div>
    <div v-if="props.carouselContent.text">
      <p class="text-left" v-html="props.carouselContent.text"></p>
    </div>
  </div>
</template>
