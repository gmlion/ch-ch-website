<template>
  <div class="relative h-full overflow-auto">
    <simplebar class="relative h-full" data-simplebar-auto-hide="false">
      <nav
        class="flex-1 overflow-y-auto px-11"
        role="navigation"
        :aria-label="$t('navAriaDesktop')"
      >
        <ul class="pb-12">
          <li
            v-for="entry in menu"
            :key="entry.label"
            class="mt-4 text-primary-blue first:mt-0"
          >
            <navigation-link
              :entry="entry"
              mode="main"
              @navigateTo="navigateTo"
            />
          </li>
        </ul>
      </nav>
    </simplebar>
  </div>
</template>

<script>
import MainNavigationMixin from "@/components/MainNavigationMixin";
import Simplebar from "simplebar-vue";
// import 'simplebar/dist/simplebar.min.css'

export default {
  name: "MainNavigationDesktop",
  components: {
    Simplebar,
  },
  mixins: [MainNavigationMixin],
};
</script>

<style lang="postcss">
.simplebar-scrollbar {
  @apply bg-primary-red;

  &:before {
    @apply bg-primary-red;
  }
}

.simplebar-vertical {
  @apply bg-gray-50;
  width: 8px !important;
}

.simplebar-horizontal {
  @apply hidden;
}
</style>
