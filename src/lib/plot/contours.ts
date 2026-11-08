export type Segment = [number, number, number, number];

/**
 * Marching squares: line segments where a scalar field crosses `level`.
 * `values` is a (res + 1)² grid in row-major order; coordinates come back in
 * grid units (0..res) so the caller can map them to pixels.
 */
export const marchingSquares = (values: Float32Array, res: number, level = 0): Segment[] => {
  const n = res + 1;
  const out: Segment[] = [];
  const lerp = (a: number, b: number) => {
    const d = b - a;
    return d === 0 ? 0.5 : (level - a) / d;
  };
  for (let j = 0; j < res; j++) {
    for (let i = 0; i < res; i++) {
      const tl = values[j * n + i] - level;
      const tr = values[j * n + i + 1] - level;
      const br = values[(j + 1) * n + i + 1] - level;
      const bl = values[(j + 1) * n + i] - level;
      const code = (tl > 0 ? 8 : 0) | (tr > 0 ? 4 : 0) | (br > 0 ? 2 : 0) | (bl > 0 ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const top: [number, number] = [i + lerp(tl + level, tr + level), j];
      const right: [number, number] = [i + 1, j + lerp(tr + level, br + level)];
      const bottom: [number, number] = [i + lerp(bl + level, br + level), j + 1];
      const left: [number, number] = [i, j + lerp(tl + level, bl + level)];
      const seg = (a: [number, number], b: [number, number]) => out.push([a[0], a[1], b[0], b[1]]);
      switch (code) {
        case 1:
        case 14:
          seg(left, bottom);
          break;
        case 2:
        case 13:
          seg(bottom, right);
          break;
        case 3:
        case 12:
          seg(left, right);
          break;
        case 4:
        case 11:
          seg(top, right);
          break;
        case 6:
        case 9:
          seg(top, bottom);
          break;
        case 7:
        case 8:
          seg(left, top);
          break;
        case 5:
          seg(left, top);
          seg(bottom, right);
          break;
        case 10:
          seg(top, right);
          seg(left, bottom);
          break;
      }
    }
  }
  return out;
};
