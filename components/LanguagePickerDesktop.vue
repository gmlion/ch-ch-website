<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import LanguageDropdown from "~/components/LanguageDropdown.vue";

const {locale, locales} = useI18n();


</script>
<template>
  <nav id="language" :aria-label="$t('navAriaLanguagePickerDesktop')"
       class="absolute top-4 right-4 lg:static flex items-center">
    <ul class="lg:flex space-x-4 hidden ">
      <li v-for="localeEl in locales">
        <button
            class="uppercase font-regular"
            :class="{
            'font-bold': locale === localeEl.code,
            'text-gray-600 cursor-not-allowed': isNotAvailable(localeEl.code),
          }"
            @click.prevent.stop="changeLocale(localeEl.code, locale, $route)"
        >
          {{ localeEl.code }}
        </button>
      </li>
    </ul>
    <div class="lg:hidden">
      <LanguageDropdown />
    </div>
  </nav>
</template>