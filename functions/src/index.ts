import * as search from "./search/algolia";
import { aggregateArticle } from "./rating/aggregateArticle";
import { collectionSizeAggregate, wishlistSizeAggregate } from "./user/counts";

exports.onArticleCreated = search.onArticleCreated;
exports.onArticleUpdated = search.onArticleUpdated;
exports.onArticleDeleted = search.onArticleDeleted;

exports.aggregateArticle = aggregateArticle;

exports.collectionSizeAggregate = collectionSizeAggregate;
exports.wishlistSizeAggregate = wishlistSizeAggregate;
