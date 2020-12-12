import * as search from "./search/algolia";
import { aggregateArticle } from "./rating/aggregateArticle";
import {
  checkInCountAggregate,
  collectionSizeAggregate,
  wishlistSizeAggregate,
} from "./user/counts";

exports.onArticleCreated = search.onArticleCreated;
exports.onArticleUpdated = search.onArticleUpdated;
exports.onArticleDeleted = search.onArticleDeleted;
exports.onUserArticleCreated = search.onUserArticleCreated;
exports.onUserArticleUpdated = search.onUserArticleUpdated;
exports.onUserArticleDeleted = search.onUserArticleDeleted;

exports.aggregateArticle = aggregateArticle;

exports.checkInCountAggregate = checkInCountAggregate;
exports.collectionSizeAggregate = collectionSizeAggregate;
exports.wishlistSizeAggregate = wishlistSizeAggregate;
