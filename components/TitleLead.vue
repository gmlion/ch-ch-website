<script setup lang="ts">
import type {TitleLead} from "~/core/types/contentComponentsTypes";

const props = defineProps<{ titleLead: TitleLead }>();
</script>

<template>
  <h1 class="title-element text-3xl-fluid" v-if="titleLead.title">{{ titleLead.title }}</h1>
  <p class="text-xl-fluid mt-8" v-if="titleLead.lead">{{ titleLead.lead }}</p>
</template>