<template>
  <a
    v-if="isLink"
    :href="route"
    class="leading-tight no-underline text-inherit"
    :class="linkClasses"
    :target="target"
  >
    {{ entry.label }}
  </a>
  <a
    v-else
    href="#"
    class="leading-tight no-underline text-inherit"
    :class="linkClasses"
    @click.prevent="navigateTo(entry)"
  >
    {{ entry.label }}
  </a>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { buildUrlFromPublication } from "~/utils/url";

const URITYPE = "uri";

export default {
  components: {
    // Fragment,
  },
  props: {
    entry: {
      required: true,
      type: Object,
    },
    mode: {
      type: String,
      required: false,
      default: "main",
      validator: (value) => {
        return ["main", "sub"].includes(value);
      },
    },
    mobilePath: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      selectedEntry: "menu/selectedMainEntry",
    }),
    ...mapState("menu", ["currentPath", "isElection"]),
    ...mapState("publications", ["publications"]),
    route() {
      if (!this.publications || this.entry.nodes.length > 0) {
        return "";
      }
      // External links have the type uri
      if (this.entry.type === URITYPE) {
        return this.entry.uri;
      }
      const publication = this.publications.find(
        (publication) =>
          publication.systemdata.documentId === parseInt(this.entry.documentId)
      );
      if (!publication) {
        return "";
      }
      let path = null;
      if (this.mode === "sub") {
        path = this.path.concat([this.entry]);
      } else {
        path = [this.entry];
      }
      let url = buildUrlFromPublication(publication, path, this.isElection);

      // If we are not in dev mode we want to add a trailing slash to prevent redirects
      if (process.env.NODE_ENV !== "development") {
        url += "/";
      }

      return url;
    },
    isLink() {
      return this.entry.nodes.length === 0;
    },
    path() {
      if (this.mobilePath === null) {
        return this.currentPath;
      }
      return this.mobilePath;
    },
    linkClasses() {
      let classes = "";
      if (this.mode === "main") {
        classes += "font-semibold text-navigation-fluid ";
      } else {
        // In the subnavigation we only want the fluid size on desktop
        classes += "lg:text-navigation-fluid ";
      }
      if (this.isLink) {
        if (this.entry === this.selectedEntry) {
          classes += "text-tertiary-yellow focus:text-tertiary-yellow";
        } else {
          classes += "text-inherit";
        }
      }

      return classes;
    },
    target() {
      if (this.entry.type !== URITYPE) {
        return "_self";
      }
      return this.entry.target;
    },
  },
  methods: {
    navigateTo(navigationEntry) {
      this.$emit("navigateTo", navigationEntry);
    },
  },
};
</script>
