<template>
  <div
    class="flex flex-col justify-between h-full pb-12"
    :class="{ 'justify-center': !isDeep }"
  >
    <div v-if="isDeep" class="text-lg font-semibold text-primary-yellow">
      {{ parentTopic.label }}
    </div>
    <div class="flex flex-col justify-center">
      <ul class="flex flex-wrap mt-5">
        <li
          v-for="entry in entries"
          :key="entry.label"
          class="mt-4 mr-10 last:mr-0"
        >
          <navigation-link :entry="entry" mode="sub" @navigateTo="navigateTo" />
        </li>
      </ul>
    </div>
    <navigation-back-button
      v-if="isDeep"
      class="mt-8 hover:text-primary-yellow"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import NavigationBackButton from '@/components/NavigationBackButton'

export default {
  components: { NavigationBackButton },
  props: {
    skipPathCount: {
      required: false,
      default: 0,
      type: Number,
    },
  },
  computed: {
    ...mapState('menu', ['currentPath']),
    ...mapGetters({ leafEntry: 'menu/leaf' }),
    entries() {
      if (!this.leafEntry || !this.leafEntry.nodes) return []
      return this.leafEntry.nodes
    },
    isDeep() {
      if (!this.currentPath) return false
      const depth = 2 + this.skipPathCount
      // if we're two steps down the path
      return this.currentPath.length >= depth
    },
    parentTopic() {
      if (!this.currentPath) return ''

      const len = this.currentPath.length
      return this.currentPath[len - 1]
    },
  },
  methods: {
    navigateTo(entry) {
      if (entry.nodes.length) {
        this.$store.commit('menu/push', { navigationEntry: entry })
      } else {
        this.$router.push({ path: '/de/detail' })
      }
    },
  },
}
</script>
