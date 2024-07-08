import type { PathType } from "./routing";

export interface AllPublicationOptions {
  handle: string;
  version: number;
  label: string;
  maxDepth: number;
  nodes: PathType[];
}
