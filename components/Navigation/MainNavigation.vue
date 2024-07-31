<script setup lang="ts">
import Simplebar from "simplebar-vue";
import { useIndexMenu } from "~/generate/store/menuStore";
import { useUsedPublications } from "~/generate/store/publicationStore";
import { useAsyncData } from "#app";
import { useI18n } from "vue-i18n";
import type { MenuNode } from "~/generate/types/routing";
import { createRoute } from "./utils/utils";

const { locale } = useI18n();

const { data: menuData } = await useAsyncData("menuData", async () => {
  return await useIndexMenu(locale.value);
});

const { data: linkItems } = await useAsyncData("linkItems", async () => {
  const navLinkItems: { entry: MenuNode; route: string | undefined }[] = [];
  if (menuData.value?.menu) {
    const usedPublications = await useUsedPublications(menuData.value.menu);
    menuData.value?.menu.nodes.forEach((entry) => {
      let item = {
        entry: entry,
        route: createRoute(entry, usedPublications, "main"),
      };
      navLinkItems.push(item);
    });
  }
  return navLinkItems;
});
</script>

<template>
  <div class="relative h-full overflow-auto">
    <simplebar class="relative h-full" data-simplebar-auto-hide="false">
      <nav
        class="flex-1 overflow-y-auto px-11"
        role="navigation"
        :aria-label="$t('navAriaDesktop')"
      >
        <ul class="pb-12">
          <li
            v-for="item in linkItems"
            :key="item.entry.label"
            class="mt-4 text-primary-blue first:mt-0"
          >
            <navigation-link
              :entry="item.entry"
              :route="item.route!"
              mode="main"
            />
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
