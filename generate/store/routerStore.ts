import type { Menu } from "../types/routing";

export const useBuildContentStore = defineStore("buildContentStore", {
  state: () => ({
    lastBuildContent: [] as Menu[],
  }),
  actions: {
    getLastBuildContent() {
      return this.lastBuildContent as Menu[];
    },
    setLastBuildContent(newLastBuildContent: Menu[]) {
      return (this.lastBuildContent = newLastBuildContent);
    },
  },
});
