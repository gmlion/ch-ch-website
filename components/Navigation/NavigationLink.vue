<script setup lang="ts">
import { createUrlTarget } from "./utils/utils";
import type { MenuNode } from "~/generate/types/routing";
import { startPath } from "~/generate/store/menuStore";

const URITYPE = "uri";

const props = defineProps<{
  entry: MenuNode;
  mode?: string;
  route: string;
}>();

const isLink = props.entry.nodes.length === 0;

const target = createUrlTarget(props.entry.type, URITYPE, props.entry.target!);
const navigateToMenuNode = (navigationEntry: MenuNode) => {
  startPath(navigationEntry);
  console.log("navigateToMenuNode", navigationEntry);
};
</script>

<template>
  <a
    v-if="isLink"
    :href="route"
    class="leading-tight no-underline text-inherit"
    :target="target"
    :class="
      (props.mode === 'main'
        ? 'font-semibold text-navigation-fluid'
        : 'lg:text-navigation-fluid') + (isLink ? ' text-inherit' : '')
    "
  >
    {{ entry.label }}
  </a>
  <a
    v-else
    href="#"
    class="leading-tight no-underline text-inherit"
    @click.prevent="navigateToMenuNode(entry)"
    :class="
      (props.mode === 'main'
        ? 'font-semibold text-navigation-fluid'
        : 'lg:text-navigation-fluid') + (isLink ? ' text-inherit' : '')
    "
  >
    {{ entry.label }}
  </a>
</template>
