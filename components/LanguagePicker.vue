<script lang="ts" setup>

import LanguageDropdown from "~/components/LanguageDropdown.vue";
import {languageHelper} from "~/utils/languageHelper";
import {useRoute} from "#vue-router";

const route = useRoute();
const currentUrl = route.path
const pageId: string | undefined = route.meta.groupId?.id as string | undefined;
const languageUrlMap = languageHelper(pageId, currentUrl);
</script>
<template>
  <nav id="language" :aria-label="$t('navAriaLanguagePickerDesktop')"
       class="absolute top-4 right-4 lg:static flex items-center">
    <ul class="lg:flex space-x-4 hidden ">
      <li>
        <a
            class="uppercase font-regular"
            :class="{
            'font-bold': route.path === languageUrlMap.de,
            'text-gray-600 cursor-not-allowed': languageUrlMap.de === undefined,
          }"
            :href="languageUrlMap.de"
        >
          DE
        </a>
      </li>
      <li>
        <a
            class="uppercase font-regular"
            :class="{
            'font-bold': route.path === languageUrlMap.fr,
            'text-gray-600 cursor-not-allowed': languageUrlMap.fr === undefined,
          }"
            :href="languageUrlMap.fr"
        >
          FR
        </a>
      </li>
      <li>
        <a
            class="uppercase font-regular"
            :class="{
            'font-bold': route.path === languageUrlMap.it,
            'text-gray-600 cursor-not-allowed': languageUrlMap.it === undefined,
          }"
            :href="languageUrlMap.it"
        >
          IT
        </a>
      </li>
      <li>
        <a
            class="uppercase font-regular"
            :class="{
            'font-bold': route.path === languageUrlMap.rm,
            'text-gray-600 cursor-not-allowed': languageUrlMap.rm === undefined,
          }"
            :href="languageUrlMap.rm"
        >
          RM
        </a>
      </li>
      <li>
        <a
            class="uppercase font-regular"
            :class="{
            'font-bold': route.path === languageUrlMap.en,
            'text-gray-600 cursor-not-allowed': languageUrlMap.en === undefined,
          }"
            :href="languageUrlMap.en"
        >
          EN
        </a>
      </li>

    </ul>
    <div class="lg:hidden">
      <LanguageDropdown />
    </div>
  </nav>
</template>