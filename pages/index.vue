<script setup>
const showGallery = ref(false);
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
      <main-navigation id="navigation" @navigateToMenuNode="navigateMain()" />
    </template>
    <template v-if="!showGallery">
      <sub-navigation-desktop #main />
    </template>
  </colored-layout>
</template>
