<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const currentLocale = route.path.split("/")[1];
</script>

<template>
  <colored-layout
    left-color="white"
    right-color="blue"
    division-mode="halves"
    :is-footer-hidden="true"
    :show-fader="true"
  >
    <template slot="side">
      <div role="complementary" class="sr-only">
        <h1>{{ $t("homeTitle") }}</h1>
      </div>
      <!-- <main-navigation-mobile class="lg:hidden" /> -->
    </template>
    <template v-if="isHome" slot="main">
      {{ $t("homeTitle") + "HOOOOME" }}
    </template>
  </colored-layout>
</template>
