<script setup lang="ts">
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel'
import type {ContentGallery} from "~/core/types/publicationsTypes";

const props = defineProps<{
  galleryContent: ContentGallery[]
}>()
</script>

<template>
  <Carousel class="relative w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="(_, index) in 5" :key="index">
        <div class="p-1">
          hello
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious/>
    <CarouselNext/>
  </Carousel>
</template>