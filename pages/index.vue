<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const currentLocale = route.path.split("/")[1];
</script>

<template>
  Index {{ route.fullPath }} from Locale {{ $t("homeTitle") }}
</template>
