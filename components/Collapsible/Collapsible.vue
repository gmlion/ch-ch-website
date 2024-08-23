<script lang="ts" setup>
import type {CollapsibleContent} from "~/core/types/contentComponents";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'

const props = defineProps<{ content: CollapsibleContent[] }>();
</script>

<template>
  <div>
    <Accordion type="single" collapsible>

      <AccordionItem v-for="item in props.content" :value="item.id" :key="item.id">
        <AccordionTrigger class=" text-left font-semibold text-primary-blue hover:text-primary-gold text-2xl-fluid">{{ item.title }}</AccordionTrigger>
        <AccordionContent>
          <div class="richtext" v-html="item.content.content"></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>