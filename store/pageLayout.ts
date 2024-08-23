import { atom } from "nanostores";

export const isSearchOpen = atom<boolean>(false);

export const toggleSearch = atom<boolean>(false);

export const pageLayout = atom<PageLayout>({
    footerColor: "white",
    rightColor: "layout-blue",
    divisionMode: "halves",
    showFader: false
})

export type PageLayout = {
    footerColor?: string;
    rightColor?: "layout-blue" | "layout-yellow" | "layout-white";
    leftColor?: "layout-blue";
    divisionMode?: string;
    showFader?: boolean;
}