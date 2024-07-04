<script>
// get footer stuff from store,
// get by order and iso code the correct element and generate the specific link
// 1.über uns
// 2. kontakt
// 3. rechliche hinweise
import { mapState } from "vuex";
import { buildUrlFromPublication } from "~/utils/url";

export default {
  computed: {
    ...mapState("menu", ["footerMenus"]),
    currentLocale() {
      return this.$i18n.locale;
    },
    currentMenu() {
      if (!this.footerMenus) {
        return;
      }
      const currentMenu = this.footerMenus.find((menu) => {
        if (menu.label.endsWith(this.currentLocale)) {
          if (this.isElection) {
            if (menu.label.includes("wahlen")) {
              return menu;
            }
          } else if (menu.label.includes("chch")) {
            return menu;
          }
        }
      });

      if (!currentMenu) {
        return;
      }

      return currentMenu;
    },
    // While displaying the links there are social icons between them.
    // To display all links expect the last one in the first section, we slice the last link out of the menu here.
    links() {
      if (!this.currentMenu) return;

      const nodes = this.currentMenu.nodes.slice(
        0,
        this.currentMenu.nodes.length - 1
      );
      return nodes.map((node, index) => {
        return {
          name: node.label,
          link: this.getUriFromNode(node),
          target: node.target ? node.target : "_self",
        };
      });
    },
    // While displaying the links there are social icons between them.
    // Get last link of menu, to display it after the social icons.
    lastLink() {
      if (!this.currentMenu || !this.currentMenu.nodes) return;
      if (!this.currentMenu.nodes.length) return; // no entries

      const node = this.currentMenu.nodes[this.currentMenu.nodes.length - 1];

      return {
        name: node.label,
        link: this.getUriFromNode(node),
        target: node.target ? node.target : "_self",
      };
    },
  },
  methods: {
    getUriFromNode(node) {
      if (node.type === "uri") return node.uri;
      return buildUrlFromPublication(node.document, [node]);
    },
  },
};
</script>
