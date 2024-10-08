<script lang="ts" setup>
import type { Tables } from '~/core/types/publicationsTypes';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'


const props = defineProps<{
    tables: Tables
}>();

</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <div class="grid grid-cols-2 overflow-scroll" v-for="heading in props.tables.header" :key="heading.id">


                    <TableHead class="text-lg text-primary-blue py-4 pl-4 text-left align-bottom border-b-2 border-primary-blue first:pl-0" v-if="heading.containers['header-row'].length > 0"
                        v-for="headerItem in heading.containers['header-row']">
                        <div>
                            {{ headerItem.containers["header-cell"][0].content?.text }}
                        </div>

                    </TableHead>
                </div>
            </TableRow>
        </TableHeader>
        <TableBody>
            <div v-for="items in props.tables.body" :key="items.id" class="grid grid-cols-2 overflow-scroll">
                <TableRow>
                    <TableCell>{{ items.containers["body-row"] }}</TableCell>
                </TableRow>
            </div>
        </TableBody>
    </Table>
</template>