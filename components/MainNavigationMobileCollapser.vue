<template>
  <div class="flex absolute bg-primary-white justify-center">
    <button
      class="text-primary-red"
      :aria-label="$t('mobileNavCollapser')"
      @click="$emit('click')"
    >
      <svg-icon aria-hidden="true" :name="iconName" class="w-8 h-8" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainNavigationMobileCollapser',
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    iconName() {
      if (this.isCollapsed) {
        return 'arrow-down'
      }
      return 'arrow-up'
    },
  },
}
</script>
