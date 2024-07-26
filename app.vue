<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>

</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())

</script>