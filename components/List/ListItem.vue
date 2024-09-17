<script setup lang="ts">

const props = defineProps<{
  listItem: string
}>()
</script>

<template>
  <li class="relative  pl-9 before:bg-[rgba(1,46,90,var(--tw-bg-opacity))] before:absolute before:left-0 before:top-[13px] before:h-[2px] before:w-[18px] before:content-[''] before:tw-bg-opacity-100 text-lg">
    <p>{{ props.listItem }}</p>
  </li>
</template>