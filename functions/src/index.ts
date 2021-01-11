import * as search from "./search/algolia";
import { aggregateArticle } from "./rating/aggregateArticle";
import { checkInReactionCountAggregate } from "./checkIn/aggregateReactions";
import {
  checkInCountAggregate,
  articleSizeAggregate,
  articleContibutionSizeAggregate,
} from "./user/counts";
import { createImageDerivatives } from "./image/create-image-derivatives";

exports.onUserCreated = search.onUserCreated;
exports.onUserUpdated = search.onUserUpdated;
exports.onUserDeleted = search.onUserDeleted;

exports.onArticleCreated = search.onArticleCreated;
exports.onArticleUpdated = search.onArticleUpdated;
exports.onArticleDeleted = search.onArticleDeleted;

exports.onUserArticleCreated = search.onUserArticleCreated;
exports.onUserArticleUpdated = search.onUserArticleUpdated;
exports.onUserArticleDeleted = search.onUserArticleDeleted;

exports.aggregateArticle = aggregateArticle;

exports.createImageDerivatives = createImageDerivatives;

exports.checkInCountAggregate = checkInCountAggregate;
exports.checkInReactionCountAggregate = checkInReactionCountAggregate;
exports.articleSizeAggregate = articleSizeAggregate;
exports.articleContibutionSizeAggregate = articleContibutionSizeAggregate;
