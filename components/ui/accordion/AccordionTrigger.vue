<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-9 font-medium transition-all [&[data-state=open]>.icon-minus]:block [&[data-state=open]>.icon-plus]:hidden',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
<!--        <ChevronDown-->
<!--          class="h-4 w-4 shrink-0 transition-transform duration-200"-->
<!--        />-->
        <div class="icon-plus ">
          <svg-icon
              :title="$t('openAccordionIconTitle')"
              class="w-8 h-8 fill-current text-primary-gold"
              name="plus-big"
          />
        </div>
        <div class="icon-minus hidden">
          <svg-icon
              :title="$t('openAccordionIconTitle')"
              class="w-8 h-8 fill-current text-primary-gold"
              name="minus-big"
          />
        </div>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>