<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
provideHeadlessUseId(() => useId());

const route = useRoute();
const { locale, locales } = useI18n();

const routeLocale = route.path.split("/")[1];

locales.value.forEach((localeVal) => {
  switch (true) {
    case routeLocale === localeVal.code:
      locale.value = localeVal.code;
      break;
    case route.path.includes("elections2023"):
      locale.value = "en";
      break;
    case route.path.includes("wahlen2023"):
      locale.value = "de";
      break;
    case route.path.includes("elezioni2023"):
      locale.value = "it";
      break;
    case route.path.includes("elecziuns2023"):
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
