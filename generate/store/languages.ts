import {atom} from "nanostores";

export const languages = atom<string[]>(["de", "fr", "it", "en", "rm"]);