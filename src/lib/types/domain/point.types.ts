/** A data point in world space. Both axes span [-1, 1]. */
export interface Point {
  x: number;
  y: number;
  /** Class index for classification; ignored for regression and unsupervised data. */
  label: number;
  /** Held out of training and only used to test the model. */
  test?: boolean;
}
