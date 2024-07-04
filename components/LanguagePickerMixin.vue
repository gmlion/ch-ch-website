<script>
import { mapState } from 'vuex'
import { electionSlugs } from '../utils/url'

export default {
  computed: {
    ...mapState('publications', ['availableLanguages']),
    availableLocales() {
      return this.$i18n.locales
    },
  },
  methods: {
    changeLocale(code) {
      // If availableLanauges is null we are not on an detail page
      if (this.availableLanguages === null) {
        // This will not work for the detail pages because the detail pages have different urls in the other languages
        // Will figure out how to handle it when we implemented the detail pages
        const currentPath = this.$route.path.toLowerCase()
        const oldLocale = this.$i18n.locale.toLowerCase()

        let newPath = ''
        // If the current path contains the old language just replace it
        // otherwise add the new locale to the path
        if (currentPath.includes(oldLocale)) {
          newPath = currentPath.replace(oldLocale, code)
          // Include query if existing
          if (this.$route.query.q) {
            newPath += `?q=${this.$route.query.q}`
          }
        } else {
          newPath = code + currentPath
        }

        if (currentPath.includes(electionSlugs[oldLocale])) {
          newPath = newPath.replace(
            electionSlugs[oldLocale],
            electionSlugs[code]
          )
        }

        window.location = newPath
      } else {
        this.availableLanguages.forEach((language) => {
          if (language.locale === code) {
            window.location.pathname = language.route
          }
        })
      }
    },
    isNotAvailable(locale) {
      // If availablelanguages is null we are not on an detail page
      if (this.availableLanguages === null) {
        return false
      }
      if (locale === this.$i18n.locale) {
        return false
      }
      return !this.availableLanguages.some(
        (language) => language.locale === locale
      )
    },
  },
}
</script>
