import type {BodyComponent, YoutubeContent} from "~/core/types/contentComponents";

export const handleYoutube = (component: BodyComponent<YoutubeContent>[]): string  => {
    return `<div class="mb-8"><iframe width="560" height="315" src="${component[0].content.youtubeInclude.params.url}&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
}

// const  replaceYouTubeLink = (url: string): string => {
//     const regularYouTubePrefix = "https://www.youtube.com";
//     const noCookieYouTubePrefix = "https://www.youtube-nocookie.com";
//
//     if (url.startsWith(regularYouTubePrefix)) {
//         return url.replace(regularYouTubePrefix, noCookieYouTubePrefix);
//     } else {
//         return url; // Return the original URL if it's not a standard YouTube link
//     }
// }