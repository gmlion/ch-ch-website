<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Carousel } from "./types/types";
import { getCarouselItems, onSlideChange } from "./utils/homeCarouselUtils";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps<{
  carouselContent: Carousel[];
}>();

const { data: carouselItems } = await useAsyncData(async () => {
  return await getCarouselItems(props.carouselContent);
});

const swiperRef = ref<any>(null);
const showSwiper = ref(false);

onMounted(() => {
  showSwiper.value = true;
});

const onSwiper = (swiperInstance: any) => {
  swiperRef.value = swiperInstance;
  const prevButton = swiperInstance.navigation.prevEl as HTMLElement;
  const nextButton = swiperInstance.navigation.nextEl as HTMLElement;

  prevButton.style.display = "none";
  const updateNavigationButtons = () => {
    const index = swiperInstance.realIndex;
    const totalSlides = carouselItems.value?.length || 0;
    const isFirstSlide = index === 0;
    const isLastSlide = index === totalSlides - 1;

    if (prevButton) prevButton.style.display = isFirstSlide ? "none" : "";
    if (nextButton) nextButton.style.display = isLastSlide ? "none" : "";

    onSlideChange(index, carouselItems.value!);
  };

  updateNavigationButtons();

  swiperInstance.on("slideChange", updateNavigationButtons);
};
</script>

<template>
  <!-- Only show the Swiper if showSwiper is true -->
  <div v-if="showSwiper">
    <Swiper
      :modules="[
        SwiperAutoplay,
        SwiperEffectCreative,
        SwiperNavigation,
        SwiperPagination,
      ]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      navigation
      :pagination="{
        clickable: true,
        bulletClass: 'carousel__pagination-button',
        bulletActiveClass: 'carousel__pagination-button--active',
      }"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="carouselItem in carouselItems" :key="carouselItem.id">
        <div
          class="pb-4 text-left lg:h-[65vh] px-4 md:px-24 md:pb-14 carousel-entry"
        >
          <CarouselContent :carousel-content="carouselItem" />
        </div>
      </SwiperSlide>

      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<style lang="scss">
.swiper {
  max-height: 810px;
}
.swiper-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.carousel__pagination-button::after {
  width: 10px;
  height: 10px;
  background-color: #9aa3ab;
  content: "";
  display: block;
}

.carousel__pagination-button {
  margin: 0;
  padding: 0;
}

.carousel__pagination-button:hover::after {
  background-color: #fff;
}

.carousel__pagination-button--active::after {
  background-color: #fff;
}
</style>
