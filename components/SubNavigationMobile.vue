<template>
  <div>
    <div v-if="isDeep" class="text-lg font-semibold text-primary-blue">
      {{ parentTopic.label }}
    </div>
    <ul>
      <li
        v-for="(node, index) in nodes"
        :key="node.label + index"
        class="py-2.5 text-2lg border-b border-gray-600-translucent last:border-0"
      >
        <navigation-link
          :entry="node"
          mode="sub"
          :mobile-path="currentPath"
          @navigateTo="navigateTo"
        />
      </li>
    </ul>
    <div v-if="isDeep">
      <navigation-back-button
        class="font-semibold text-tertiary-yellow"
        :menu-index="menuIndex"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavigationBackButton from '@/components/NavigationBackButton'

export default {
  name: 'SubNavigationMobile',
  components: { NavigationBackButton },
  props: {
    skipPathCount: {
      required: false,
      default: 0,
      type: Number,
    },
    navigationEntry: {
      required: true,
      type: Object,
    },
    menuIndex: {
      required: true,
      type: Number,
    },
    menuEntry: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      leafEntry: 'menu/leaf',
      mainMenu: 'menu/mainMenu',
    }),
    entry() {
      return this.navigationEntry || this.leafEntry
    },
    nodes() {
      if (!this.entry || !this.entry.nodes) return []
      return this.entry.nodes
    },
    isDeep() {
      if (
        this.currentPath &&
        this.currentPath.length >= 2 + this.skipPathCount
      ) {
        return true
      }

      if (!this.menuEntry.children) return false
      const depth = 1 + this.skipPathCount
      // if we're two steps down the path, this means we should display the
      // back button
      return this.menuEntry.children.length >= depth
    },
    parentTopic() {
      if (this.leafEntry) {
        return this.leafEntry
      }
      if (!this.menuEntry.children) return ''

      const len = this.menuEntry.children.length
      return this.menuEntry.children[len - 1]
    },
    currentPath() {
      if (this.menuIndex === undefined) {
        return this.storeCurrentPath
      }
      if (!this.menuEntry.children) {
        return []
      }
      return [this.menuEntry, ...this.menuEntry.children]
    },
    storeCurrentPath() {
      return this.$store.state.menu.currentPath
    },
  },
  methods: {
    navigateTo(navigationEntry) {
      if (navigationEntry.nodes.length) {
        this.$store.commit('menu/push', {
          navigationEntry,
          menuIndex: this.menuIndex,
        })
      } else {
        this.$router.push({ path: '/detail' })
      }
    },
    navigateBack() {
      this.$store.commit('menu/pop', { menuIndex: this.menuIndex })
    },
  },
}
</script>
