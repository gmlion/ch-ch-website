<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const route = useRoute();
const { locale, locales } = useI18n();

const routeLocale = route.path.split("/")[1];
const electionYear = useRuntimeConfig().public.electionYear
locales.value.forEach((localeVal) => {
  switch (true) {
    case routeLocale === localeVal.code:
      locale.value = localeVal.code;
      break;
    case route.path.includes(`elections${electionYear}`):
      locale.value = "en";
      break;
    case route.path.includes(`wahlen${electionYear}`):
      locale.value = "de";
      break;
    case route.path.includes(`elezioni${electionYear}`):
      locale.value = "it";
      break;
    case route.path.includes(`elecziuns${electionYear}`):
      locale.value = "rm";
      break;
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>