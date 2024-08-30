<script lang="ts" setup>
import {ref} from "vue";
import {useFooterMenuStore} from "~/generate/store/footerMenuStore";
import type {MenuResponse} from "~/generate/types/routingTypes";

const { locale } = useI18n();

const props = defineProps<{
  color?: string;
  divisionMode?: string;
  isElection?: boolean;
}>();
const isOpen = ref(false);

const emit = defineEmits<{
  (event: "update:isOpen", isOpen: boolean): void;
}>();

const toggleFooterIsOpen = () => {
  isOpen.value = !isOpen.value;
};

const footerData = useAsyncData("footerStore", async () => {
  return await useFooterMenuStore(locale.value);
});

const currentMenu = (): MenuResponse | undefined => {
  return footerData.data.value?.find((menu) => {
    return menu;
  });
};

const links = () => {
  const menu = currentMenu();
  if (!menu) return [];
  const nodes = menu?.nodes.slice(0, menu.nodes.length - 1);
  return nodes.map((node) => {
    return {
      name: node.label,
      link: node.url,
      target: node.target ? node.target : "_self",
    };
  });
};

const lastLink = () => {
  const menu = currentMenu();
  if (!menu || !menu.nodes.length) return null;

  const node = menu.nodes[menu.nodes.length - 1];
  return {
    name: node.label,
    link: node.url,
    target: node.target ? node.target : "_self",
  };
};
</script>
<template>
  <footer
    :class="[
      isOpen ? 'w-full border-gray-600' : 'border-transparent',
      !isOpen ? 'pb-[10.75rem]' : '',
      props.divisionMode === 'fifths' && !isOpen ? 'lg:w-2/5' : '',
      props.divisionMode === 'halves' && !isOpen ? 'lg:w-1/2' : '',
      props.color !== 'white' && !isOpen ? `bg-primary-${props.color}` : '',
      props.color !== 'white' && props.color !== 'yellow' && !isOpen
        ? 'text-primary-white'
        : '',
      props.color === 'yellow' && !isOpen ? 'text-gray-900' : '',
      props.color === 'white' || isOpen
        ? 'bg-primary-white text-primary-blue'
        : '',
    ]"
    class="sticky bottom-0 left-0 z-20 pt-8 border-t xl:pb-10 h-36 px-9 -mt-36"
    :aria-label="$t('footerAriaDesktop')"
  >
    <div class="flex flex-col lg:flex-row">
      <div
        :class="isOpen ? 'w-1/2 justify-start' : 'w-full justify-start'"
        class="flex self-start flex-col lg:flex-row"
      >
        <button
          class="h-16 mr-4 hidden lg:block"
          :aria-label="$t('toggleFooter')"
          @click="toggleFooterIsOpen"
        >
          <svg-icon
            :title="$t('openCloseFooterIconTitle')"
            class="w-8 h-16 fill-curren"
            :name="isOpen ? 'arrow-up' : 'arrow-down'"
          />
        </button>
        <div class="logo-container" :class="isOpen ? 'ml-8' : ['xl:ml-8']">
          <svg-icon class="w-48 h-16" name="logoCH" aria-hidden="true" />
        </div>
        <p
          class="xl:ml-8 footer-claim text-footer-claim-fluid xl:pt-[0.625rem] block pt-[0.625rem]"
        >
          {{ isElection ? $t("electionFooterClaim") : $t("footerclaim") }}
        </p>
      </div>
      <div
        :class="
          isOpen
            ? 'lg:flex lg:self-start lg:justify-between lg:w-1/2 lg:px-4 lg:pt-[6px] xl:pr-24'
            : 'flex lg:justify-between w-full lg:hidden mt-8 lg:mt-0 flex-wrap gap-4 lg:flex-nowrap'
        "
      >
        <a
          v-for="link in links()"
          :key="link.name"
          class="footer-link"
          :target="link.target"
          :href="link.link"
        >
          {{ link.name }}
        </a>
        <div class="order-3 md:order-[unset]">
          <footer-social-media />
        </div>

        <a
          v-if="lastLink()"
          class="footer-link"
          :target="lastLink()?.target"
          :href="lastLink()?.link"
        >
          {{ lastLink()?.name }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss">
.footer-link {
  @apply border-tertiary-yellow text-primary-blue border-b no-underline whitespace-nowrap;
  line-height: 30px;
}

@media (max-width: 1200px) {
  .logo-container {
    @apply mx-2;
  }

  .footer-claim {
    @apply w-full text-xs text-primary-blue;
  }
}
</style>