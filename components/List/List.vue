<script setup lang="ts">
import type {TypeList} from "~/core/types/publicationsTypes";

const props = defineProps<{
  list: TypeList[]
}>()
</script>

<template>
  <ul>
    <ListItem v-for="item in props.list" :key="item.id" :listItem="item.content.text"/>
  </ul>
</template>