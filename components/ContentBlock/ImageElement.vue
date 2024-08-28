<script setup lang="ts">
const props = defineProps<{
  src: string;
  classes?: string;
  altText: string;
  caption?: string
  width?: number;
  height?: number;
}>();

</script>

<template>
  <figure class="flex flex-col">
    <picture>
      <img
          ref="image"
          :class="classes"
          :src="props.src"
          :alt="props.altText"
          :width="props.width"
          :height="props.height"
      />
    </picture>

    <figcaption
        v-if="caption"
        class="max-w-full mt-5"
        v-html="caption"
    ></figcaption>
  </figure>
</template>