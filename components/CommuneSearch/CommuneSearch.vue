<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CommuneMetadata } from '~/core/types/publicationsTypes';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

const props = defineProps<{
    communesArray: CommuneMetadata[]
}>();

const searchValue = ref('');
const searchTerm = ref('');
let valueSet = ref(false);
let isOpen = ref(false);
let currentCommune = ref<CommuneMetadata | undefined>(undefined);

const setValue = (value: string) => {
    searchValue.value = value;
    searchTerm.value = value;
    valueSet.value = true; 
    isOpen.value = false; 
}

watch(searchValue, (newValue) => {
    if(newValue.length === 0) {
        valueSet.value = false;
    }
    currentCommune.value = props.communesArray.find((commune) => commune.commune === newValue);
});


watch(searchTerm, (newValue) => {
    if(!valueSet.value) {
        isOpen.value = newValue.length > 0;
    }
});

</script>


<template>
    <Command v-bind:model-value="searchValue" v-model:search-term="searchTerm" :open="isOpen" class="max-w-md border-primary-blue border" >
        <CommandInput 
            :placeholder="$t('communePlaceholder')" 
            :aria-label="$t('communeSearchAria')" 
            v-on:click="isOpen = true"
            v-on:focus="isOpen = true"
            class="text-lg"
        />
        <CommandList>
            <CommandEmpty>{{ $t('noResults') }}</CommandEmpty>
            <CommandGroup :heading="$t('communePlaceholder')">
                <CommandItem 
                    v-for="commune in props.communesArray" 
                    :key="commune.commune"
                    :value="commune.commune"
                    v-on:select="setValue(commune.commune)"
                    class="text-lg"
                >
                    {{ commune.commune }}
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
    <div v-if="currentCommune" class="mt-8 richtext">
        <span class="block">{{ currentCommune.agency }}</span>
        <span v-if="currentCommune.streetAddress" class="block">
        {{ currentCommune.streetAddress }} {{ currentCommune.streetNumber }}
      </span>
      <span class="block">
        {{ currentCommune.postalcode }} {{ currentCommune.commune }}
      </span>
      <a v-if="currentCommune.email" :href="`mailto:${currentCommune.email}`" class="block text-lg">
        {{ currentCommune.email }}
      </a>
      <a
        v-if="currentCommune.phoneNumber"
        :href="`tel:${currentCommune.phoneNumber}`"
        class="block text-lg"
      >
        {{ currentCommune.phoneNumber }}
      </a>
      <a
        v-if="currentCommune.website"
        :href="currentCommune.website"
        target="_blank"
        class="block text-lg"
      >
        {{ currentCommune.website }}
      </a>

    </div>
</template>

<style lang="scss">
.data-\[highlighted\]\:text-accent-foreground[data-highlighted] {
    @apply text-primary-white
}

.data-\[highlighted\]\:bg-accent-background[data-highlighted] {
    @apply bg-primary-blue;
}

.data-\[highlighted\]\:bg-accent[data-highlighted] {
    @apply bg-primary-blue;
}
</style>