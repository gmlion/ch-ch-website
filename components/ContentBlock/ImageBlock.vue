<script lang="ts" setup>
import type {Image as ImageType} from "../HomeCarousel/types/types";
import {useI18n} from "vue-i18n";

const props = defineProps({
  caption: {
    type: String,
    required: false,
  },
  image: {
    type: Object as () => ImageType,
    required: true,
  },
  classes: {
    type: String,
    required: false,
  },
});

const {locale, defaultLocale} = useI18n();

const altText = getAltText(
    locale.value,
    defaultLocale,
    props.image.additionalData || {}
);
</script>

<template>
  <div class="image-wrapper">
    <figure class="flex flex-col">
      <picture>
        <img
            ref="image"
            :class="classes"
            class="w-full"
            :src="props.image.url"
            :alt="altText"
        />
      </picture>

      <figcaption
          v-if="caption"
          class="max-w-full mt-5"
          v-html="caption"
      ></figcaption>
    </figure>
  </div>
</template>