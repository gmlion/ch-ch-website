<script setup>
import getData from "../generate/slugLogic";
const route = useRoute();
console.log(route.fullPath);

const data = ref(null);

useAsyncData(async () => {
  // Example of using params and query from the context object
  const context = useNuxtApp();

  const response = await getData(context);

  const result = await response.json();
  return { data: result };
});
</script>
<template>Page {{ JSON.stringify(data) }}</template>
