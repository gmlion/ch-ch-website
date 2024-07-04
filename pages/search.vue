<template>
  <colored-layout
    left-color="yellow"
    right-color="white"
    division-mode="fifths"
    :show-right="true"
    :is-footer-hidden="true"
  >
    <template slot="side">
      <aside>
        <div
          class="sticky top-[50px] flex flex-col justify-between lg:h-[60vh]"
        >
          <div>
            <h2 class="mb-12 text-3xl lg:text-5xl">{{ $t('search') }}</h2>
            <div class="h-full mb-6">
              <search-input :initial-value="searchText" />
            </div>
          </div>
        </div>
      </aside>
      <!-- Use 60% of the screen height -->

      <!-- Bottom of 170px because of the footer -->
      <all-topic-link
        class="!lg:hidden fixed bottom-[170px] hover:text-gray-600"
      />
    </template>

    <search-results
      slot="main"
      :query="searchText"
      :search-results="searchResults"
      :is-searching="isSearching"
    />
  </colored-layout>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import AllTopicLink from '@/components/AllTopicLink.vue'
import { getAllPublications } from '@/utils/publication'
import { mapState } from 'vuex'
import {
  buildUrlFromPath,
  buildUrlFromTitle,
  getFooterMenus,
} from '../utils/url'

export default {
  components: {
    SearchInput,
    AllTopicLink,
  },
  async asyncData({ $axios, payload, store, app }) {
    let menus = []
    if (payload) {
      menus = payload.menus
      const footerMenus = getFooterMenus(payload.menus, payload.publications)
      store.commit('menu/setFooterMenus', footerMenus)
    } else {
      const publications = await getAllPublications($axios.$get)
      const menusData = (await $axios.get('/menus')).data
      menus = menusData
      if (menus) {
        const footerMenus = getFooterMenus(menus, publications)
        store.commit('menu/setFooterMenus', footerMenus)
      }
    }

    let menuForLanguage = null
    let otherMenuForLanguage = null
    // Get the menu by the current language
    menus.forEach((menu) => {
      // Our naming is chch-${LANGUAGE_CODE}
      if (menu.label === 'chch-' + app.i18n.locale) {
        menuForLanguage = menu
      }

      if (menu.label === 'wahlen-' + app.i18n.locale) {
        otherMenuForLanguage = menu
      }
    })
    // Default to first entry
    if (!menuForLanguage) {
      menuForLanguage = menus[0]
    }
    store.commit('menu/setMenu', menuForLanguage)
    store.commit('menu/setOtherMenu', otherMenuForLanguage)
  },
  data() {
    return {
      searchResults: [],
      isSearching: true,
    }
  },
  computed: {
    ...mapState('menu', ['menu', 'otherMenu']),
    searchText() {
      if (!this.$route.query.q) {
        return ''
      }
      return this.$route.query.q
    },
  },
  async mounted() {
    this.isSearching = true
    if (this.searchText) {
      try {
        const searchResults = await this.$axios.$get(
          this.$config.searchUrl +
            `ne/search?lang=${this.$i18n.localeProperties.code}&q=${this.searchText}`
        )
        for (const searchResult of searchResults) {
          this.searchResults.push({
            id: searchResult.id,
            title: searchResult.metadata.title,
            text: searchResult.metadata.description,
            image: searchResult.metadata.teaserImage,
            lang: searchResult.lang,
          })
        }

        this.buildUrls()
        this.isSearching = false
      } catch {
        this.searchResults = []
        this.isSearching = false
      }
    }
  },
  methods: {
    buildUrls() {
      const crawlMenu = (nodes, path, isElection) => {
        for (const entry of nodes) {
          // Function because we only need to execute it in the else state
          const documentInResults = () =>
            this.searchResults.some(
              (result) => result.id === parseInt(entry.documentId)
            )
          if (entry.nodes && entry.nodes.length > 0) {
            crawlMenu(entry.nodes, path.concat([entry]), isElection)
          } else if (documentInResults()) {
            const searchResult = this.searchResults.find(
              (result) => result.id === parseInt(entry.documentId)
            )
            searchResult.path = path.concat([entry])
            const url = buildUrlFromPath(
              searchResult.lang,
              path.concat([entry]),
              isElection
            )
            searchResult.url = url
            searchResult.isElection = isElection
          }
        }
      }
      // crawl the other menu first. In case we find the entry
      // in both menues, then the second crawl overrides the first
      crawlMenu(this.otherMenu.nodes, [], true) // other is election
      crawlMenu(this.menu.nodes, [], false)

      // Set url for results that are not linked in the menu
      this.searchResults.forEach((result) => {
        if (!result.url) {
          result.url = buildUrlFromTitle(
            result.lang,
            result.title,
            result.isElection
          )
        }
      })
    },
  },
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      title: 'ch-ch',
    }
  },
}
</script>
