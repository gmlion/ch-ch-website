<script lang="ts" setup>
import type {Image as ImageType} from "../HomeCarousel/types/types";
import {Dialog, DialogContent, DialogTrigger,} from '@/components/ui/dialog'
import {useI18n} from "vue-i18n";
import ImageElement from "~/components/ContentBlock/ImageElement.vue";

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
  hasLightBox: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const {locale, defaultLocale} = useI18n();

const altText = getAltText(
    locale.value,
    defaultLocale,
    props.image.additionalData || undefined
);

</script>

<template>
  <div class="image-wrapper mb-8">
    <div v-if="props.hasLightBox">
      <Dialog>
        <DialogTrigger>
          <ImageElement :width="props.image?.width" :height="props.image?.height" :alt-text="altText"
                        :src="props.image.url" :caption="caption" :text="props.image.text"
                        :alignment="props.image?.textAlign" :classes="classes"/>
        </DialogTrigger>
        <DialogContent class="p-0 max-w-none w-fit bg-transparent border-0">
          <ImageElement :width="props.image?.width" :height="props.image?.height" :alt-text="altText"
                        :src="props.image.url" :caption="caption"
                        :classes="classes"/>
        </DialogContent>

      </Dialog>
    </div>
    <div v-else>
      <ImageElement :width="props.image?.width" :height="props.image?.height" :alt-text="altText" :src="props.image.url"
                    :caption="caption" :classes="classes" :alignment="props.image?.textAlign"/>


    </div>
  </div>
</template>