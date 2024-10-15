<script setup lang="ts">
const props = defineProps<{
  src: string;
  classes?: string;
  altText: string;
  caption?: string;
  width?: number;
  height?: number;
  text?: string;
  alignment?: "left" | "right";
}>();
</script>

<template>
  <div :class="props.alignment ? 'grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6': ''">
    <div v-if="props.text" :class="[props.alignment === 'right' ? 'order-1' : '' ]">
      <div class="richtext">
        <p v-html="props.text"></p>
      </div>
    </div>
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
          class="max-w-full text-left mt-5"
          v-html="caption"
      ></figcaption>
    </figure>
  </div>
</template>