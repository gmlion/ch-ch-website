export interface SearchResult {
    id: number;
    content_type: string;
    lang: string;
    title: string;
    lead: string;
    metadata: {
        title: string;
        description: string;
        teaserImage: string;
        canonicalUrl: string;
        seoRobots: string;
    };
}