import { slugifyAnchorElements } from '@/utils/slugifyAnchorElements'

export default {
  methods: {
    contentIdentifier(contentBlock) {
      if (!('content' in contentBlock) && !('containers' in contentBlock)) {
        return ''
      }
      let identifier = ''
      if ('content' in contentBlock) {
        identifier = Object.keys(contentBlock.content)[0]
      } else if ('containers' in contentBlock) {
        identifier = Object.keys(contentBlock.containers)[0]
      }

      return identifier
    },
    getContentComponent(contentBlock) {
      const componentIdentifier = contentBlock.identifier.split('.')[1]
      if (componentIdentifier === 'accordion') {
        slugifyAnchorElements(contentBlock)
        return 'AccordionBlock'
      }
      if (componentIdentifier === 'howto-teaser') {
        return 'HowToBlock'
      }
      if (componentIdentifier === 'table') {
        return 'TableBlock'
      }
      if (componentIdentifier === 'commune-agency-picker') {
        return 'CommunesBlock'
      }
      if (componentIdentifier === 'cantonal-service-picker') {
        return 'CantonBlock'
      }
      if (componentIdentifier === 'title') {
        slugifyAnchorElements(contentBlock)
        return 'TitleBlock'
      }
      if (componentIdentifier === 'free-html') {
        return 'FreeHtmlBlock'
      }
      if (componentIdentifier === 'gallery-teaser') {
        return 'GalleryBlock'
      }

      const identifier = this.contentIdentifier(contentBlock)

      switch (identifier) {
        case 'youtubeInclude':
          return 'YoutubeBlock'
        case 'file':
          return 'DownloadBlock'
        case 'title':
          slugifyAnchorElements(contentBlock)
          return 'SubtitleBlock'
        case 'image':
          return 'ImageBlock'
        case 'text':
          return 'TextBlock'
        case 'list':
          return 'ListBlock'
        case 'heading':
          return 'HeadingBlock'
        case 'faq':
          return 'FAQBlock'
        case 'iframeInclude':
          return 'IFrameBlock'
      }
      return ''
    },
  },
}
