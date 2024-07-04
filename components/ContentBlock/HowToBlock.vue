<template>
  <div ref="howToBlock">
    <component
      :is="getContentComponent(contentBlock)"
      v-for="contentBlock in headerData"
      :key="contentBlock.id"
      :content-data="contentBlock"
      class="mb-8"
    />
    <div v-for="(step, index) in steps" :key="`step-${index}`">
      <how-to-step
        :class="{ hidden: index !== currentStep }"
        :step="step"
        :step-index="index"
        :steps-count="steps.length"
        @nextStep="nextStep"
        @backStep="backStep"
      />
    </div>
  </div>
</template>

<script>
import { getPublicationById } from '@/utils/publication'
import ContentComponentMixin from '@/components/ContentComponentMixin'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  mixins: [ContentBlockMixin, ContentComponentMixin],
  inject: ['pageTitle'],
  async fetch() {
    try {
      const id = parseInt(
        this.contentData?.content?.howto?.params?.teaser?.reference?.id
      )
      const publication = await getPublicationById(id, this.$axios)
      this.howto = publication
      this.howToStructuredData = this.getStructuredData()
    } catch (err) {}
  },
  data() {
    return {
      currentStep: 0,
      howto: null,
      xDown: null,
      yDown: null,
      howToStructuredData: {},
    }
  },
  computed: {
    headerData() {
      return this.howto.content[0].containers.header
    },
    name() {
      return this.getHeader('title')?.content?.title
    },
    description() {
      return this.getHeader('p')?.content?.text
    },
    steps() {
      return this.howto?.content?.[0].containers.steps || []
    },
    image() {
      return this.getHeader('image')
    },
  },
  mounted() {
    this.$refs.howToBlock.addEventListener('touchstart', this.handleTouchStart)
    this.$refs.howToBlock.addEventListener('touchmove', this.handleTouchMove)
  },
  methods: {
    getHeader(key) {
      return this.headerData.find((entry) => {
        return entry.identifier.split('.').pop() === key
      })
    },
    nextStep() {
      if (this.currentStep === this.steps.length - 1) {
        this.currentStep = 0
      } else {
        this.currentStep++
      }
    },
    backStep() {
      if (this.currentStep === 0) {
        this.currentStep = this.steps.length - 1
      } else {
        this.currentStep--
      }
    },
    getTextFromBlock(block) {
      // Just return text
      if (block?.content?.text) {
        return block.content.text
      }

      // Build list html text
      let text = ''
      let closingTag = ''

      if (block.styles && block.styles['list-type'] === 'list--numbers') {
        text = '<ol>'
        closingTag = '</ol>'
      } else {
        text = '<ul>'
        closingTag = '</ul>'
      }

      try {
        block.containers.list.forEach((listItem) => {
          text += `<li>${listItem.content.text}</li>`
        })
        text += closingTag
      } catch (err) {
        const route = this.$router.fullPath
        // eslint-disable-next-line no-console
        console.warn(
          `There seems to be an incomplete how to block configuration in ${this.pageTitle()} / ${route}`,
          `error was ${err}`
        )
      }

      return text
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
    getStructuredData() {
      const steps = []
      if (!this.howto) return {}
      this.steps.forEach((step) => {
        const stepImage = step.containers.step.find((step) => {
          return step.identifier.split('.').pop() === 'image'
        })?.content.image
        const stepTitle = step.containers.step.find((step) => {
          return step.identifier.split('.').pop() === 'title'
        })?.content.title

        const texts = step.containers.step
          .filter((step) => {
            const element = step.identifier.split('.').pop()
            return element === 'p' || element === 'list'
          })
          .map((block) => this.getTextFromBlock(block))

        const stepJsonLd = {
          '@type': 'HowToStep',
          text: texts.join(' '),
        }

        if (stepTitle) {
          stepJsonLd.name = stepTitle
        }

        if (stepImage) {
          stepJsonLd.image = {
            '@type': 'ImageObject',
            url: stepImage.originalUrl,
            height: stepImage.height,
            width: stepImage.width,
          }
        }

        steps.push(stepJsonLd)
      })

      const jsonld = {
        '@context': 'http://schema.org',
        '@type': 'HowTo',
        name: this.name,
        step: steps,
      }
      if (this.description) {
        jsonld.description = this.description
      }
      if (this.image) {
        if (!this.image.content) {
          const path = this.$route.fullPath
          // eslint-disable-next-line no-console
          console.warn(
            `There's no image specified in the HowTo Block of ${this.pageTitle()} / ${path}`
          )
        } else {
          const imageContent = this.image.content.image
          jsonld.image = {
            '@type': 'ImageObject',
            url: imageContent.originalUrl,
            height: imageContent.height,
            width: imageContent.width,
          }
        }
      }
      return jsonld
    },
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify(this.howToStructuredData),
          type: 'application/ld+json',
        },
      ],
    }
  },
}
</script>
