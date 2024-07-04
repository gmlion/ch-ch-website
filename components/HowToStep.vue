<template>
  <div>
    <image-block v-if="image" :content-data="image" itemprop="image" />
    <div class="flex flex-row mt-8 !lg:flex-wrap">
      <span class="w-20 mr-8 text-2xl font-semibold !lg:mr-0 !lg:flex-50%">
        {{ stepIndex + 1 }}/{{ stepsCount }}
      </span>
      <div class="flex-1 !lg:order-3 !lg:mt-2">
        <component
          :is="getContentComponent(contentBlock)"
          v-for="contentBlock in contentBlocks"
          :key="contentBlock.id"
          class="mb-8"
          :content-data="contentBlock"
        />
      </div>

      <div class="w-20 ml-8 text-right !lg:flex-50% !lg:ml-0">
        <button
          class="!lg:mr-4 arrow-button"
          :disabled="disableBack"
          :aria-label="$t('backStep')"
          @click="backStep"
        >
          <svg-icon name="caret-big-down" class="w-8 h-8 transform rotate-90" />
        </button>
        <button
          :disabled="disableNext"
          class="arrow-button"
          :aria-label="$t('nextStep')"
          @click="nextStep"
        >
          <svg-icon
            name="caret-big-down"
            class="w-8 h-8 transform -rotate-90"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ContentComponentMixin from '@/components/ContentComponentMixin'

export default {
  mixins: [ContentComponentMixin],
  props: {
    step: {
      type: Object,
      required: true,
    },
    stepsCount: {
      type: Number,
      required: true,
    },
    stepIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    image() {
      const images = this.step.containers.step.filter((step) => {
        return step.identifier.split('.').pop() === 'image'
      })

      if (images.length) {
        // if there are multiple images, return the first one
        // they shouldn't be adding mulitplie images!
        return images.pop()
      }

      return null
    },
    contentBlocks() {
      // filter away the images, they're handled separately
      return this.step.containers.step.filter((step) => {
        return step.identifier.split('.').pop() !== 'image'
      })
    },
    disableBack() {
      return this.stepIndex === 0
    },
    disableNext() {
      return this.stepIndex === this.stepsCount - 1
    },
  },
  methods: {
    nextStep() {
      this.$emit('nextStep')
    },
    backStep() {
      this.$emit('backStep')
    },
  },
}
</script>

<style lang="postcss" scoped>
.arrow-button {
  @apply hover:text-secondary-yellow disabled:text-gray-300 disabled:cursor-not-allowed;
}
</style>
