<script setup lang="ts">
import { createUrlTarget } from "./utils/utils";
import { setPaths } from "~/generate/store/menuStore";
import type { MenuItem } from "~/generate/types/menu";
import { hideCarousel } from "~/store/pageState";

const URITYPE = "uri";
const route = useRoute();
const props = defineProps<{
  entry: MenuItem;
  mode?: string;
  firstLevel?: boolean;
}>();

const isLink = props.entry.children.length === 0;
const href = route.path + props.entry.route?.slice(1);
const target = createUrlTarget(props.entry.type, URITYPE, props.entry.target!);

const navigateToMenuNode = (navigationEntry: MenuItem) => {
  hideCarouselHome();
  setPaths(navigationEntry, props.firstLevel);
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
    :class="
      (props.mode === 'main'
        ? 'font-semibold text-navigation'
        : 'text-navigation') + (isLink ? ' text-inherit' : '')
    "
  >
    {{ entry.label }}
  </NuxtLink>
  <a
    v-else
    href="#"
    class="leading-tight no-underline text-inherit"
    @click.prevent="navigateToMenuNode(entry)"
    :class="
      (props.mode === 'main'
        ? 'font-semibold text-navigation'
        : 'text-navigation') + (isLink ? ' text-inherit' : '')
    "
  >
    {{ entry.label }}
  </a>
</template>
