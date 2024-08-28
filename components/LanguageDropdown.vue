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

const {locale, locales} = useI18n();
const selectedLanguage = ref(locale.value);

watch(selectedLanguage, (newLocale) => {
  const oldUrl = new URL(window.location.href);
  const path = oldUrl.pathname.split('/').slice(2).join('/');
  const url = new URL(window.location.href);
  url.pathname = `/${newLocale}/${path}`;

  window.location = url.toString() as unknown as Location;
});

const handleLanguageChange = (languageCode: string) => {
  selectedLanguage.value = languageCode;
};

</script>

<template>
  <Select v-model="selectedLanguage" @update:modelValue="handleLanguageChange">
    <SelectTrigger class="w-fit language-select">
      <SelectValue :placeholder="selectedLanguage.toUpperCase()" />
    </SelectTrigger>
    <SelectContent :bodyLock="false">
      <SelectGroup class="language-select--group">
        <SelectItem
            class="font-semibold bg-language-select--item flex justify-center relative w-fit cursor-pointer py-1 px-4 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:text-primary-white focus-visible:bg-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            v-for="language in locales"
            :key="language.code"
            :value="language.code"
            :class="selectedLanguage === language.code ? 'bg-primary-blue text-primary-white' : ''"
        >
          {{ language.code.toUpperCase() }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped lang="scss">

</style>