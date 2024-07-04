<template>
  <footer
    :class="footerClasses"
    class="sticky bottom-0 left-0 z-20 pt-8 border-t xl:pb-10 h-36 px-9 -mt-36"
    :aria-label="$t('footerAriaDesktop')"
  >
    <div class="flex">
      <div
        :class="
          isOpen ? ['w-1/2', 'justify-start'] : ['w-full', 'justify-start']
        "
        class="flex self-start"
      >
        <button
          class="h-16 mr-4"
          :aria-label="$t('toggleFooter')"
          @click="toggleFooterIsOpen"
        >
          <svg-icon
            :title="$t('openCloseFooterIconTitle')"
            class="w-8 h-16 fill-current"
            :name="isOpen ? 'arrow-up' : 'arrow-down'"
          />
        </button>
        <div class="logo-container" :class="isOpen ? 'ml-8' : ['xl:ml-8']">
          <svg-icon class="w-48 h-16" name="logoCH" aria-hidden="true" />
        </div>
        <p
          class="xl:ml-8 footer-claim text-footer-claim-fluid xl:pt-[0.625rem]"
          :class="isOpen ? ['block', 'pt-[0.625rem]'] : ['hidden', 'lg:block']"
        >
          {{ isElection ? $t("electionFooterClaim") : $t("footerclaim") }}
        </p>
      </div>
      <div
        v-show="isOpen"
        class="flex self-start justify-between w-1/2 px-4 footer-content xl:pr-24"
      >
        <a
          v-for="link in links"
          :key="link.label"
          class="footer-link"
          :target="link.target"
          :href="link.link"
        >
          {{ link.name }}
        </a>

        <footer-social-media />

        <a
          v-if="lastLink"
          class="footer-link"
          :target="lastLink.target"
          :href="lastLink.link"
        >
          {{ lastLink.name }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import FooterSocialMedia from "@/components/FooterSocialMedia";
import FooterMixin from "@/components/FooterMixin";

export default {
  name: "FooterDesktop",
  components: {
    FooterSocialMedia,
  },
  mixins: [FooterMixin],
  props: {
    color: {
      type: String,
      required: false,
      default: "",
    },
    divisionMode: {
      type: String,
      required: false,
      default: "",
    },
    isElection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    footerClasses() {
      return {
        "lg:w-2/5": this.divisionMode === "fifths" && !this.isOpen,
        "lg:w-1/2": this.divisionMode === "halves" && !this.isOpen,
        "border-transparent": !this.isOpen,
        "w-full border-gray-600": this.isOpen,
        "pb-[10.75rem]": !this.isOpen,
        // test/idea: if we want to isOpen horizintal
        // 'h-screen fixed top-0': this.isOpen,
        [`bg-primary-${this.color}`]: this.color !== "white" && !this.isOpen,
        [`text-primary-white`]:
          this.color !== "white" && this.color !== "yellow" && !this.isOpen,
        "text-gray-900": this.color === "yellow" && !this.isOpen,
        [`bg-primary-white text-primary-blue`]:
          this.color === "white" || this.isOpen,
      };
    },
  },
  methods: {
    toggleFooterIsOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="postcss">
.pusher {
  @apply lg:pb-36 !important;
}

.footer-link {
  @apply border-tertiary-yellow text-primary-blue border-b no-underline whitespace-nowrap;
  line-height: 30px;
}

.footer-claim {
  @apply text-inherit leading-6;

  max-width: 450px;
}

.footer-content {
  padding-top: 6px;
}

@media (max-width: 1200px) {
  .logo-container {
    @apply mx-2;
  }
}
</style>
