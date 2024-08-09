<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { currentPaths } from "~/generate/store/menuStore";
import type { MenuItem } from "~/generate/types/menu";

const currentPathsStore = useStore(currentPaths);

onMounted(() => {
  const rightLayout = document.querySelector(".right-layout");

  if (rightLayout) {
    rightLayout.classList.remove("layout-yellow");
    rightLayout.classList.add("layout-blue");
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 lg:gap-4 h-full pb-12">
    <div
      v-if="currentPathsStore.length > 1"
      class="text-lg font-semibold text-primary-yellow"
    >
      {{ currentPathsStore[1].label }}
    </div>
    <div class="flex flex-col justify-center">
      <ul class="flex flex-wrap mt-5">
        <li
          v-if="currentPathsStore.length && currentPathsStore[0].children"
          v-for="item in currentPathsStore[0].children"
          :key="item?.label"
          class="mt-4 mr-10 last:mr-0"
        >
          <navigation-link :entry="item as MenuItem" mode="sub" />
        </li>
      </ul>
    </div>
    <div v-if="currentPathsStore.length > 1">
      <navigation-back-button class="mt-8 hover:text-primary-yellow" />
    </div>
  </div>
</template>
