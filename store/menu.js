export const state = () => ({
  menu: 0,
  // sometimes we need the "other" menu too
  // example is the search. The other menu is "wahlen-*" in case of chch-*
  // and, reversely, "chch-*" in case of "wahlen-*"
  otherMenu: null,
  footerMenus: [],
  /**
   * Return the current path we're in
   */
  currentPath: [],
  isElection: false,
})

export const mutations = {
  setIsElection(state, isElection) {
    state.isElection = isElection
  },
  setMenu(state, menu) {
    state.menu = menu
  },
  setOtherMenu(state, menu) {
    state.otherMenu = menu
  },
  setFooterMenus(state, footerMenus) {
    state.footerMenus = footerMenus
  },
  /**
   * When navigating further down, we add the entry to the currentPath
   * This will provide useful when implementing the breadcrumb
   */
  push(state, { navigationEntry, menuIndex }) {
    if (menuIndex !== undefined) {
      if (!state.menu.nodes[menuIndex].children) {
        state.menu.nodes[menuIndex].children = []
      }
      state.menu.nodes[menuIndex].children.push(navigationEntry)
    } else {
      state.currentPath.push(navigationEntry)
    }
  },
  /**
   * Pop an entry from the path, that is, go one level back/up
   */
  pop(state, menuIndex) {
    if (menuIndex !== undefined) {
      state.menu.nodes[menuIndex].children.pop()
    } else {
      state.currentPath.pop()
    }
  },
  /**
   * Start the currentPath. This is done with a main navigation entry
   */
  startPath(state, entry) {
    state.currentPath = [entry]
  },
  clearPath(state) {
    state.currentPath = []
  },
  /**
   * Go back to a certain entry
   */
  goBackToEntry(state, entry) {
    const index = state.currentPath.indexOf(entry)
    state.currentPath = state.currentPath.slice(0, index + 1)
  },

  setCurrentPath(state, currentPath) {
    state.currentPath = currentPath
  },

  collapseEntry(state, entryIndex) {
    state.menu.nodes[entryIndex].isExpanded = false
  },

  expandEntry(state, entryIndex) {
    state.menu.nodes[entryIndex].isExpanded = true
  },
}

export const getters = {
  mainMenu(state) {
    if (!state.menu) return {}
    return state.menu.nodes
  },
  /**
   * Return the last node of the path
   */
  leaf(state) {
    const len = state.currentPath.length
    return state.currentPath[len - 1]
  },
  selectedMainEntry(state) {
    if (!state.currentPath.length) return {}

    return state.currentPath[0]
  },
}
