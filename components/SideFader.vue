<template>
  <div
    :class="staticClass"
    class="pointer-events-none absolute h-20 bg-gradient-to-t from-primary-white"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const staticClass = ref("your-static-class");

    return {
      staticClass,
    };
  },
});
</script>
