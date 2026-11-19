import type { InferaPlugin } from "./types";
import { topplePlugin } from "./topple";

/** Plugins enabled on the site. Order decides who wins if two claim the same code language. */
export const PLUGINS: InferaPlugin[] = [topplePlugin];

export const codeBlockRenderers = Object.assign({}, ...PLUGINS.map((p) => p.codeBlocks ?? {}));
export const pluginComponents = Object.assign({}, ...PLUGINS.map((p) => p.components ?? {}));
