<script setup lang="ts">
import { createUrlTarget } from "./utils/utils";
import { activeNavItem, setPaths } from "~/generate/store/menuStore";
import type { MenuItem } from "~/generate/types/menu";
import { hideCarousel } from "~/store/pageState";
import { useStore } from "@nanostores/vue";

const URITYPE = "uri";
const route = useRoute();
const props = defineProps<{
  entry: MenuItem;
  mode?: string;
  firstLevel?: boolean;
}>();
const activeMenuItem = useStore(activeNavItem);

const isLink = props.entry.children.length === 0;
const href = `${route.path.slice(0)}${props.entry.route}`;
const target = createUrlTarget(props.entry.type, URITYPE, props.entry.target!);

const navigateToMenuNode = (navigationEntry: MenuItem) => {
  hideCarouselHome();
  setPaths(navigationEntry, props.firstLevel);
  setActiveMenuItem(navigationEntry);
};

const setActiveMenuItem = (navigationEntry: MenuItem) => {
  if (props.firstLevel && navigationEntry.children.length > 0) {
    activeNavItem.set(navigationEntry.label);
  } else {
    activeNavItem.set(null);
  }
};

const hideCarouselHome = () => {
  hideCarousel.set(true);
};
</script>

<template>
  <NuxtLink
    v-if="isLink"
    :href="href"
    class="leading-tight no-underline text-inherit text-navigation-fluid"
    :target="target"
    :class="[
      props.mode === 'main'
        ? 'font-semibold text-navigation'
        : 'text-navigation',
      isLink ? 'text-inherit' : '',
      activeMenuItem === entry.label ? 'text-tertiary-yellow' : '',
      props.firstLevel ? 'c' : '',
    ]"
  >
    {{ entry.label }}
  </NuxtLink>
  <a
    v-else
    href="#"
    class="leading-tight no-underline text-inherit menu-item"
    @click.prevent="navigateToMenuNode(entry)"
    :class="[
      props.mode === 'main'
        ? 'font-semibold text-navigation'
        : 'text-navigation',
      activeMenuItem === entry.label ? 'text-tertiary-yellow' : '',
    ]"
  >
    {{ entry.label }}
  </a>
</template>
