import type { BodyComponent, RichtextContent } from "~/core/types/contentComponentsTypes";

export const handleRichtext = (text: BodyComponent<RichtextContent>[]): string => {
    let richtext = ""

    text.forEach(textItem => {
        if (textItem.component === "p") {
            richtext += `<${textItem.component}>${textItem.content.title || textItem.content.text}</${textItem.component}>`
        }
        if (textItem.component === "subtitle") {
            richtext += `<h3>${textItem.content.title}</h3>`
        }
    })
    if (livingDocsIdToUrl(richtext)) { richtext = livingDocsIdToUrl(richtext) }

    return richtext;
};