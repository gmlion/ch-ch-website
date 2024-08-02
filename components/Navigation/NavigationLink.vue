<script setup lang="ts">
import { createUrlTarget } from "./utils/utils";
import { setPaths } from "~/generate/store/menuStore";
import type { MenuItem } from "~/generate/types/menu";

const URITYPE = "uri";

const props = defineProps<{
  entry: MenuItem;
  mode?: string;
  firstLevel?: boolean;
}>();

const isLink = props.entry.children.length === 0;

const target = createUrlTarget(props.entry.type, URITYPE, props.entry.target!);
const navigateToMenuNode = (navigationEntry: MenuItem) => {
  setPaths(navigationEntry, props.firstLevel);
};
</script>

<template>
  <a
    v-if="isLink"
    :href="entry.route"
    class="leading-tight no-underline text-inherit"
    :target="target"
    :class="
      (props.mode === 'main'
        ? 'font-semibold text-navigation'
        : 'text-navigation') + (isLink ? ' text-inherit' : '')
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
        ? 'font-semibold text-navigation'
        : 'text-navigation') + (isLink ? ' text-inherit' : '')
    "
  >
    {{ entry.label }}
  </a>
</template>
