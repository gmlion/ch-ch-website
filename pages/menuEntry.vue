<script setup lang="ts">
// TODO: Create store that gets the id of the current url element and set it to a store
// TODO: Create Breadcrumb which gets one step back in the menu
</script>

<template>
  <colored-layout
    class="color-index"
    left-color="white"
    right-color="layout-blue"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <main-navigation id="navigation" start-item-id="F9yt8EwUiCq2" />
      <BackToOverviewLink />
    </template>

    <template #main>
      <sub-navigation-desktop />
    </template>
  </colored-layout>
</template>
