<script>
import NavigationLink from '@/components/NavigationLink'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavigationLink,
  },
  computed: {
    ...mapGetters({
      menu: 'menu/mainMenu',
      selectedEntry: 'menu/selectedMainEntry',
    }),
  },
  methods: {
    navigateTo(navigationEntry) {
      this.$emit('navigateTo', navigationEntry)
    },
  },
}
</script>
