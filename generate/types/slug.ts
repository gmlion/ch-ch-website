import type { PathType } from "./routingTypes";

export interface AllPublicationOptions {
  handle: string;
  version: number;
  label: string;
  maxDepth: number;
  nodes: PathType[];
}