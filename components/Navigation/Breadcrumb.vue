<script lang="ts" setup>
import type { Breadcrumb } from "~/generate/types/menu";
const { locale } = useI18n();

const props = defineProps<{
  breadcrumb: Breadcrumb[];
  visibleElements: number;
}>();
</script>

<template>
  <ul class="flex gap-4 text-lg mb-6 flex-wrap">
    <li>
      <NuxtLink
        class="nav-breadcrumb font-semibold no-underline text-tertiary-yellow hover:text-secondary-yellow"
        :href="'/' + locale"
        >{{ $t("allTopics") }}</NuxtLink
      >
    </li>
    <li
      v-for="(item, index) in breadcrumb"
      :key="item.id"
      class="flex gap-4 items-center"
    >
      <svg-icon
        name="arrow-right"
        class="w-4 h-4 text-inherit text-tertiary-yellow"
        aria-hidden="true"
      />
      <NuxtLink
        v-if="index < breadcrumb.length - 1"
        class="nav-breadcrumb font-semibold no-underline text-tertiary-yellow hover:text-secondary-yellow"
        :href="'/' + locale + '/' + item.route.slice(1)"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-gray-600">{{ item.label }}</span>
    </li>
  </ul>
</template>
