<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'; // Import the useI18n composable
import type { CollapsibleContent } from "~/core/types/contentComponentsTypes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const { t } = useI18n();
const props = defineProps<{ content: CollapsibleContent[] }>();
const openItems = ref<string[]>([]);
const toggleButtonText = ref(t('openAll'));
let enableScrollTo: boolean = true;
let mountedHash = "";

watch(openItems, (newValue) => {
    toggleButtonText.value = newValue.length > 0 ? t('closeAll') : t('openAll');
});

const toggleAll = () => {
    if (openItems.value.length > 0) {
        enableScrollTo = false;
        window.location.hash = "";
        openItems.value = [];
        enableScrollTo = true;
    } else {
        enableScrollTo = false;
        openItems.value = props.content.map(item => item.slug);
        window.location.hash = "";
        enableScrollTo = true;
    }
};

const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}


const onAccordionItemClick = (id: string, hash: string) => {
    if (enableScrollTo) {
        scrollToElement(hash);
        setHash(hash);
    }
}

const setHash = (hash: string) => {
    history.pushState(null, '', `#${hash}`);
}

onMounted(() => {
    mountedHash = window.location.hash;
    if (mountedHash) {
        const id = mountedHash.replace('#', '');
        openItems.value = [id];
        setTimeout(() => {
            scrollToElement(id);
        }, 500);

    }
});
</script>

<template>
    <div class="w-full flex justify-end mb-7">
        <button class="relative text-lg font-semibold toggle" @click="toggleAll">{{ toggleButtonText }}</button>
    </div>
    <div>
        <Accordion type="multiple" v-model="openItems">
            <AccordionItem v-for="item in props.content" :value="item.slug" :key="item.slug" :id="item.slug">
                <AccordionTrigger
                    class="text-left font-semibold text-primary-blue hover:text-primary-gold text-2xl-fluid"
                    @click="onAccordionItemClick(item.id, item.slug)">
                    {{ item.title }}
                </AccordionTrigger>
                <AccordionContent>
                    <ContentComponents :content-component="item.content!" />
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
