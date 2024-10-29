<script lang="ts" setup>
import type { Publication } from '~/core/types/publicationsTypes';
import { cantonListMapper } from './utils/cantonListUtils';

const props = defineProps<{
    cantonListPublication: Publication
}>()

const mappedCantons = cantonListMapper(props.cantonListPublication)
</script>

<template>
    <div>
        <ul class="flex gap-6 flex-wrap mb-8">
            <li class="canton--list-item" v-for="canton in mappedCantons">
                <a :href="canton.url" class="canton--entry" target="_blank">
                    {{ canton.canton }}
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.canton--list-item {
    width: fit-content;
    height: fit-content;
}
.canton--entry {
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    --tw-border-opacity: 1;
    border-color: rgba(1, 46, 90, var(--tw-border-opacity));
    text-align: center;
    text-decoration: none;
}

.canton--entry:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(1, 46, 90, var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
}
</style>