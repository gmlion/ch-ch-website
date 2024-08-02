<script lang="ts" setup>
import type { Carousel } from "~/core/types/publications";

const props = defineProps<{
  carouselContent: Carousel[];
  layoutYellow?: boolean;
  redLayout?: boolean;
}>();

onBeforeMount(() => {
  const layoutElement = document.querySelector(".right-layout");
  if (layoutElement && props.layoutYellow) {
    layoutElement.classList.add("layout-yellow");
  }
  if (layoutElement && props.redLayout) {
    layoutElement.classList.add("layout-red");
  }
});
</script>

<template>
  <Carousel>
    <Slide v-for="carouselItem in carouselContent" :key="carouselItem.id">
      <div class="carousel__item">{{ carouselItem.id }}</div>
    </Slide>

    <template #addons>
      <Navigation>
        <template #next>
          <svg-icon
            name="arrow-right"
            class="!w-8 !h-8 fill-current stroke-current slick-next !text-inherit"
          />
        </template>
        <template #prev>
          <svg-icon
            name="arrow-right"
            class="!w-8 !h-8 -translate-y-1/2 !rotate-180 fill-current stroke-current !text-inherit"
          />
        </template>
      </Navigation>
      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="scss">
.carousel__viewport,
.carousel {
  height: 100%;
}

.carousel__pagination-button::after {
  width: 10px;
  height: 10px;
  margin: 0 0.5rem;
  background-color: #9aa3ab;
}

.carousel__pagination-button:hover::after {
  background-color: #fff;
}

.carousel__pagination-button--active::after {
  background-color: #fff;
}
</style>
