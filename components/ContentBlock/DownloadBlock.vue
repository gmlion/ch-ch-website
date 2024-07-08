<template>
  <div v-if="files">
    <div v-for="file in files" :key="file.id" class="flex">
      <svg-icon name="download" class="w-6 h-6 mr-4 download-icon" />
      <a target="_blank" :href="file.url" class="link--download">
        {{ file.title }}
      </a>
    </div>
  </div>
</template>

<script>
import {
  getPublicationById,
  getPublicationFromMediaLibrary,
} from "~/utils/publication";
import ContentBlockMixin from "./ContentBlockMixin";

const mediaIdRegex = new RegExp('data-li-file-ref="([^"]+)"', "m");

export default {
  mixins: [ContentBlockMixin],
  inject: ["pageTitle"],
  async fetch() {
    try {
      const fileId =
        this.contentData?.content?.file?.params?.teaser?.reference?.id;
      const publication = await getPublicationById(fileId, this.$axios);

      const files = publication.content;

      for (let i = 0; i < files.length; i++) {
        const linkText = files[i].content.text;

        const mediaIdMatches = mediaIdRegex.exec(linkText);
        mediaIdRegex.lastIndex = 0;

        if (mediaIdMatches[1]) {
          const mediaId = mediaIdMatches[1];
          const mediaDocument = await getPublicationFromMediaLibrary(
            mediaId,
            this.$axios
          );

          const file = this.getFileFromMediaDocument(mediaDocument, mediaId);
          if (file) {
            this.files.push(file);
          }
        }
      }
    } catch (err) {
      const route = this.$router.fullPath;
      // eslint-disable-next-line no-console
      console.warn(
        `There seems to be an incomplete download block configuration on ${this.pageTitle()} / ${route}`,
        `error was ${err}`
      );
    }
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    getFileFromMediaDocument(mediaDocument, mediaId) {
      // If the default media locale is the current locale or if there are no translations add the default url and title
      if (
        mediaDocument.metadata.language.locale === this.$i18n.locale ||
        !mediaDocument.translations
      ) {
        return {
          title: mediaDocument.metadata.title,
          url: mediaDocument.asset.url,
          id: mediaId,
        };
      } else {
        // Search for the translation for the current language
        const currentTranslation = mediaDocument.translations.find(
          (translation) => translation.locale === this.$i18n.locale
        );
        if (!currentTranslation) {
          return null;
        }

        return {
          title: currentTranslation.metadata.title,
          url: currentTranslation.asset?.url || mediaDocument.asset.url,
          id: mediaId,
        };
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.download-icon {
  transform: translateY(2px);
}
</style>
