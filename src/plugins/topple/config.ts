/** Settings for the Topple plugin. Everything Topple-specific lives in this folder. */
export const TOPPLE_PLUGIN = {
  /** Where the player script is served from: the vendored copy (see scripts/sync-topple-player.mjs). */
  playerSrc: process.env.NEXT_PUBLIC_TOPPLE_PLAYER_SRC ?? "/vendor/topple-player.js",
  /** Where the player's credit and share links point. Unset keeps them on this site. */
  shareBase: process.env.NEXT_PUBLIC_TOPPLE_SHARE_BASE ?? "https://topple.shyamsundhar.com",
  /** Default height of a scene, in pixels. */
  height: 520,
};
