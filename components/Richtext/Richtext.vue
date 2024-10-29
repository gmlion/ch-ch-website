<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import type { RichtextIncludingPublicationLink } from '~/core/types/contentComponentsTypes';

const props = defineProps<{
    richtextComponent: RichtextIncludingPublicationLink
}>()

// Ref for the div with v-html content
const richtextContainer = ref<HTMLElement | null>(null);
const showCantonLink = ref<boolean>(false)
onMounted(() => {
    // Watch for changes in richtextComponent.cantonLinkData
    watch(() => props.richtextComponent.cantonLinkData, (newData) => {
        if (newData && richtextContainer.value) {
            // Search for anchor with specific attribute
            const anchor = richtextContainer.value.querySelector('a[data-li-document-ref]') as HTMLElement | null;
            if (anchor) {
                // Add a click event listener
                anchor.addEventListener('click', (e) => {
                    e.preventDefault()
                    showCantonLink.value = true
                });
            }
        }
    }, { immediate: true });
});
</script>

<template>
    <div ref="richtextContainer" v-html="props.richtextComponent.text" class="richtext text-lg mb-8"></div>
    <div v-if="props.richtextComponent.cantonLinkData">
        <div v-if="showCantonLink">
            <CantonList :canton-list-publication="props.richtextComponent.cantonLinkData" />
        </div>
    </div>
</template>
