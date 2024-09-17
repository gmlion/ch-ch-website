import type {BodyComponent, RichtextContent} from "~/core/types/contentComponentsTypes";

export const handleRichtext = (text: BodyComponent<RichtextContent>[]): string => {
    let richtext = ""
    text.forEach(text => {
        if (text.component === "p") {
            richtext += `<${text.component}>${text.content.text}</${text.component}>`
        }
        if (text.component === "subtitle") {
            richtext += `<h3>${text.content.title}</h3>`
        }
    })
    if (livingDocsIdToUrl(richtext)) richtext = livingDocsIdToUrl(richtext)
    return richtext;
};