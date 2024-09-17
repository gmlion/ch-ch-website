<script setup lang="ts">
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible'
import type {CollapsibleContent as TypeCollapsible} from "~/core/types/contentComponentsTypes";

const props = defineProps<{
  content: TypeCollapsible[]
}>()
const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger>
      <span class="flex gap-8 hover:text-tertiary-yellow items-center">
      <i>
        <svg-icon
            class="w-6 h-6"
            :class="isOpen ? 'transform rotate-180' : ''"
            name="arrow-down"
        />
      </i>
      <span class="text-lg font-semibold">
        {{ props.content[0].title }}
      </span>
</span>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="pt-10">
        <ContentComponents :content-component="props.content[0].content!"/>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>