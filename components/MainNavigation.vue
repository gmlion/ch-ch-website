<script setup lang="ts">
import Simplebar from "simplebar-vue";
import { useIndexMenu } from "~/generate/store/menuStore";
import { useUsedPublications } from "~/generate/store/publicationStore";
import { useAsyncData } from "#app";
import { useI18n } from "vue-i18n";
//import "simplebar/dist/simplebar.min.css";

const { locale } = useI18n();

const { data: menuData } = await useAsyncData("menuData", async () => {
  return await useIndexMenu(locale.value);
});

const { data: publications } = await useAsyncData(
  "usedPublications",
  async () => {
    if (menuData.value?.menu) {
      return await useUsedPublications(menuData.value.menu);
    }
    return [];
  }
);
</script>

<template>
  <div class="relative h-full overflow-auto">
    <simplebar class="relative h-full" data-simplebar-auto-hide="false">
      {{ publications }}
      <nav
        class="flex-1 overflow-y-auto px-11"
        role="navigation"
        :aria-label="$t('navAriaDesktop')"
      >
        <ul class="pb-12">
          <li
            v-for="entry in menuData?.menu?.nodes"
            :key="entry.label"
            class="mt-4 text-primary-blue first:mt-0"
          >
            {{ entry.label }}
          </li>
        </ul>
      </nav>
    </simplebar>
  </div>
</template>

<style lang="postcss">
.simplebar-scrollbar {
  @apply bg-primary-red;

  &:before {
    @apply bg-primary-red;
  }
}

.simplebar-vertical {
  @apply bg-gray-50;
  width: 8px !important;
}

.simplebar-horizontal {
  @apply hidden;
}
</style>
