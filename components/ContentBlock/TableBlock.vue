<template>
  <div class="overflow-y-auto">
    <table class="w-full">
      <!-- eslint-disable-next-line vue/no-v-html-->
      <caption v-if="caption" v-html="caption" />
      <thead>
        <tr v-for="row in headerRows" :key="row">
          <th
            v-for="cell in getHeaderCells(row)"
            :key="cell.id"
            class="py-4 pl-4 text-left align-bottom border-b-2 border-primary-blue first:pl-0"
          >
            <component :is="getContentComponent(cell)" :content-data="cell" />
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="row in bodyRows" :key="row">
          <td
            v-for="cell in getBodyCells(row)"
            :key="cell.id"
            class="py-4 pl-4 align-baseline border-b border-primary-blue first:pl-0"
          >
            <component
              :is="getContentComponent(cellComponent)"
              v-for="cellComponent in cell"
              :key="cellComponent.id"
              :content-data="cellComponent"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ContentComponentMixin from '@/components/ContentComponentMixin'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  filters: {
    strip(value) {
      return value.replace(/(<([^>]+)>)/gi, '')
    },
  },
  mixins: [ContentBlockMixin, ContentComponentMixin],
  computed: {
    headerRows() {
      return this.contentData.containers.header
    },
    bodyRows() {
      return this.contentData.containers.body
    },
    caption() {
      const text = this.contentData.content?.caption || ''

      // cut away new lines at the end
      return text.replace(/<br\s?\/?>$/, '')
    },
  },
  methods: {
    getBodyCells(row) {
      return row.containers['body-row']
        .filter((cell) => cell.containers['body-cell'])
        .map((cell) => {
          return cell.containers['body-cell']
        })
    },
    getHeaderCells(row) {
      return row.containers['header-row']
        .filter((cell) => cell.containers['header-cell'])
        .map((cell) => {
          return cell.containers['header-cell'][0]
        })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
