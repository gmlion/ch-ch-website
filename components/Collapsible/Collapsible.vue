<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';  // Import the useI18n composable
import type { CollapsibleContent } from "~/core/types/contentComponents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const { t } = useI18n();
const props = defineProps<{ content: CollapsibleContent[] }>();
const openItems = ref<string[]>([]);
const toggleButtonText = ref(t('openAll'));

watch(openItems, (newValue) => {
  toggleButtonText.value = newValue.length > 0 ? t('closeAll') : t('openAll');
});

const toggleAll = () => {
  if (openItems.value.length > 0) {
    openItems.value = [];
  } else {
    openItems.value = props.content.map(item => item.id);
  }
};
</script>

<template>
  <div class="w-full flex justify-end mb-7">
  <button class="relative text-lg font-semibold toggle" @click="toggleAll">{{ toggleButtonText }}</button>
  </div>
  <div>
    <Accordion type="multiple" v-model="openItems">
      <AccordionItem
          v-for="item in props.content"
          :value="item.id"
          :key="item.id"
      >
        <AccordionTrigger
            class="text-left font-semibold text-primary-blue hover:text-primary-gold text-2xl-fluid">
          {{ item.title }}
        </AccordionTrigger>
        <AccordionContent>
          <div class="richtext" v-html="item.content.content"></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style lang="scss" scoped>
.toggle {
  &:after {
    @apply bg-tertiary-yellow;
    @apply absolute bottom-[-3px] left-0;
    content: '';
    width: 100%;
    height: 2px;
  }
}
</style>