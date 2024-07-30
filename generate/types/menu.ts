import { type Publication } from "../../core/types/publications";
import { type MenuResponse } from "./routing";

export interface IndexMenu {
  menu: MenuResponse | undefined | null;
  homePublication: Publication | undefined | null;
  lang: string | undefined | null;
}
