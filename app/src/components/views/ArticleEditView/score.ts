import { Article } from "types/Article";

export function getPreviewScore(article: Article) {
  let sum = 0;

  if (article.displayName) {
    if (article.displayName.length > 0) {
      sum += 1;
    }

    if (article.displayName.length > 10) {
      sum += 1;
    }
  }

  if (article.photoURL) {
    sum += 1;
  }

  if (article.bottling?.distill?.alcoholByVolumePercentage) {
    sum += 1;
  }

  if (article.bottling?.distill?.age) {
    sum += 1;
  }

  return Math.min(5, sum);
}
