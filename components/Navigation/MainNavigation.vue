<script setup lang="ts">
import Simplebar from "simplebar-vue";
import "../../../node_modules/simplebar-vue/dist/simplebar.min.css";
import { useI18n } from "vue-i18n";
import { getMainMenuItems } from "~/generate/store/menuStore";
const props = defineProps<{
  startItemId?: string;
}>();

const { data: linkItems } = await useAsyncData(async () => {
  const { locale } = useI18n();

  return await getMainMenuItems(locale.value, props.startItemId);
});
</script>

<template>
  <div class="relative h-full overflow-auto">
    <simplebar class="relative h-full" data-simplebar-auto-hide="false">
      <nav
        class="flex-1 overflow-y-auto px-11 lg:px-0"
        role="navigation"
        :aria-label="$t('navAriaDesktop')"
      >
        <ul class="pb-12">
          <li
            v-for="item in linkItems"
            :key="item.label"
            class="mt-4 text-primary-blue hover:text-tertiary-yellow first:mt-0 w-[fit-content]"
          >
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