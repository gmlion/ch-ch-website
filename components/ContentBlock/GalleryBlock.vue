<template>
  <div ref="galleryBlock">
    <div v-for="(step, index) in bodyData" :key="`step-${index}`">
      <gallery-step
        :class="{ hidden: index !== currentStep }"
        :content="step"
        :step-index="index"
        :steps-count="bodyData.length"
        @nextStep="nextStep"
        @backStep="backStep"
      />
    </div>
  </div>
</template>

<script>
import { getPublicationById } from '@/utils/publication'
import GalleryStep from '@/components/GalleryStep.vue'
import ContentComponentMixin from '@/components/ContentComponentMixin'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  components: {
    GalleryStep,
  },
  mixins: [ContentBlockMixin, ContentComponentMixin],
  inject: ['pageTitle'],
  async fetch() {
    try {
      this.id = parseInt(
        this.contentData.content.gallery?.params?.teaser?.reference.id
      )

      const publication = await getPublicationById(this.id, this.$axios)
      this.gallery = publication
    } catch (err) {}
  },
  data() {
    return {
      currentStep: 0,
      id: null,
      gallery: null,
      xDown: null,
      yDown: null,
    }
  },
  computed: {
    bodyData() {
      return this.gallery?.content[0].containers.body[0]?.containers?.gallery
    },
  },
  mounted() {
    this.$refs.galleryBlock.addEventListener(
      'touchstart',
      this.handleTouchStart
    )
    this.$refs.galleryBlock.addEventListener('touchmove', this.handleTouchMove)
    if (this.$attrs['is-inside-accordion']) {
      this.$refs.galleryBlock.classList.add('gallery-in--accordion')
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep === this.bodyData.length - 1) {
        this.currentStep = 0
      } else {
        this.currentStep++
      }
    },
    backStep() {
      if (this.currentStep === 0) {
        this.currentStep = this.bodyData.length - 1
      } else {
        this.currentStep--
      }
    },
    getTouches(evt) {
      return evt.touches || evt.originalEvent.touches
    },
    handleTouchStart(evt) {
      const firstTouch = this.getTouches(evt)[0]
      this.xDown = firstTouch.clientX
      this.yDown = firstTouch.clientY
    },
    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return
      }

      const xUp = evt.touches[0].clientX
      const yUp = evt.touches[0].clientY

      const xDiff = this.xDown - xUp
      const yDiff = this.yDown - yUp

      const swipeDiff = 80

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > swipeDiff) {
          // right swipe
          this.nextStep()
          this.xDown = null
          this.yDown = null
        } else if (xDiff < -swipeDiff) {
          // left swipe
          this.backStep()
          this.xDown = null
          this.yDown = null
        }
      }
    },
  },
}
</script>
<style lang="postcss">
.gallery-in--accordion {
  width: 85%;
}
</style>
