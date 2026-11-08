import type { AlgorithmContent } from "@/lib/types/domain/algorithm.types";
import { content as adaboost } from "./adaboost.content";
import { content as dbscan } from "./dbscan.content";
import { content as decisionTree } from "./decision-tree.content";
import { content as gmm } from "./gmm.content";
import { content as gradientBoosting } from "./gradient-boosting.content";
import { content as hierarchical } from "./hierarchical.content";
import { content as kMeans } from "./k-means.content";
import { content as knn } from "./knn.content";
import { content as knnRegression } from "./knn-regression.content";
import { content as lda } from "./lda.content";
import { content as linearRegression } from "./linear-regression.content";
import { content as logisticRegression } from "./logistic-regression.content";
import { content as naiveBayes } from "./naive-bayes.content";
import { content as neuralNetwork } from "./neural-network.content";
import { content as pca } from "./pca.content";
import { content as perceptron } from "./perceptron.content";
import { content as qda } from "./qda.content";
import { content as randomForest } from "./random-forest.content";
import { content as regressionTree } from "./regression-tree.content";
import { content as svm } from "./svm.content";

export const CONTENT: Record<string, AlgorithmContent> = {
  "linear-regression": linearRegression,
  "knn-regression": knnRegression,
  "regression-tree": regressionTree,
  "gradient-boosting": gradientBoosting,
  "logistic-regression": logisticRegression,
  perceptron,
  lda,
  qda,
  "naive-bayes": naiveBayes,
  knn,
  "decision-tree": decisionTree,
  "random-forest": randomForest,
  adaboost,
  svm,
  "neural-network": neuralNetwork,
  "k-means": kMeans,
  gmm,
  dbscan,
  hierarchical,
  pca,
};
