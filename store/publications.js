export const state = () => ({
  publications: [],
  availableLanguages: null,
  faqs: [],
  categories: [],
})

export const mutations = {
  setPublications(state, publications) {
    state.publications = publications
  },
  setAvailableLanguages(state, availableLanguages) {
    state.availableLanguages = availableLanguages
  },
  setFAQs(state, faqs) {
    state.faqs = faqs
  },
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const getters = {}
