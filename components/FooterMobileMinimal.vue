<template>
  <footer
    v-if="isScrollAtTop && isScrollable"
    class="fixed bottom-0 left-0 z-20 w-full px-4 pt-8 pb-5 bg-primary-white"
    aria-hidden="true"
  >
    <div class="flex self-start justify-between bg-white">
      <!-- Set fixed width to fix firefox width bug (firefox is using the full width in flex) -->
      <svg-icon
        class="h-12 w-[18.75rem] mr-4"
        name="logoCH"
        aria-hidden="true"
      />
      <div class="w-1/2 px-4 text-xs text-primary-blue">
        {{ $t('footerclaim') }}
      </div>
    </div>
  </footer>
</template>

<script>
import ScrollAtTopMixin from './ScrollAtTopMixin'

export default {
  name: 'FooterMobileMinimal',
  mixins: [ScrollAtTopMixin],
}
</script>

<style lang="postcss"></style>
