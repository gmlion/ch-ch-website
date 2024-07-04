<template>
  <div>
    <searchable-dropdown
      class="mb-8"
      :items="communes"
      :placeholder="$t('communePlaceholder')"
      :aria-label="$t('communeSearchAria')"
      @selected="updateSelectedCommune"
    />
    <div v-if="selectedCommune !== null">
      <span class="block">{{ metadata.agency }}</span>
      <span v-if="metadata.streetAddress" class="block">
        {{ metadata.streetAddress }} {{ metadata.streetNumber }}
      </span>
      <span class="block">
        {{ metadata.postalcode }} {{ metadata.commune }}
      </span>
      <a v-if="metadata.email" :href="`mailto:${metadata.email}`" class="block">
        {{ metadata.email }}
      </a>
      <a
        v-if="metadata.phoneNumber"
        :href="`tel:${metadata.phoneNumber}`"
        class="block"
      >
        {{ metadata.phoneNumber }}
      </a>
      <a
        v-if="metadata.website"
        :href="metadata.website"
        target="_blank"
        class="block"
      >
        {{ metadata.website }}
      </a>
    </div>
  </div>
</template>

<script>
import SearchableDropdown from '@/components/SearchableDropdown.vue'
import { getAllPublications } from '@/utils/publication'
import ContentBlockMixin from './ContentBlockMixin'

export default {
  components: { SearchableDropdown },
  mixins: [ContentBlockMixin],
  async fetch() {
    try {
      const allPublications = await getAllPublications(this.$axios, {
        contentTypes: 'commune',
      })
      const communes = allPublications
        .map((commune) => {
          return {
            metadata: {
              agency: commune.metadata.agency,
              streetAddress: commune.metadata.streetAddress,
              streetNumber: commune.metadata.streetNumber,
              postalcode: commune.metadata.postalcode,
              commune: commune.metadata.commune,
              email: commune.metadata.email,
              phoneNumber: commune.metadata.phoneNumber,
              website: commune.metadata.website,
            },
          }
        })
        .reverse()
      this.communes = communes
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  data() {
    return {
      selectedCommune: null,
      communes: [],
    }
  },
  computed: {
    metadata() {
      return this.selectedCommune.metadata
    },
  },
  methods: {
    updateSelectedCommune(commune) {
      this.selectedCommune = commune
    },
  },
}
</script>
