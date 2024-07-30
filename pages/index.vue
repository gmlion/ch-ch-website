<script setup>
const { locale } = useI18n();
import { useIndexMenu } from "~/generate/store/menuStore";

const indexPageData = useAsyncData("indexPageDataStore", async () => {
  const data = await useIndexMenu(locale.value);

  return data;
});
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
      <main-navigation id="navigation" @navigateTo="navigateMain" />
    </template>
    <template #main>
      {{ $t("homeTitle") + "HOOOOME" }}
    </template>
  </colored-layout>
</template>
