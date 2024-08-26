import { type Publication } from "~/core/types/publications";

export interface IndexMenu {
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
  parentUrl?: string;
  children: MenuItem[];
}

export interface Breadcrumb {
  id: string;
  label: string;
  route: string;
}