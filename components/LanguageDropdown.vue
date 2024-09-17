<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {watch, ref} from "vue";
import {useRoute} from "#vue-router";

const route = useRoute();
const currentUrl = route.path
const pageId: string | undefined = route.meta.groupId?.id as string | undefined;
const languageUrlMap = languageHelper(pageId, currentUrl);
const selectedLanguage = ref("");
const {locale} = useI18n();
watch(selectedLanguage, (newLocale) => {
  const baseUrl = window.location.origin;
  const url = new URL(baseUrl + newLocale);

  window.location = url.href as unknown as Location;
});




const handleLanguageChange = (languageCode: string) => {
  selectedLanguage.value = languageCode;
};


</script>
<template>
  <Select v-model="selectedLanguage" @update:modelValue="handleLanguageChange">
    <SelectTrigger class="w-fit language-select">
      <SelectValue :placeholder="locale.toUpperCase()" />
    </SelectTrigger>
    <SelectValue :placeholder="selectedLanguage" />
    <SelectContent :bodyLock="false" >
      <SelectGroup class="language-select--group">
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            key="de"
            v-if="languageUrlMap.de"
            :value="languageUrlMap.de || ''"
            :class="selectedLanguage === 'de' ? 'bg-primary-blue text-primary-white' : ''"
        >
           DE
        </SelectItem>
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            key="fr"
            v-if="languageUrlMap.fr"
            :value="languageUrlMap.fr || ''"
            :class="selectedLanguage === 'fr' ? 'bg-primary-blue text-primary-white' : ''"
        >
          FR
        </SelectItem>
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            key="it"
            v-if="languageUrlMap.it"
            :value="languageUrlMap.it || ''"
            :class="selectedLanguage === 'it' ? 'bg-primary-blue text-primary-white' : ''"
        >
          IT
        </SelectItem>
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            key="rm"
            v-if="languageUrlMap.rm"
            :value="languageUrlMap.rm || ''"
            :class="selectedLanguage === 'rm' ? 'bg-primary-blue text-primary-white' : ''"
        >
          RM
        </SelectItem>
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            key="en"
            v-if="languageUrlMap.en"
            :value="languageUrlMap.en || ''"
            :class="selectedLanguage === 'en' ? 'bg-primary-blue text-primary-white' : ''"
        >
          EN
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped lang="scss">

</style>