<template>
  <footer
    class="flex flex-col px-4 pb-8 mt-10"
    :aria-label="$t('footerAriaMobile')"
  >
    <div class="flex justify-between">
      <all-topic-link
        class="my-11 text-primary-blue hover:text-secondary-yellow"
      />
      <div class="w-1/2 px-4 text-xs"></div>
    </div>

    <div class="flex-col">
      <!-- Set fixed width to fix firefox width bug (firefox is using the full width in flex) -->
      <svg-icon
        class="h-12 w-[13.75rem] mr-4 mb-8"
        name="logoCH"
        aria-hidden="true"
      />
      <div class="w-full text-xs text-primary-blue">
        {{ isElection ? $t('electionFooterClaim') : $t('footerclaim') }}
      </div>
    </div>
    <div class="flex flex-wrap justify-between mt-8 mr-2">
      <a
        v-for="link in links"
        :key="link.label"
        class="footer-link"
        :target="link.target"
        :href="link.link"
      >
        {{ link.name }}
      </a>

      <footer-social-media size="small" class="hidden md:flex" />

      <a
        v-if="lastLink"
        class="footer-link"
        :target="lastLink.target"
        :href="lastLink.link"
      >
        {{ lastLink.name }}
      </a>
    </div>
    <footer-social-media size="small" class="mt-8 md:hidden" />
  </footer>
</template>

<script>
import FooterSocialMedia from '@/components/FooterSocialMedia'
import FooterMixin from '@/components/FooterMixin'
import AllTopicLink from './AllTopicLink.vue'

export default {
  name: 'FooterMobileNormal',
  components: {
    FooterSocialMedia,

    AllTopicLink,
  },
  mixins: [FooterMixin],
  props: {
    isElection: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
