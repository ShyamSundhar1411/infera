import type { InferaPlugin } from "../types";
import ToppleScene from "./topple-scene";

/** Live system diagrams from Topple, written as ```topple code blocks in MDX. */
export const topplePlugin: InferaPlugin = {
  name: "topple",
  codeBlocks: { topple: ToppleScene },
};
