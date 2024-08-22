<script lang="ts" setup>
import type {CollapsibleContent} from "~/core/types/contentComponents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
const props = defineProps<{ content: CollapsibleContent[] }>();
</script>

<template>
  <div>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>