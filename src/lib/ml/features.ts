/**
 * Polynomial feature map for 2D inputs: every x^i·y^j with 1 ≤ i + j ≤ degree.
 * The bias term is handled separately by each model.
 */
export const polyFeatures2D = (x: number, y: number, degree: number) => {
  const out: number[] = [];
  for (let d = 1; d <= degree; d++) {
    for (let j = 0; j <= d; j++) {
      out.push(x ** (d - j) * y ** j);
    }
  }
  return out;
};

export const polyFeatureCount2D = (degree: number) =>
  ((degree + 1) * (degree + 2)) / 2 - 1;
