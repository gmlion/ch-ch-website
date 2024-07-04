<template>
  <div class="flex items-center font-semibold whitespace-nowrap">
    <a
      v-if="href"
      :href="href"
      :class="linkCss"
      class="font-semibold no-underline"
      itemprop="item"
    >
      <span itemprop="name">{{ label }}</span>
    </a>
    <div
      v-else
      :class="{
        'text-gray-300': mode === 'blue',
        'text-gray-600': mode === 'white',
      }"
    >
      <span itemprop="name">{{ label }}</span>
    </div>
    <div v-if="!isLeaf">
      <svg-icon
        name="arrow-right"
        class="w-4 h-4 ml-4 mr-4 text-inherit"
        :class="iconCss"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    href: {
      required: false,
      type: String,
      default: null,
    },
    isLeaf: {
      required: false,
      default: false,
      type: Boolean,
    },
    mode: {
      required: false,
      validator: (value) => ['blue', 'white', 'search'].includes(value),
      default: 'blue',
    },
  },
  computed: {
    linkCss() {
      if (this.mode === 'blue') {
        return ['text-secondary-yellow', 'hover:text-tertiary-yellow']
      } else if (this.mode === 'search') {
        return ['text-gray-600 hover:text-secondary-yellow']
      } else {
        return ['text-tertiary-yellow', 'hover:text-secondary-yellow']
      }
    },
    iconCss() {
      if (this.isLeaf) {
        if (this.mode === 'blue') {
          return ['text-gray-300']
        } else {
          return ['text-gray-600']
        }
      }

      if (this.mode === 'blue') {
        return ['text-secondary-yellow']
      } else {
        return ['text-tertiary-yellow']
      }
    },
  },
}
</script>
