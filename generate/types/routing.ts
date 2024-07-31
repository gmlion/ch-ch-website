export interface MenuNode {
  id: string;
  label: string;
  nodes: MenuNode[];
  documentId?: string;
  type: "document" | "uri";
  uri?: string;
  target?: string;
  document: any;
  isExpanded?: boolean;
  children?: MenuResponseData[];
}

export interface PathType {
  id: string;
  label: string;
  nodes: PathType[];
  documentId?: string;
  type: "document" | "uri";
}

export type isElection = boolean;

export interface Menu {
  version: number;
  label: string;
  maxDepth: number;
  nodes: MenuNode[];
}

export interface MenuResponse {
  handle?: string; // Optional because it's not present in all objects
  version: number;
  label: string;
  maxDepth: number;
  nodes: MenuNode[]; // Assuming nodes are of type MenuNode, even though represented as [Object] in the example
}

export interface MenuResponse {
  data: MenuResponseData[];
}
export interface MenuResponseData {
  id: string;
  label: string;
  nodes: MenuResponseData[];
  documentId?: string;
  type: "document" | "uri";
  isExpanded?: boolean;
}
