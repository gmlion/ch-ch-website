<script setup lang="ts">
import type {InfoBox} from "~/core/types/publications";

const props = defineProps<InfoBox>()
</script>

<template>
  <div class="px-6 pt-6 border-2 border-secondary-yellow mt-8" data-v-eec3be88="">
    <p
      class="mb-8 text-xl font-semibold leading-6">{{$t("goodToKnow")}}</p>
    <p tabindex="0" class="mb-8 not-italic">
      {{props.content.content.text}}
    </p></div>
</template>

<style scoped lang="postcss">

</style>