<template>
  <a
    v-if="!isLandingPage"
    class="flex items-center mt-6 font-semibold no-underline all-topic-link text-inherit hover:inherit"
    :href="`/${$i18n.locale}/${electionPath}`"
  >
    <svg-icon
      name="keyboard-arrow-left"
      class="w-10 h-10 text-inherit"
      :aria-label="$t('allTopicIconTitle')"
    />
    <div class="ml-4 text-lg text-bold">{{ $t("allTopics") }}</div>
  </a>
</template>

<script>
import { mapState } from "vuex";
import { electionSlugs } from "~/utils/url";

export default {
  name: "AllTopicsLink",
  computed: {
    ...mapState("menu", ["isElection"]),
    isLandingPage() {
      return !this.$route.matched.some(({ name }) => name.indexOf("index"));
    },
    electionPath() {
      if (this.isElection) {
        return electionSlugs[this.$i18n.locale] + "/";
      }
      return "";
    },
  },
};
</script>
