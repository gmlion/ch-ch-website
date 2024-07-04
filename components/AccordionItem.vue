<template>
  <div
    class="w-full accordion-item"
    :class="{
      'accordion-item--no-border accordion-item--small w-[90%]':
        isInnerAccordion,
    }"
  >
    <component :is="isInnerAccordion ? 'h3' : 'h2'">
      <button
        :id="id"
        type="button"
        :aria-expanded="isOpen"
        class="flex items-center w-full btn--bare hover:text-primary-gold"
        :aria-controls="`sect-${id}`"
        aria-disabled="true"
        :class="{ 'justify-between': !isInnerAccordion }"
        @click="toggleOpen"
      >
        <span v-if="isInnerAccordion" class="mr-16 h1">
          <svg-icon
            name="caret-big-down"
            class="w-8 h-8"
            :class="{ 'rotate-180 transform': isOpen }"
          />
        </span>
        <span
          class="mr-6 text-left h2"
          :class="{ 'text-lg': isInnerAccordion }"
        >
          <slot name="Title" />
        </span>
        <span v-if="!isInnerAccordion" class="h1">
          <svg-icon
            :title="$t('openAccordionIconTitle')"
            class="w-8 h-8 fill-current text-primary-gold"
            :name="isOpen ? 'minus-big' : 'plus-big'"
          />
        </span>
      </button>
    </component>
    <transition name="fade">
      <div
        v-show="isOpen"
        :id="`sect-${id}`"
        role="region"
        :aria-labelledby="id"
        class="pt-10"
      >
        <div class="text-left">
          <!-- Variable content within section, may include any type of markup or interactive widgets. -->
          <slot name="Body" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import AccordionEventBus from '@/utils/accordionEventBus'

export default {
  name: "AccordeonItem",
  props: {
    initiallyOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFaq: {
      type: Boolean,
      required: false,
      default: false,
    },
    isInsideOther: {
      type: Boolean,
      required: false,
      default: false,
    },
    accordionAnchorHash: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: this.initiallyOpen,
      id: "",
    };
  },
  computed: {
    isInnerAccordion() {
      return this.isFaq && this.isInsideOther;
    },
  },
  watch: {
    $route(newVal) {
      this.openAccordionWithAnchor(newVal);
    },
  },
  mounted() {
    this.id = "AccordionId" + Math.random().toString(36).slice(-6);
    // AccordionEventBus.$on('openAll', () => {
    //   this.isOpen = true
    // })
    // AccordionEventBus.$on('closeAll', () => {
    //   this.isOpen = false
    // })
    // AccordionEventBus.$on('openParentAccordion', this.openParentAccordion)
    // this.$nextTick(() => {
    //   this.openAccordionWithAnchor(this.$route)
    // })
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;

      // next tick so the accordion is already opened
      this.$nextTick(() => {
        // AccordionEventBus.$emit('open')
        // AccordionEventBus.$emit('setIsAccordionOpen')
      });

      const url = new URL(window.location);
      let newUrl = url.href;
      // only when opening we want the hash. otherwise, we want to remove (or not add) it
      const replacementHash = this.isOpen ? this.accordionAnchorHash : "";

      if (url.hash) {
        newUrl = newUrl.replace(url.hash, "#" + replacementHash);
      } else if (url.href.includes("#")) {
        // url already has a # at the end. we only need to append the
        // slug
        newUrl += replacementHash;
      } else {
        // nothing yet, append with hash
        newUrl += "#" + replacementHash;
      }
      window.location.replace(newUrl);
    },
    openParentAccordion(element, accordionId) {
      if (this.$el.contains(element)) {
        this.isOpen = true;
        this.$nextTick(() => {
          document.getElementById(accordionId).scrollIntoView();
        });
      }
    },
    // If the accordion is routed via a anchor link it needs to be open.
    openAccordionWithAnchor(route) {
      let routeHash = null;
      if (route.hash) {
        routeHash = route.hash.split("#")[1];
      }
      if (routeHash === this.accordionAnchorHash) {
        this.isOpen = true;
        // AccordionEventBus.$emit('openParentAccordion', this.$el, this.id)
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0px, -20px) rotate(0deg) !important;
  opacity: 0;
}
</style>
