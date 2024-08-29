import { atom } from "nanostores";
import {footerMenuStore} from "~/generate/store/footerMenuStore";
export const isElection = atom<boolean>(false);

export const resetStores = () => {
    footerMenuStore.set([]);
}