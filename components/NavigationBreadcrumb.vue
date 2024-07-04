<template>
  <ul
    class="flex flex-wrap text-lg"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <meta itemprop="name" content="Breadcrumb" />
    <li
      class="item"
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
    >
      <navigation-breadcrumb-item
        :label="$t('allTopics')"
        :href="`/${$i18n.locale}/${electionPath}`"
        :mode="background"
      />
      <meta itemprop="position" content="1" />
    </li>
    <li
      v-for="(entry, index) in path"
      :key="entry.label"
      class="item"
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
    >
      <navigation-breadcrumb-item
        v-if="index != path.length - 1 || isLeafLinked"
        :label="entry.label"
        :href="getUrl(index)"
        :mode="background"
        :is-leaf="index === path.length - 1"
      />
      <!-- different one for the last entry -->
      <navigation-breadcrumb-item
        v-else
        :label="entry.label"
        :is-leaf="true"
        :mode="background"
      />
      <meta itemprop="position" :content="index + 2" />
    </li>
  </ul>
</template>

<script>
import { makeNavigationPath, electionSlugs } from "~/utils/url";

import NavigationBreadcrumbItem from "@/components/NavigationBreadcrumbItem";

export default {
  name: "NavigationBreadcrumb",
  components: { NavigationBreadcrumbItem },
  props: {
    path: {
      required: true,
      type: Array,
    },
    background: {
      required: false,
      validator: (value) => ["blue", "white"].includes(value),
      default: "blue",
    },
    /** Specifies if the last entry in the path is a link or not */
    isLeafLinked: {
      required: false,
      default: false,
      type: Boolean,
    },
    isElection: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  computed: {
    electionPath() {
      if (this.isElection) {
        return electionSlugs[this.$i18n.locale] + "/";
      }
      return "";
    },
  },
  methods: {
    navigateTo(navigationEntry) {
      this.$store.commit("menu/goBackToEntry", navigationEntry);
    },
    getUrl(index) {
      return (
        `/${this.$i18n.locale}/${this.electionPath}` +
        makeNavigationPath(this.path.slice(0, index + 1))
      );
    },
  },
};
</script>
