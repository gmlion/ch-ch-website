import { type Publication } from "../../core/types/publications";
import { type MenuResponse } from "./routing";

export interface IndexMenu {
  menu: MenuResponse | undefined | null;
  homePublication: Publication | undefined | null;
  lang: string | undefined | null;
}

export interface MenuItem {
  id: string;
  label: string;
  type: string;
  route?: string;
  target?: string;
  parentId?: string;
  parentLabel?: string;
  children: MenuItem[];
}
