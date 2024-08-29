import type {BodyComponent, YoutubeContent} from "~/core/types/contentComponentsTypes";

export const handleYoutube = (component: BodyComponent<YoutubeContent>[]): string  => {
    return `<div class="mb-8"><iframe width="560" height="315" src="${component[0].content.youtubeInclude.params.url}&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
}