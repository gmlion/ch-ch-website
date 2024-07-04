<template>
  <nav id="language-mobile" :aria-label="$t('navAriaLanguagePickerMobile')">
    <!-- <vselect -->
    <!-- ref="langPicker"
      class="font-semibold"
      :options="options"
      :clearable="false"
      :searchable="false"
      :value="$i18n.locale"
      :selectable="(option) => !isNotAvailable(option)"
      @input="changeLocale"
    > -->
    <!-- <template #open-indicator="{ attributes }">
      <svg-icon
        class="w-4 h-4"
        v-bind="attributes"
        name="caret-small-down"
        :title="$t('languagePickerIconTitle')"
      />
    </template> -->
    <!-- </vselect> -->
  </nav>
</template>

<script>
import LanguagePickerMixin from "@/components/LanguagePickerMixin.vue";
// import "vue-select-3/dist/vue-select-3.css";
// import vSelect from "vue-select-3";

export default {
  components: {
    // vSelect,
  },
  mixins: [LanguagePickerMixin],
  computed: {
    options() {
      return this.availableLocales.map((locale) => locale.code);
    },
  },
  mounted() {
    this.setComboBoxAriaLabel();
  },
  methods: {
    setComboBoxAriaLabel() {
      const comboBoxElement =
        this.$refs.langPicker.$el.querySelector("div:first-child");
      comboBoxElement.setAttribute("aria-label", this.$t("comboboxLabel"));

      const ulElement =
        this.$refs.langPicker.$el.querySelector("ul:last-child");
      ulElement.setAttribute("aria-hidden", "true");
      ulElement.setAttribute("aria-label", this.$t("comboboxLabel"));
    },
  },
};
</script>
<style lang="postcss" scoped>
:deep(.vs__dropdown-toggle) {
  @apply border-0;
}

:deep(.vs__search) {
  /* display none is not possible because it will produce a bug in the library which leads to a non closable dropdown */
  @apply h-0 w-0 m-0 p-0;
}

:deep(.vs--single.vs--open .vs__selected) {
  position: static;
  @apply opacity-100;
}

:deep(.vs__selected) {
  @apply uppercase;
  color: inherit;
}

:deep(.vs__open-indicator) {
  @apply fill-current;
}

:deep(.vs__dropdown-option:hover),
:deep(.vs__dropdown-option--selected) {
  @apply bg-primary-blue text-primary-white !important;
}

:deep(.vs__dropdown-option--disabled) {
  @apply text-gray-300 !important;
}

:deep(.vs__dropdown-menu) {
  @apply w-16 pt-0 pb-0;
  @apply border-gray-900 border border-solid rounded;
  @apply uppercase;
  @apply text-primary-blue;
  min-width: unset;
  z-index: 9999;

  & li {
    color: inherit;
  }
}
</style>
