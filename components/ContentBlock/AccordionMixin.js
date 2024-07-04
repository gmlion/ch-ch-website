import AccordionEventBus from '@/utils/accordionEventBus'

export default {
  data() {
    return {
      showOpenAll: true,
    }
  },
  methods: {
    toggleAll() {
      if (this.showOpenAll) {
        AccordionEventBus.$emit('openAll')
        this.showOpenAll = false
      } else {
        AccordionEventBus.$emit('closeAll')
        this.showOpenAll = true
      }
    },
    checkAccordions() {
      const openedAccordions = document.querySelectorAll(
        '.accordion-item h3 button[aria-expanded="true"]'
      ).length
      const closedAccordions = document.querySelectorAll(
        '.accordion-item h3 button:not([aria-expanded="true"])'
      ).length

      // If all are closed and our showOpenAll is false we want to show all
      if (openedAccordions === 0 && !this.showOpenAll) {
        this.showOpenAll = true
      }
      // If all are opened and our showOpenAll is true we want to hide all
      if (closedAccordions === 0 && this.showOpenAll) {
        this.showOpenAll = false
      }
    },
  },
  mounted() {
    if (!this.contentData.isFirst) {
      return
    }
    AccordionEventBus.$on('open', this.checkAccordions)
  },
}
