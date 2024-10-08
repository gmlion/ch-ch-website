<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

const props = defineProps<{
  contentComponent: Array<any>;
}>();

const currentSlide = ref(1);
const totalSlides = ref(0);
const swiperInstance = ref(null);

const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper;
  totalSlides.value = swiper.slides.length; // Set total slides length
};

// Update the current slide number when the active index changes
const onSlideChange = (swiper: any) => {
  currentSlide.value = swiper.realIndex + 1; // realIndex is 0-based, add 1 for display
};

const goPrev = () => {
  if (swiperInstance.value) {
    // @ts-ignore
    swiperInstance.value.slidePrev();
  }
};

const goNext = () => {
  if (swiperInstance.value) {
    // @ts-ignore
    swiperInstance.value.slideNext();
  }
};
</script>

<template>
  <div class="flex lg:items-center lg:justify-between lg:flex-row flex-col relative">
    <div class="flex gap-6">
      <div class="text-2xl font-semibold">{{ currentSlide }} / {{ totalSlides }}</div>
    </div>
    <Swiper :modules="[SwiperNavigation, SwiperEffectCreative]" :slides-per-view="1" :loop="true" :auto-height="true"
      @swiper="onSwiperInit" @slideChange="onSlideChange" class="w-[80%] order-3 lg:order-[unset]">
      <SwiperSlide v-for="(item, index) in props.contentComponent" :key="index">
        <div class="text-left">
          <ContentComponents :content-component="item" classes="how-to" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="absolute right-0 lg:static flex order-1 lg:order-3 gap-8 items-center h-8 ">
      <div class="swiper-button-prev cursor-pointer text-primary-blue w-8 h-8" @click="goPrev"></div>
      <div class="swiper-button-next cursor-pointer text-primary-blue w-8 h-8" @click="goNext"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 32px;
}

.swiper-button-prev,
.swiper-button-next {
  position: relative;
  @apply text-primary-blue hover:text-primary-gold;
}

.swiper .image-wrapper img {
  width: auto;
}
</style>