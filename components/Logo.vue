<script setup>
//TODO: Create Color Classe Global CSS
import { ref, onMounted } from "vue";
import SkipLink from "@/components/SkipLink.vue";

const windowUrl = ref("");
onMounted(() => {
  windowUrl.value = window.location.origin;
});
</script>

<template>
  <header
    class="mb-10 header-content"
    itemscope
    itemtype="http://schema.org/Organization"
  >
    <SkipLink />
    <meta itemprop="name" content="CHCH LOGO" />
    <a class="no-underline block w-[fit-content]" :href="`/${$i18n.locale}`" itemprop="url">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="406"
        height="117"
        :aria-label="$t('logoIconTitle')"
        viewBox="0 0 406 117"
        class="fill-current logo w-[120px] h-[40px] lg:mb-5 logo-color-classes"
      >
        <g fill-rule="evenodd" fill="currentColor">
          <path d="M193.254 114.93h21.306V93.625h-21.306z" />
          <path
            d="M193.255 114.93h21.305V93.623h-21.305zm-150.247-.119C19.293 114.811 0 95.518 0 71.803c0-23.715 19.293-43.008 43.008-43.008 13.654 0 26.193 6.267 34.403 17.195L63.656 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.229 0-25.805 11.576-25.805 25.805S28.78 97.608 43.008 97.608c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.519-10.543l-.121-7.388V.43H93.76v114.6h18.667V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.815 15.059 18.815 19.787v45.805h18.667v-48.39c0-8.601-1.782-15.319-3.878-18.738m111.765 66.907c-23.715 0-43.008-19.293-43.008-43.008 0-23.715 19.293-43.008 43.008-43.008 13.653 0 26.193 6.267 34.403 17.195L298.48 56.323c-4.93-6.561-12.455-10.325-20.648-10.325-14.23 0-25.805 11.576-25.805 25.805s11.576 25.805 25.805 25.805c8.193 0 15.719-3.763 20.648-10.325l13.755 10.333c-8.21 10.928-20.75 17.195-34.403 17.195m123.06-66.907c-9.95-19.539-33.604-22.98-53.52-10.543l-.12-7.388V.43h-18.668v114.6h18.668V60.646c0-3.035 7.564-11.206 20.036-11.206 18.494 0 18.814 15.059 18.814 19.787v45.805h18.668v-48.39c0-8.601-1.782-15.319-3.878-18.738"
          />
        </g>
      </svg>
      <span
        class="relative block mt-4 text-claim-fluid text-primary-claim bg-primary-white lg:text-[21px] logo-color-classes"
      >
        {{ $t("claim") }}
      </span>
    </a>
  </header>
</template>