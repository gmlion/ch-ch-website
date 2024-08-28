<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const isOpen = ref(false)



const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'flex w-full items-center',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <svg-icon
          class="ml-2 w-4 h-4 text-primary-blue transition duration-100"
          name="caret-small-down"
          :class="{'rotate-180': isOpen}"
          :title="$t('languagePickerIconTitle')"
      />
    </SelectIcon>
  </SelectTrigger>
</template>