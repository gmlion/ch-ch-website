<script lang="ts" setup>
import type { CollapsibleContent } from "~/core/types/contentComponents";
import { ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
const props = defineProps<{ content: CollapsibleContent[] }>();
</script>

<template>
  <div class="w-full px-4 pt-16">
    <div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
      <div v-for="(item, idx) in props.content" :key="item.id" :data-n-ids="`disclosure-${idx}`">
        <Disclosure>
          <DisclosureButton
              class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          >
            <span>{{ item.title }}</span>
            <div
                :class="open ? 'duration-200' : 'duration-200 rotate-180'"
                class="w-5 h-5 text-purple-500"
            >öp</div>
          </DisclosureButton>
          <DisclosurePanel
              class="panel transition-all opacity-0 duration-200 max-h-0 overflow-hidden"
              :class="open && 'max-h-16 opacity-100'"
              static
          >
            <div class="px-4 pt-4 pb-4 text-sm text-gray-500">
              {{ item.content }}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
</template>