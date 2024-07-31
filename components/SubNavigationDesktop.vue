<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { currentPath, setMenuPush } from "~/generate/store/menuStore";
import type { MenuNode } from "~/generate/types/routing";

const props = defineProps<{
  skipPathCount: {
    required: false;
    default: 0;
    type: Number;
  };
}>();
const route = useRoute();
const currentPathStore = useStore(currentPath);
const leafEntry = currentPathStore.value[currentPathStore.value.length - 1];

const entries = () => {
  if (!leafEntry || !leafEntry.nodes) return [];
  return leafEntry.nodes;
};

const isDeep = () => {
  if (!currentPath.value) return false;
  const depth = 2 + Number(props.skipPathCount);
  // if we're two steps down the path
  return currentPath.value.length >= depth;
};

const parentTopic = () => {
  if (!currentPath.value) return [];

  const len = currentPath.value.length;
  return currentPath.value[len - 1];
};

const navigateToMenu = (entry: MenuNode) => {
  if (entry.nodes.length) {
    setMenuPush(entry, undefined);
  } else {
    // route.push({ path: '/de/detail' })
  }
};
</script>

<template>
  <div
    class="flex flex-col justify-between h-full pb-12"
    :class="{ 'justify-center': !isDeep }"
  >
    <div v-if="isDeep()" class="text-lg font-semibold text-primary-yellow">
      {{ parentTopic().length !== 0 ? parentTopic().label : "" }}
    </div>
    <div class="flex flex-col justify-center">
      <ul class="flex flex-wrap mt-5">
        <li
          v-for="entry in entries()"
          :key="entry.label"
          class="mt-4 mr-10 last:mr-0"
        >
          <navigation-link
            :entry="entry"
            mode="sub"
            @navigateToMenu="navigateToMenu"
          />
        </li>
      </ul>
    </div>
    <navigation-back-button
      v-if="isDeep()"
      class="mt-8 hover:text-primary-yellow"
    />
  </div>
</template>
