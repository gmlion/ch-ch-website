<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
</script>
<template>
  <a
    class="relative z-30 flex items-center mt-6 font-semibold no-underline all-topic-link text-inherit hover:text-tertiary-yellow"
    :href="`/${locale}`"
  >
    <svg-icon
      name="keyboard-arrow-left"
      class="w-10 h-10 text-inherit"
      :aria-label="$t('allTopicIconTitle')"
    />
    <div class="ml-4 text-lg text-bold">{{ $t("allTopics") }}</div>
  </a>
</template>
