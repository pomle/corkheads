import { stringCodec } from "components/route/codecs";
import { collectionView } from "../../paths";

const articleView = collectionView.append("/:articleId", {
  articleId: stringCodec,
});

const articlePictureView = articleView.append("/picture", {});

export { articleView, articlePictureView };
