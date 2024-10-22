<script setup lang="ts">
import Simplebar from "simplebar-vue";
import "../../../node_modules/simplebar-vue/dist/simplebar.min.css";
import { useI18n } from "vue-i18n";
import { getMainMenuItems } from "~/generate/store/menuStore";
import { useRouter } from 'vue-router'; // Ensure you import useRouter
import type { MenuItem } from "~/generate/types/menuTypes";

const props = defineProps<{
  startItemId?: string;
  isElection?: boolean;
}>();

const { data: linkItems } = await useAsyncData(async () => {
  const { locale } = useI18n();
  const router = useRouter().getRoutes();
  const linkItems = await getMainMenuItems(locale.value, props.startItemId, props.isElection);

  // since we have nuxt dependencies which can't get accessed during SSG, we can't set the route on the menuStore.ts file and have to do it here.
  const setRoutes = (items: MenuItem[]) => {
    items.forEach((item) => {
      const route = router.find(
        (route) => route.meta.id === item.id || route.meta.id === item.documentId
      );

      item.route = route?.path;

      if (item.children && item.children.length > 0) {
        setRoutes(item.children);
      }
    });
  };

  setRoutes(linkItems);

  return linkItems;
});
</script>


<template>
  <div class="relative h-full overflow-auto">
    <simplebar class="relative h-full" data-simplebar-auto-hide="false">
      <nav class="flex-1 overflow-y-auto lg:px-11" role="navigation" :aria-label="$t('navAriaDesktop')">
        <ul class="pb-12">
          <li v-for="item in linkItems" :key="item.label"
            class="lg:mt-4 text-primary-blue lg:hover:text-tertiary-yellow first:mt-0 w-full border-gray-600-translucent border-b lg:border-none lg:w-[fit-content] py-2.5 lg:py-0">
            <navigation-link :entry="item" mode="main" :first-level="true" />
          </li>
        </ul>
      </nav>
    </simplebar>
  </div>
</template>

<style lang="scss">
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