export interface DatasetOption {
  id: string;
  label: string;
}

export interface DatasetConfig {
  id: string;
  count: number;
  noise: number;
  /** Number of classes (classification) or blobs (clustering). */
  groups: number;
  seed: number;
}
