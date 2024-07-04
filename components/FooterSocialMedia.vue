<template>
  <div class="flex">
    <a
      href="https://www.youtube.com/channel/UCDW3tdOJ_Z7ZS4AFHfReI0g"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary-blue"
    >
      <svg-icon
        class="fill-current"
        :class="iconSize"
        name="youtube"
        :title="$t('youtubeIconTitle')"
      />
    </a>
    <a
      href="https://twitter.com/ch_portal"
      target="_blank"
      rel="noopener noreferrer"
      class="ml-6 text-primary-blue"
    >
      <svg-icon
        class="fill-current"
        :class="iconSize"
        name="twitter"
        :title="$t('twitterIconTitle')"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'FooterSocialMedia',
  props: {
    size: {
      type: String,
      validator: (value) => {
        return ['big', 'small'].includes(value)
      },
      default: 'big',
    },
  },
  computed: {
    iconSize() {
      return {
        'h-8 w-7': this.size === 'big',
        'h-6 w-5': this.size === 'small',
      }
    },
  },
}
</script>
