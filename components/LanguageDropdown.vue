<template>
  <div>
    <Listbox v-model="selectedLanguage">
      <div class="relative mt-1">
        <ListboxButton
            id="language-dropdown-button"
            class="relative w-fit cursor-pointer rounded-sm py-2 pl-3 pr-8 text-left focus:outline-none focus-visible:border-b-primary-blue focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
        >
          <span class="block truncate text-primary-blue">{{ locale.toUpperCase() }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center icon-element">
            <svg-icon
                class="w-4 h-4 text-primary-blue"
                name="caret-small-down"
                :class="{'rotate-180': isOpen}"
                :title="$t('languagePickerIconTitle')"
            />
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white text-base ring-1 ring-primary-blue focus:outline-none z-30 bg-primary-white"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="language in locales"
                :key="language.code"
                :value="language.code"
                as="template"
            >
              <li
                  :class="[
                  active ? 'bg-primary-blue text-primary-white' : 'text-primary-blue',
                  'relative cursor-pointer select-none p-2',
                ]"
              >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'truncate block text-center',
                  ]"
                >{{ language.code.toUpperCase() }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

const { locale, locales } = useI18n()
const selectedLanguage = ref(locale.value)
const isOpen = ref(false)

watch(selectedLanguage, (newLocale) => {
  const oldUrl = new URL(window.location.href)
  const path = oldUrl.pathname.split('/').slice(2).join('/')
  const url = new URL(window.location.href)
  url.pathname = `/${newLocale}/${path}`

  window.location = url.toString()
})

function toggleOpenState(state) {
  isOpen.value = state
}
</script>

<style scoped>

.icon-element {
  transition: transform 0.2s;
  transform-origin: center;
}
[data-headlessui-state="open"] > .icon-element {
  transform: rotate(180deg);
}
</style>