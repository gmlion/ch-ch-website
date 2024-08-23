import type {RichtextComponent} from "~/core/types/contentComponents";

export const handleRichtext = (text: RichtextComponent): string => {
    const { component, content } = text;

    // // Initialize the variable to store the data-li-document-ref value
    // let dataLiDocumentRef: string | null = null;
    //
    // // Use a regular expression to find the data-li-document-ref attribute in the content.text
    // const anchorRegex = /<a[^>]*data-li-document-ref="([^"]*)"[^>]*>/i;
    // const match = content.text.match(anchorRegex);
    //
    // if (match) {
    //     // Extract the value of data-li-document-ref
    //     dataLiDocumentRef = match[0];
    // }
    //
    // // Log or do something with the dataLiDocumentRef if needed
    // console.log("data-li-document-ref:", dataLiDocumentRef);

    // Return the markup as before
    return `<${component}>${content.text}</${component}>`;
};