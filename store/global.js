export const state = () => ({
  isSearchOpen: false,
})

export const mutations = {
  toggleSearch(state) {
    state.isSearchOpen = !state.isSearchOpen
  },
}

export const getters = {}
