<script setup lang="ts">
import { createUrlTarget } from "./utils/utils";
import { activeNavItem, setPaths } from "~/generate/store/menuStore";
import type { MenuItem } from "~/generate/types/menuTypes";
import { useStore } from "@nanostores/vue";
import { ref } from "vue";
import { useMediaQuery } from '@vueuse/core'; // Import from vueuse
const URITYPE = "uri";
const props = defineProps<{
  entry: MenuItem;
  mode?: string;
  firstLevel?: boolean;
}>();

const activeMenuItem = useStore(activeNavItem);
const openMenuLabel = ref<string | null>(null);

const isMobile = useMediaQuery('(max-width: 768px)');

const isLink = props.entry.children.length === 0;
const target = createUrlTarget(props.entry.type, URITYPE, props.entry.target!);

const navigateToMenuNode = (navigationEntry: MenuItem) => {
  if (isMobile.value) {
    if (openMenuLabel.value === navigationEntry.label) {
      openMenuLabel.value = null;
      activeNavItem.set(null);
    } else {
      openMenuLabel.value = navigationEntry.label;
      activeNavItem.set(navigationEntry.label);
    }
  } else {
    setPaths(navigationEntry, props.firstLevel);
    activeNavItem.set(navigationEntry.label);
    openMenuLabel.value = null;
  }
};

const isActive = (entry: MenuItem): boolean => {
  if (entry.label === activeMenuItem.value) return true;
  return entry.children.some(isActive);
};

const isOpen = (entry: MenuItem): boolean => {
  return openMenuLabel.value === entry.label;
};
</script>

<template>
  <a
    v-if="isLink"
    :href="props.entry.route"
    class="leading-tight no-underline text-inherit text-navigation-fluid"
    :target="target"
    :class="[
      props.mode === 'main' ? 'text-navigation font-bold text-blue-500' : 'text-navigation',
      isLink ? 'text-inherit' : '',
      isActive(props.entry) ? 'font-bold text-blue-500' : '',
    ]"
  >
    {{ entry.label }}
  </a>

  <div v-else>
    <button
      class="leading-tight no-underline text-inherit menu-item w-full flex justify-between items-center"
      @click.prevent="navigateToMenuNode(entry)"
      :class="[
        props.mode === 'main' ? 'font-semibold text-navigation' : 'text-navigation',
        isActive(props.entry) ? 'active-element font-bold text-blue-500' : '',
      ]"
    >
      {{ entry.label }}
      <span v-if="props.entry.children.length > 0" class="ml-2 transition-transform duration-300 lg:hidden" :class="{'rotate-90': isOpen(props.entry)}">
        <svg-icon name="arrow-right" class="w-4 h-4 transform" />
      </span>
    </button>

    <!-- Submenu section, only visible on mobile and when submenu is open -->
    <div v-if="isOpen(props.entry) && isMobile" class="lg:hidden">
      <ul class="ml-4">
        <li v-for="child in entry.children" :key="child.label" class="border-b border-b-gray-900 py-2.5 navigation-subnav-mobile last-of-type:border-none">
          <navigation-link :entry="child" mode="sub" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-subnav-mobile {
  a, button {
    font-size: 20px;
    @apply font-normal;
    &.active-element {
      @apply font-bold;
    }
  }
}
</style>