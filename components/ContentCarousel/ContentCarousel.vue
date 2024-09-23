<script setup lang="ts">
import {ref} from 'vue';
import type {ContentGallery} from '~/core/types/publicationsTypes';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Props from the parent component
const props = defineProps<{
  galleryContent: ContentGallery[];
}>();

// Create a ref for the Swiper instance
const swiperRef = ref<any>(null);

// Reactive state for tracking the current active slide index
const currentSlide = ref(1);
const totalSlides = ref(0); // Total slides length

// Function to go to the next and previous slide
const goNext = () => {
  if (swiperRef.value) swiperRef.value.slideNext();
};

const goPrev = () => {
  if (swiperRef.value) swiperRef.value.slidePrev();
};

// Capture the swiper instance when it's ready
const onSwiperInit = (swiperInstance: any) => {
  swiperRef.value = swiperInstance;
  totalSlides.value = swiperInstance.slides.length; // Set total slides length
};

// Update the current slide number when the active index changes
const onSlideChange = (swiperInstance: any) => {
  currentSlide.value = swiperInstance.realIndex + 1; // realIndex is 0-based, add 1 for display
};
</script>

<template class="">
  <Swiper
      :modules="[SwiperNavigation, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      @swiper="onSwiperInit"
      @slideChange="onSlideChange"
      class="w-full lg:w-[85%] relative !m-[unset]"
  >
    <!-- Create Swiper slides dynamically from galleryContent -->
    <SwiperSlide v-for="galleryItem in galleryContent" :key="galleryItem.id">
      <div class="text-left carousel-entry aspect">
        <figure>
          <picture>
            <img :src="galleryItem.content.image.url" :alt="galleryItem.content.caption"
                 :width="galleryItem.content.image.crop ? galleryItem.content.image.crop.width : galleryItem.content.image.width"
                 :height="galleryItem.content.image.crop ? galleryItem.content.image.crop.height : galleryItem.content.image.height">
          </picture>
          <figcaption class="mt-5">
            <p>{{ galleryItem.content.caption }}</p>
          </figcaption>
        </figure>
      </div>
    </SwiperSlide>
    <div class="flex items-center justify-between py-6 ">
      <div class="text-2xl font-semibold">{{ currentSlide }} / {{ totalSlides }}</div>
      <div class="flex gap-8 items-center h-8 ">
        <div class="swiper-button-prev cursor-pointer text-primary-blue w-8 h-8" @click="goPrev"></div>
        <div class="swiper-button-next cursor-pointer text-primary-blue w-8 h-8" @click="goNext"></div>
      </div>
    </div>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper {
  max-height: 810px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 32px;
}

.swiper-button-prev,
.swiper-button-next {
  position: relative;
  @apply text-primary-blue hover:text-primary-gold;

}

.swiper-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.swiper {
  .image-wrapper {
    img {
      width: 100%;
    }
  }
}
</style>