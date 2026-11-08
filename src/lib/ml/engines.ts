import type { Engine } from "../types/domain/model.types";
import { dbscan } from "./dbscan";
import { gaussianMixture } from "./gmm";
import { lda, naiveBayes, qda } from "./gaussian-models";
import { hierarchical } from "./hierarchical";
import { kMeans } from "./kmeans";
import { knnClassifier, knnRegressor } from "./knn";
import { linearRegression } from "./linear-regression";
import { logisticRegression } from "./logistic-regression";
import { neuralNetwork } from "./mlp";
import { pca } from "./pca";
import { perceptron } from "./perceptron";
import { svm } from "./svm";
import {
  adaBoost,
  decisionTree,
  gradientBoosting,
  randomForest,
  regressionTree,
} from "./tree-models";

/** Training engine for each algorithm slug. */
export const ENGINES: Record<string, Engine> = {
  "linear-regression": linearRegression,
  "knn-regression": knnRegressor,
  "regression-tree": regressionTree,
  "gradient-boosting": gradientBoosting,
  "logistic-regression": logisticRegression,
  perceptron,
  lda,
  qda,
  "naive-bayes": naiveBayes,
  knn: knnClassifier,
  "decision-tree": decisionTree,
  "random-forest": randomForest,
  adaboost: adaBoost,
  svm,
  "neural-network": neuralNetwork,
  "k-means": kMeans,
  gmm: gaussianMixture,
  dbscan,
  hierarchical,
  pca,
};
