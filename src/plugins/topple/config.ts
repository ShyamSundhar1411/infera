/** Settings for the Topple plugin. Everything Topple-specific lives in this folder. */
export const TOPPLE_PLUGIN = {
  /** Registers <topple-player>. The import is split into its own chunk, fetched only when a scene is near. */
  loadPlayer: () => import("topple-player/register"),
  /** Where the player's credit and share links point. */
  shareBase: process.env.NEXT_PUBLIC_TOPPLE_SHARE_BASE ?? "https://topple.shyamsundhar.com",
  /** Default height of a scene, in pixels. */
  height: 520,
};
