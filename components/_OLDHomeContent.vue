<template>
  <div
    class="text-center"
    :class="{ 'cursor-pointer': !isOnMobile, ...sectionClasses }"
  >
    <!-- <vue-slick-carousel
      v-if="carouselEntries && carouselEntries.length"
      ref="carousel"
      v-bind="carouselSettings"
      dots-class="slick-dots slider-dots"
      @beforeChange="onSlideChange"
      @afterChange="onAfterChange"
    > -->
    <!-- <div v-else class="hidden before:hidden"> -->
    <!-- we need this or else the slot is empty -->
    <!-- </div> -->
    <!-- </template> -->
    <div
      v-for="carouselEntry in carouselEntries"
      :key="carouselEntry.id"
      :data-key="carouselEntry.id"
      class="px-4 pb-4 text-left lg:h-[65vh] md:px-12 md:pb-14 carousel-entry"
    >
      <carousel-content
        :key="`content-${carouselEntry.id}`"
        :content="carouselEntry"
      />
    </div>
    <!-- </vue-slick-carousel> -->
  </div>
</template>

<script>
// import VueSlickCarousel from "vue-slick-carousel/dist/vue-slick-carousel.umd.min.js";
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
import twConfig from "../tailwind.config";
import CarouselContent from "./HomeCarousel/CarouselContent.vue";

const SLIDE_TIME = 8000;

export default {
  name: "HomeContent",
  components: { CarouselContent },
  props: {
    homePublication: {
      type: Object,
      required: true,
    },
  },
  fetch() {
    // fetch the carousel entries
    if (!this.homePublication || !this.homePublication.content) {
      return [];
    }
    this.carouselEntries =
      this.homePublication.content[0].containers.right[0].containers.carousel;
  },
  data() {
    return {
      currentCarouselEntry: null,
      isOnMobile: false,
      ticked: false,
      carouselEntries: null,
    };
  },
  computed: {
    sectionClasses() {
      if (!this.currentCarouselEntry) {
        return {};
      }
      const color = this.currentCarouselEntry.style?.["carousel-content"];
      if (color === "bg-primary-yellow") {
        return { "slider-yellow": true };
      }
      return { "slider-red": true };
    },
    carouselSettings() {
      if (!this.isOnMobile) {
        return {
          autoplay: true,
          autoplaySpeed: SLIDE_TIME,
          infinite: false,
          speed: 500,
          arrows: true,
          dots: true,
        };
      } else {
        return {
          autoplay: false,
          arrows: false,
          dots: true,
          infinite: false,
        };
      }
    },
    isFirst() {
      // we intentionally return true at first, because then the arrows
      // won't be shown. They will be, as soon as this logic determines it
      if (!this.currentCarouselEntry) return true;

      return this.currentCarouselEntry.id === this.carouselEntries[0].id;
    },
    isLast() {
      // we intentionally return true at first, because then the arrows
      // won't be shown. They will be, as soon as this logic determines it
      if (!this.currentCarouselEntry) return true;

      return (
        this.currentCarouselEntry.id ===
        this.carouselEntries[this.carouselEntries.length - 1].id
      );
    },
  },
  mounted() {
    this.currentCarouselEntry = this.carouselEntries[0];
    this.$emit("slideChange", this.carouselEntries[0]);

    window.addEventListener("resize", this.determineMobilityProp);
    this.determineMobilityProp(); // fire it once

    // Render the deck slides late, to prevent them from being rendered
    // in the wrong position at the start
    this.$nextTick(() => {
      this.ticked = true;
    });
  },
  methods: {
    determineMobilityProp() {
      const isMobile =
        document.documentElement.clientWidth <
        parseInt(twConfig.theme.screens.lg);
      this.isOnMobile = isMobile;
    },
    // Help with the color transition
    onSlideChange(oldSlideIndex, newSlideIndex) {
      this.currentCarouselEntry = this.carouselEntries[newSlideIndex];
      const newSlide = this.carouselEntries[newSlideIndex];
      this.$emit("slideChange", newSlide);
    },
    /**
     * Restart the carousel after the last slide
     *
     * This is different than infinite, which appends the first slide
     * to the last
     */
    onAfterChange(slideIndex) {
      if (slideIndex === this.carouselEntries.length - 1) {
        if (!this.isOnMobile) {
          // restart the slide
          setTimeout(() => {
            this.$refs.carousel.goTo(0);
          }, SLIDE_TIME);
        }
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
:deep(.slider-dots) {
  & li {
    & button:before {
      @apply bg-gray-300;
      content: "";
      opacity: 1;
      width: 0.625rem;
      height: 0.625rem;
    }
  }
}

.carousel-entry {
  @apply flex flex-col !important;
}
</style>

<style lang="postcss">
.slider-red {
  & .slick-active {
    & button:before {
      @apply bg-primary-white !important;
    }
  }
}

.slider-yellow {
  & .slick-active {
    & button:before {
      @apply bg-primary-blue !important;
    }
  }
}

.slick-slider .slick-dots li button {
  width: 0.625rem;
  height: 0.625rem;

  &:focus {
    outline: auto 5px -webkit-focus-ring-color;
  }
}
</style>
