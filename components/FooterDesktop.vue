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
          :key="link.name"
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

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import FooterSocialMedia from "@/components/FooterSocialMedia.vue";
import type { LinkItem } from "~/store/types/page";
import { useFooterMenuStore } from "~/generate/store/footerMenuStore";

const props = defineProps<{
  color?: string;
  divisionMode?: string;
  isElection?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:isOpen", isOpen: boolean): void;
}>();

const isOpen = ref(false);

const footerClasses = computed(() => {
  return {
    "lg:w-2/5": props.divisionMode === "fifths" && !isOpen.value,
    "lg:w-1/2": props.divisionMode === "halves" && !isOpen.value,
    "border-transparent": !isOpen.value,
    "w-full border-gray-600": isOpen.value,
    "pb-[10.75rem]": !isOpen.value,
    [`bg-primary-${props.color}`]: props.color !== "white" && !isOpen.value,
    [`text-primary-white`]:
      props.color !== "white" && props.color !== "yellow" && !isOpen.value,
    "text-gray-900": props.color === "yellow" && !isOpen.value,
    [`bg-primary-white text-primary-blue`]:
      props.color === "white" || isOpen.value,
  };
});

const toggleFooterIsOpen = () => {
  isOpen.value = !isOpen.value;
};
useAsyncData("footerStore", async () => {
  const data = await useFooterMenuStore();

  return data;
});
const links = ref<LinkItem[]>([]); // Populate this with your actual links

const lastLink = ref<LinkItem | null>(null); // Populate this with your actual last link
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
