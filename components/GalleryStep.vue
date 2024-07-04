<template>
  <div>
    <component
      :is="getContentComponent(content)"
      :key="content.id"
      :content-data="content"
      class="mb-8"
    />
    <div class="flex items-center justify-between">
      <span class="w-20 mr-8 text-2xl font-semibold !lg:mr-0 !lg:flex-50%">
        {{ stepIndex + 1 }}/{{ stepsCount }}
      </span>
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
    content: {
      type: Object,
      required: true,
    },
    stepIndex: {
      type: Number,
      required: true,
    },
    stepsCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
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
