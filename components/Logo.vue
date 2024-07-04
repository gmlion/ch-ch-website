<template>
  <header
    class="mb-10 header-content"
    itemscope
    itemtype="http://schema.org/Organization"
  >
    <a class="skip-to-content-link" href="#main">
      {{ $t("skipToMainContent") }}
    </a>
    <a class="skip-to-content-link" href="#navigation">
      {{ $t("skipToNavigation") }}
    </a>
    <a class="hidden skip-to-content-link lg:block" href="#language">
      {{ $t("skipToLanguage") }}
    </a>
    <a class="skip-to-content-link lg:hidden" href="#language-mobile">
      {{ $t("skipToLanguage") }}
    </a>
    <meta itemprop="name" content="CHCH LOGO" />
    <!-- Ch Ch page header -->
    <a
      v-if="!isElection"
      class="no-underline !lg:hidden"
      :href="`/${$i18n.locale}`"
      :title="chchTitle"
      itemprop="url"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="406"
        height="117"
        :class="colorClasses"
        :aria-label="$t('logoIconTitle')"
        viewBox="0 0 406 117"
        class="fill-current logo"
      >
        <g fill-rule="evenodd" fill="currentColor">
          <path d="M193.254 114.93h21.306V93.625h-21.306z" />
          <path
            d="M193.255 114.93h21.305V93.623h-21.305zm-150.247-.119C19.293 114.811 0 95.518 0 71.803c0-23.715 19.293-43.008 43.008-43.008 13.654 0 26.193 6.267 34.403 17.195L63.656 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.229 0-25.805 11.576-25.805 25.805S28.78 97.608 43.008 97.608c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.519-10.543l-.121-7.388V.43H93.76v114.6h18.667V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.815 15.059 18.815 19.787v45.805h18.667v-48.39c0-8.601-1.782-15.319-3.878-18.738m111.765 66.907c-23.715 0-43.008-19.293-43.008-43.008 0-23.715 19.293-43.008 43.008-43.008 13.653 0 26.193 6.267 34.403 17.195L298.48 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.23 0-25.805 11.576-25.805 25.805s11.576 25.805 25.805 25.805c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.52-10.543l-.12-7.388V.43h-18.668v114.6h18.668V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.814 15.059 18.814 19.787v45.805h18.668v-48.39c0-8.601-1.782-15.319-3.878-18.738"
          />
        </g>
      </svg>
      <span :class="colorClasses" class="claim text-[21px]">
        {{ $t("claim") }}
      </span>
    </a>
    <!-- Ch Ch Election page header -->
    <div v-else class="!lg:hidden">
      <a
        class="no-underline !lg:hidden"
        :href="`/${$i18n.locale}`"
        :title="chchTitle"
        itemprop="url"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="406"
          height="117"
          :class="colorClasses"
          :aria-label="$t('logoIconTitle')"
          viewBox="0 0 406 117"
          class="fill-current election-logo"
        >
          <g fill-rule="evenodd" fill="currentColor">
            <path d="M193.254 114.93h21.306V93.625h-21.306z" />
            <path
              d="M193.255 114.93h21.305V93.623h-21.305zm-150.247-.119C19.293 114.811 0 95.518 0 71.803c0-23.715 19.293-43.008 43.008-43.008 13.654 0 26.193 6.267 34.403 17.195L63.656 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.229 0-25.805 11.576-25.805 25.805S28.78 97.608 43.008 97.608c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.519-10.543l-.121-7.388V.43H93.76v114.6h18.667V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.815 15.059 18.815 19.787v45.805h18.667v-48.39c0-8.601-1.782-15.319-3.878-18.738m111.765 66.907c-23.715 0-43.008-19.293-43.008-43.008 0-23.715 19.293-43.008 43.008-43.008 13.653 0 26.193 6.267 34.403 17.195L298.48 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.23 0-25.805 11.576-25.805 25.805s11.576 25.805 25.805 25.805c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.52-10.543l-.12-7.388V.43h-18.668v114.6h18.668V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.814 15.059 18.814 19.787v45.805h18.668v-48.39c0-8.601-1.782-15.319-3.878-18.738"
            />
          </g>
        </svg>
      </a>
      <a
        class="no-underline !lg:hidden my-0"
        :href="electionHomePagePath"
        :title="electionTitle"
        itemprop="url"
      >
        <h2 class="mb-2 text-[48px]" :class="colorClasses">
          {{ $t("electionPageTitle") }}
        </h2>
        <span :class="colorClasses" class="claim text-[21px]">
          {{ $t("electionClaim") }}
        </span>
      </a>
    </div>
    <!-- Ch Ch mobile page header -->
    <div v-if="!isElection" class="lg:hidden lg:opacity-0">
      <div
        class="fixed top-0 left-0 z-40 flex items-center justify-between w-full px-4 py-4"
        :class="colorClasses"
      >
        <a
          class="no-underline"
          :href="`/${$i18n.locale}`"
          :class="colorClasses"
          :title="chchTitle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="406"
            height="117"
            :class="colorClasses"
            :aria-label="$t('logoIconTitle')"
            viewBox="0 0 406 117"
            class="transition-all duration-200 fill-current logo"
          >
            <g fill-rule="evenodd" fill="currentColor">
              <path d="M193.254 114.93h21.306V93.625h-21.306z" />
              <path
                d="M193.255 114.93h21.305V93.623h-21.305zm-150.247-.119C19.293 114.811 0 95.518 0 71.803c0-23.715 19.293-43.008 43.008-43.008 13.654 0 26.193 6.267 34.403 17.195L63.656 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.229 0-25.805 11.576-25.805 25.805S28.78 97.608 43.008 97.608c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.519-10.543l-.121-7.388V.43H93.76v114.6h18.667V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.815 15.059 18.815 19.787v45.805h18.667v-48.39c0-8.601-1.782-15.319-3.878-18.738m111.765 66.907c-23.715 0-43.008-19.293-43.008-43.008 0-23.715 19.293-43.008 43.008-43.008 13.653 0 26.193 6.267 34.403 17.195L298.48 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.23 0-25.805 11.576-25.805 25.805s11.576 25.805 25.805 25.805c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.52-10.543l-.12-7.388V.43h-18.668v114.6h18.668V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.814 15.059 18.814 19.787v45.805h18.668v-48.39c0-8.601-1.782-15.319-3.878-18.738"
              />
            </g>
          </svg>
        </a>
        <div class="flex items-center search-navi--mobile">
          <language-picker-mobile class="mr-6" />
          <search-link :is-mobile="true" />
        </div>
      </div>

      <div :class="colorClasses" class="relative mt-[56px] text-claim-fluid">
        {{ $t("claim") }}
      </div>
    </div>
    <!-- Ch Ch Election mobile page header -->
    <div v-else class="lg:hidden lg:opacity-0">
      <div
        class="fixed top-0 left-0 z-40 flex items-start justify-between w-full px-4"
        :class="{
          [colorClasses]: true,
          'leading-6 py-4 pb-0 mb-0': isScrollAtTop,
          'leading-4 py-3': !isScrollAtTop,
        }"
      >
        <div class="flex-col">
          <a
            class="no-underline"
            :href="`/${$i18n.locale}`"
            :class="colorClasses"
            :title="chchTitle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="406"
              height="117"
              :aria-label="$t('logoIconTitle')"
              viewBox="0 0 406 117"
              class="sition-all duration-200 fill-current w-[80px] h-[40px]"
              :class="colorClasses"
            >
              <g fill-rule="evenodd" fill="currentColor">
                <path d="M193.254 114.93h21.306V93.625h-21.306z" />
                <path
                  d="M193.255 114.93h21.305V93.623h-21.305zm-150.247-.119C19.293 114.811 0 95.518 0 71.803c0-23.715 19.293-43.008 43.008-43.008 13.654 0 26.193 6.267 34.403 17.195L63.656 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.229 0-25.805 11.576-25.805 25.805S28.78 97.608 43.008 97.608c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.519-10.543l-.121-7.388V.43H93.76v114.6h18.667V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.815 15.059 18.815 19.787v45.805h18.667v-48.39c0-8.601-1.782-15.319-3.878-18.738m111.765 66.907c-23.715 0-43.008-19.293-43.008-43.008 0-23.715 19.293-43.008 43.008-43.008 13.653 0 26.193 6.267 34.403 17.195L298.48 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.23 0-25.805 11.576-25.805 25.805s11.576 25.805 25.805 25.805c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.52-10.543l-.12-7.388V.43h-18.668v114.6h18.668V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.814 15.059 18.814 19.787v45.805h18.668v-48.39c0-8.601-1.782-15.319-3.878-18.738"
                />
              </g>
            </svg>
          </a>
          <a
            class="flex-col no-underline"
            :href="electionHomePagePath"
            :class="colorClasses"
            :title="electionTitle"
          >
            <h2 class="text-[38px]" :class="colorClasses">
              {{ $t("electionPageTitle") }}
            </h2>
          </a>
        </div>
        <div class="flex items-center search-navi--mobile">
          <language-picker-mobile class="mr-6" />
          <search-link :is-mobile="true" />
        </div>
      </div>

      <div :class="classes" class="relative text-claim-fluid mt-[105px]">
        {{ $t("electionClaim") }}
      </div>
    </div>
    <link itemprop="logo" :href="`${windowUrl}${logoUrl}`" />
  </header>
