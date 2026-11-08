import type { DistributionContent } from "@/lib/types/domain/distribution.types";

import { content as bernoulli } from "./bernoulli.content";
import { content as binomial } from "./binomial.content";
import { content as geometric } from "./geometric.content";
import { content as poisson } from "./poisson.content";
import { content as discreteUniform } from "./discrete-uniform.content";
import { content as uniform } from "./uniform.content";
import { content as normal } from "./normal.content";
import { content as exponential } from "./exponential.content";
import { content as gamma } from "./gamma.content";
import { content as beta } from "./beta.content";
import { content as chiSquared } from "./chi-squared.content";
import { content as studentT } from "./student-t.content";
import { content as logNormal } from "./log-normal.content";

export const DISTRIBUTION_CONTENT: Record<string, DistributionContent> = {
  bernoulli,
  binomial,
  geometric,
  poisson,
  "discrete-uniform": discreteUniform,
  uniform,
  normal,
  exponential,
  gamma,
  beta,
  "chi-squared": chiSquared,
  "student-t": studentT,
  "log-normal": logNormal,
};
