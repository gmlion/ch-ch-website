<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
import { buildUrlFromPublication } from "~/utils/url";

const URITYPE = "uri";

export default defineComponent({
  props: {
    entry: {
      required: true,
      type: Object as () => {
        // Define the structure of `entry` as needed
        label: string;
        type: string;
        uri?: string;
        documentId?: string;
        nodes: any[];
      },
    },
    mode: {
      type: String as () => "main" | "sub",
      required: false,
      default: "main",
    },
    mobilePath: {
      type: Array as () => any[],
      default: null,
    },
  },
  setup(props, { emit }) {
    const { entry, mode, mobilePath } = toRefs(props);

    const currentPath = computed(() => store.state.menu.currentPath);
    const isElection = computed(() => store.state.menu.isElection);
    const publications = computed(() => store.state.publications.publications);

    const route = computed(() => {
      if (!publications.value || entry.value.nodes.length > 0) {
        return "";
      }
      if (entry.value.type === URITYPE) {
        return entry.value.uri ?? "";
      }
      const publication = publications.value.find(
        (pub) =>
          pub.systemdata.documentId ===
          parseInt(entry.value.documentId || "", 10)
      );
      if (!publication) {
        return "";
      }
      const path =
        mode.value === "sub"
          ? [...currentPath.value, entry.value]
          : [entry.value];
      let url = buildUrlFromPublication(publication, path, isElection.value);

      if (process.env.NODE_ENV !== "development") {
        url += "/";
      }

      return url;
    });

    const isLink = computed(() => entry.value.nodes.length === 0);

    const linkClasses = computed(() => {
      let classes = "";
      if (mode.value === "main") {
        classes += "font-semibold text-navigation-fluid ";
      } else {
        classes += "lg:text-navigation-fluid ";
      }
      if (isLink.value) {
        if (entry.value === selectedEntry.value) {
          classes += "text-tertiary-yellow focus:text-tertiary-yellow";
        } else {
          classes += "text-inherit";
        }
      }

      return classes;
    });

    const target = computed(() => {
      return entry.value.type !== URITYPE
        ? "_self"
        : entry.value.target || "_self";
    });

    const navigateTo = (navigationEntry: any) => {
      emit("navigateTo", navigationEntry);
    };

    return {
      route,
      isLink,
      linkClasses,
      target,
      navigateTo,
    };
  },
});
</script>

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