</template>

<script>
import { electionSlugs } from "~/utils/url";
import LanguagePickerMobile from "@/components/LanguagePickerMobile.vue";

import SearchLink from "@/components/SearchLink.vue";
import ScrollAtTopMixin from "./ScrollAtTopMixin";
import logoUrl from "~/assets/logo.svg";

export default {
  name: "Logo",
  components: {
    LanguagePickerMobile,
    SearchLink,
  },
  mixins: [ScrollAtTopMixin],
  props: {
    colorClasses: {
      type: String || Array || Object,
      required: false,
      default: "text-primary-black md:text-primary-blue bg-primary-white",
    },
    isElection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logoUrl,
      windowUrl: "",
    };
  },
  computed: {
    electionTitle() {
      return this.$t("electionAlt");
    },
    chchTitle() {
      return this.$t("chchAlt");
    },
    classes() {
      if (this.isScrollAtTop) {
        return this.colorClasses;
      }
      if (this.isElection) {
        return this.colorClasses + " opacity-0 w-[0px] h-[0px]";
      }
      return this.colorClasses + " w-[110px] h-[31px]";
    },
    electionPath() {
      return electionSlugs[this.$i18n.locale] + "/";
    },
    electionHomePagePath() {
      return `/${this.$i18n.locale}/${this.electionPath}`;
    },
  },
  mounted() {
    this.windowUrl = window.location.origin;
  },
};
</script>
<style lang="postcss" scoped>
.bg-primary-white .search-navi--mobile {
  @apply text-primary-blue;
}

.skip-to-content-link {
  background-color: gray;
  height: 30px;
  left: 0px;
  padding: 8px;
  position: absolute;
  top: 0px;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  color: black;
}

.skip-to-content-link:focus {
  width: auto;
  height: auto;
  clip: auto;
}
</style>
