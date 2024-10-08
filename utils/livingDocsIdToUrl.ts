export const livingDocsIdToUrl = (text: string): string => {
    const router = useRouter();

    const regex = /data-li-document-ref="(\d+)"/g;
    const matches = text.matchAll(regex);

    let replacedHTML = text;
    const allRoutes = router.getRoutes()
    if (matches) {
        for (const match of matches) {
            const regexId = match[1];
            if (regexId) {
                const route = allRoutes.find((route) => route.meta.id === regexId);
                if (!route) {
                    return "";
                }
                const hrefRegex = new RegExp(`href="[^"]*"`);
                replacedHTML = replacedHTML.replace(hrefRegex, `href="${route.path}"`);
            }
        }
    }

    return replacedHTML;
}