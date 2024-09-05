<script setup lang="ts">
const searchValue = ref<string>('');
const route = useRoute();
route.query.q ? searchValue.value = route.query.q as string : searchValue.value = '';
</script>

<template>
  <colored-layout
      class="color-index"
      left-color="layout-yellow"
      footer-color="yellow"
      right-color="layout-white"
      division-mode="fifths"
      :show-fader="false"
      :hide-search="true"
  >
    <template #side>
      <div>
        <h2 class="mb-12 text-3xl lg:text-5xl">{{ $t('search') }}</h2>
        <div class="h-full mb-6">
          <search-input :initial-value="searchValue"/>
        </div>
      </div>
    </template>

    <template #main>
      <div>
        <search-results :search-query="searchValue"/>
      </div>

    </template>
  </colored-layout>
</template>