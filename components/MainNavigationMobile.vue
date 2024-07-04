<template>
  <nav
    :class="navClasses"
    class="relative pb-8"
    role="navigation"
    :aria-label="$t('navAriaMobile')"
  >
    <ul>
      <li
        v-for="(entry, entryIndex) in menu"
        :key="entry.label"
        class="border-gray-600-translucent border-b py-3 md:py-2.5 last:border-b-0 text-primary-blue"
      >
        <div class="flex justify-between pr-6 hover:text-gray-600">
          <navigation-link
            :entry="entry"
            class="flex-1"
            mode="main"
            @navigateTo="navigateTo(entry, entryIndex)"
          />
          <button
            :aria-label="entry.label"
            @click="navigateTo(entry, entryIndex)"
          >
            <main-navigation-mobile-chevron v-if="entry.isExpanded" />
          </button>
        </div>
        <sub-navigation-mobile
          v-if="entry.isExpanded"
          class="pl-5"
          :navigation-entry="getSubEntry(entry)"
          :menu-index="entryIndex"
          :menu-entry="entry"
        />
      </li>
    </ul>
    <side-fader v-if="isCollapsed" class="left-0 right-0 bottom-8" />
    <main-navigation-mobile-collapser
      class="bottom-0 left-0 right-0"
      :is-collapsed="isCollapsed"
      @click="toggleCollapse"
    />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import MainNavigationMixin from '@/components/MainNavigationMixin'
import MainNavigationMobileChevron from '@/components/MainNavigationMobileChevron'
import SideFader from '@/components/SideFader'
import MainNavigationMobileCollapser from '@/components/MainNavigationMobileCollapser'

export default {
  name: 'MainNavigationMobile',
  components: {
    MainNavigationMobileChevron,
    SideFader,
    MainNavigationMobileCollapser,
  },
  mixins: [MainNavigationMixin],
  data() {
    return {
      isCollapsed: true,
    }
  },
  computed: {
    ...mapGetters({
      selectedEntry: 'menu/selectedMainEntry',
    }),
    navClasses() {
      return {
        'overflow-y-hidden': this.isCollapsed,
        'h-[50vh]': this.isCollapsed,
      }
    },
  },
  methods: {
    navigateTo(navigationEntry, entryIndex) {
      if (navigationEntry.isExpanded) {
        // clicked on the same entry, close it
        this.$store.commit('menu/collapseEntry', entryIndex)
        return
      }
      this.$store.commit('menu/expandEntry', entryIndex)
      this.isCollapsed = false
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },
    getSubEntry(entry) {
      if (entry.children.length === 0) {
        return entry
      }
      return entry.children[entry.children.length - 1]
    },
  },
}
</script>
