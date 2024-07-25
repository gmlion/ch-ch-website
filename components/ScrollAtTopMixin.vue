<script>
export default {
  data() {
    return {
      isScrollAtTop: true,
      isScrollable: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onScroll() {
      this.isScrollAtTop = window.scrollY === 0;
    },
    onResize() {
      // Use the > 80 to prevent the minimal footer if you can only scroll some pixels
      this.isScrollable =
        document.body.scrollHeight - document.body.clientHeight > 80;
    },
  },
};
</script>
