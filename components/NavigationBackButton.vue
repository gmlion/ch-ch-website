<script lang="ts" setup>
import {
  activeNavItem,
  removeFirstLevelItem,
} from "~/generate/store/menuStore";

const click = () => {
  const rightLayout = document.querySelector(".right-layout");
  removeFirstLevelItem();
  rightLayout?.classList.remove("layout-blue");
  activeNavItem.set(null);
};
</script>

<template>
  <button class="flex items-center group" @click="click">
    <svg-icon
      name="keyboard-arrow-left"
      class="w-6 h-6 text-primary-white group-hover:text-primary-yellow"
      aria-hidden="true"
    />
    <div
      class="ml-4 text-lg text-bold text-primary-white group-hover:text-primary-yellow"
    >
      {{ $t("back") }}
    </div>
  </button>
</template>
