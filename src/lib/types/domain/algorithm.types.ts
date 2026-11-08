export type AlgorithmKind =
  | "regression"
  | "classification"
  | "clustering"
  | "projection";

export type CategoryId =
  | "regression"
  | "linear"
  | "probabilistic"
  | "instance"
  | "trees"
  | "kernels-nets"
  | "unsupervised";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export type ParamValue = number | string | boolean;
export type ParamValues = Record<string, ParamValue>;

interface BaseParam {
  key: string;
  label: string;
  hint?: string;
  /** Hide the control unless this returns true for the current values. */
  showIf?: (values: ParamValues) => boolean;
}

export interface RangeParam extends BaseParam {
  type: "range";
  min: number;
  max: number;
  step: number;
  default: number;
  /** Log-scaled sliders feel natural for values like C or learning rate. */
  log?: boolean;
  format?: (value: number) => string;
}

export interface SelectParam extends BaseParam {
  type: "select";
  options: { value: string; label: string }[];
  default: string;
}

export interface ToggleParam extends BaseParam {
  type: "toggle";
  default: boolean;
}

export type ParamDef = RangeParam | SelectParam | ToggleParam;

export interface AlgorithmMeta {
  slug: string;
  name: string;
  shortName: string;
  kind: AlgorithmKind;
  category: CategoryId;
  tagline: string;
  /** Number of classes the model can handle (classification only). */
  maxClasses: number;
  /** Iterative models animate their training loop. */
  iterative: boolean;
  datasets: string[];
  defaultDataset: string;
  params: ParamDef[];
}

export type Algorithm = AlgorithmMeta;

/** Frontmatter shared by every MDX explainer. */
export interface ExplainerFrontmatter {
  summary: string;
}
