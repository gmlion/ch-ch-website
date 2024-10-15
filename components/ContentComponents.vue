<script lang="ts" setup>
import type {
    CollapsibleContent,
    ContentComponent,
    YoutubeContent
} from "~/core/types/contentComponentsTypes";
import Collapsible from "~/components/Collapsible/Collapsible.vue";
import type { Image } from "~/components/HomeCarousel/types/types";
import List from "~/components/List/List.vue";;
import type { CommuneMetadata, ContentGallery, FreeHTML, Tables, TypeList } from "~/core/types/publicationsTypes";

const props = defineProps<{
    contentComponent: ContentComponent[];
    classes?: string;
}>()
</script>

<template>
    <div v-for="component in props.contentComponent" :key="component.id" class="content-component" :class="props.classes">
        <div v-if="component.type === 'title'">
            <h2 class="title-element text-3xl-fluid font-semibold mb-8" v-html="component.content"></h2>
        </div>
        <div v-if="component.type === 'lead'">
            <p class="text-xl-fluid mt-8" v-html="component.content"></p>
        </div>
        <div v-if="component.type === 'commune-agency-picker'">
            <CommuneSearch :communesArray="component.content as CommuneMetadata[]" />
        </div>
        <div v-if="component.type === 'image'">
            <ImageBlock :image="component.content as Image" :has-light-box="true"
                :text="(component.content as Image).text" />
        </div>
        <div v-if="component.type === 'youtube'">
            <Youtube :youtube="component.content as YoutubeContent" />
        </div>
        <div v-if="component.type === 'collapsible'">
            <Collapsible :content="component.content as CollapsibleContent[]" />
        </div>
        <div v-if="component.type === 'infobox'">
            <InfoBox :title="component.refTitle" :content="component.content as ContentComponent[]" />
        </div>
        <div v-if="component.type === 'subtitle'">
            <div class="richtext" v-html="handleRichtext([{
                component:
                    'subtitle', identifier: '', id: component.id, content: { title: component.content as string }
            }])">
            </div>
        </div>
        <div v-if="component.type === 'gallery-teaser'">
            <ContentCarousel :gallery-content="component.content as ContentGallery[]" />
        </div>
        <div v-if="component.type === 'howto-teaser'">
            <HowToTeaser :contentComponent="component.content as Array<ContentComponent[]>" />
        </div>
        <div v-if="component.type === 'faqCollapsible'">
            <NestedCollapsible :content="component.content as CollapsibleContent[]" />
        </div>
        <div v-if="component.type === 'p'">
            <div class="richtext" v-html="handleRichtext([{
                component:
                    'p', identifier: '', id: component.id, content: { text: component.content as string }
            }])">
            </div>
        </div>
        <div v-if="component.type === 'table'">
            <Tables :tables="component.content as Tables" />
        </div>
        <div v-if="component.type === 'list'">
            <List :list="component.content as TypeList[]" />
        </div>
        <div v-if="component.type === 'free-html'">
            <div v-html="(component.content as FreeHTML)['free-html'].params.freehtml"></div>
        </div>
    </div>
</template>

<style lang="scss">
.content-component {
    &.how-to {
        .title-element {
            @apply font-semibold;
            line-height: 120%;
        }
    }
}
</style>
