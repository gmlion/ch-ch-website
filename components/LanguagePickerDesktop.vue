<template>
  <nav id="language" :aria-label="$t('navAriaLanguagePickerDesktop')">
    <ul class="flex space-x-4">
      <li v-for="locale in availableLocales" :key="locale.code">
        <button
          class="uppercase font-regular"
          :class="{
            'font-bold': $i18n.locale == locale.code,
            'text-gray-600 cursor-not-allowed': isNotAvailable(locale.code),
          }"
          @click.prevent.stop="changeLocale(locale.code)"
        >
          {{ locale.code }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import LanguagePickerMixin from '@/components/LanguagePickerMixin.vue'

export default {
  mixins: [LanguagePickerMixin],
}
</script>
