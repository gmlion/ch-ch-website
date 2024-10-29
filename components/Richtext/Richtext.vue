<script lang="ts" setup>
import type { BodyComponent, RichtextContent, RichtextIncludingPublicationLink } from '~/core/types/contentComponentsTypes';

const props = defineProps<{
    richtextComponent: RichtextIncludingPublicationLink
}>()



</script>

<template>
    <div v-html="props.richtextComponent.text">
    </div>
    <div v-if="richtextComponent.cantonLinkData">
        {{ richtextComponent.cantonLinkData }}
    </div>
</template>
