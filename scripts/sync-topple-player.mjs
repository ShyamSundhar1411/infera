// Copies a built Topple player into public/vendor, where the Topple plugin
// loads it from. The copy is committed, so builds never need Topple itself.
//
//   yarn sync:topple                         (from ../topple, built with `bun run build`)
//   TOPPLE_PLAYER=/path/to/topple.js yarn sync:topple
import fs from "node:fs";
import path from "node:path";

const source = path.resolve(process.env.TOPPLE_PLAYER ?? "../topple/packages/player/dist/topple.js");
const target = path.join(process.cwd(), "public/vendor/topple-player.js");

if (!fs.existsSync(source)) {
  console.error(`✗ No player at ${source}. Build it in the Topple repo with \`bun run --cwd packages/player build\`, or set TOPPLE_PLAYER.`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(source, target);
console.log(`✓ ${path.relative(process.cwd(), target)}  ${(fs.statSync(target).size / 1024).toFixed(0)} kB`);
