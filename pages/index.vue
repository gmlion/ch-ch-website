<script setup lang="ts">
const showGallery = ref(false);

// To do: Metadata and Carousel
</script>

<template>
  <colored-layout
    class="color-index"
    left-color="white"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <div role="complementary" class="sr-only">
        <h1>{{ $t("homeTitle") }}</h1>
      </div>
      <main-navigation id="navigation" />
    </template>
    <template v-if="!showGallery" #main>
      <sub-navigation-desktop />
    </template>
  </colored-layout>
</template>
