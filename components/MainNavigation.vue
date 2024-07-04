<template>
  <div>
    <main-navigation-desktop
      class="!md:hidden"
      v-bind="$props"
      v-on="$listeners"
    />
    <div class="md:hidden">Mobile Navigation</div>
  </div>
</template>

<script>
import MainNavigationDesktop from './MainNavigationDesktop'

export default {
  components: {
    MainNavigationDesktop,
  },
}
</script>
