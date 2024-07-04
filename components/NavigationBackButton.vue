<template>
  <button class="flex items-center" @click="click">
    <svg-icon
      name="keyboard-arrow-left"
      class="w-6 h-6 text-inherit"
      aria-hidden="true"
    />
    <div class="ml-4 text-lg text-bold">{{ $t('back') }}</div>
  </button>
</template>

<script>
export default {
  name: 'NavigationBackButton',
  props: {
    menuIndex: {
      type: Number,
      default: undefined,
    },
  },
  methods: {
    click() {
      this.$store.commit('menu/pop', this.menuIndex)
    },
  },
}
</script>
