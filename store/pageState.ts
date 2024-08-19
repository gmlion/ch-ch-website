import { atom } from "nanostores";
import type { LinkItem } from "./types/page";

export const isElection = atom<boolean>(false);

export const footerLinks = atom<LinkItem[]>([]);
