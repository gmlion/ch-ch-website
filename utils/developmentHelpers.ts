// write me a function which takes html as string and replaces all hrefs (if they have https://ch.ch/ in them) with "/" and returns the modified html

export const replaceHrefForDev = (html: string) => {
  return html.replace(/href="https:\/\/ch.ch\//g, 'href="/');
};
