import type { PredictResult } from "~/api/types";

export const sort = (predictions: PredictResult): PredictResult => {
  const keys = Object.keys(predictions).map((d) => ({
    key: d,
    value: predictions[d],
  }));
  keys.sort((a, b) => b.value - a.value);
  return keys.reduce((obj, key) => {
    obj[key.key] = predictions[key.key];
    return obj;
  }, {} as PredictResult);
};
