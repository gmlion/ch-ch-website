<script setup lang="ts">
import { useFooterMenuStore } from "~/generate/store/footerMenuStore";
import type { Menu } from "../generate/types/routing";

console.log("menuentry");

const nuxtApp = useNuxtApp();
const menu = ref<Menu | null>(null);

// Initial value from SSR context if available

// Fetching data on client-side after mount
onMounted(async () => {
  menu.value = await useFooterMenuStore();
});
</script>

<template>
  <div>Menu Entry: {{ JSON.stringify(menu) }}</div>
</template>

<style scoped lang="postcss"></style>
