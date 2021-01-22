import * as search from "./search/algolia";
import { aggregateArticle } from "./rating/aggregateArticle";
import {
  checkInReactionCountAggregate,
  checkInCommentCountAggregate,
} from "./checkIn/aggregateReactions";
import {
  checkInCountAggregate,
  articleSizeAggregate,
  articleContibutionSizeAggregate,
} from "./user/counts";
import { createImageDerivatives } from "./image/create-image-derivatives";
import { createCheckInCommentNotification } from "./notifications/checkInComment";
import { createCheckInReactionNotification } from "./notifications/checkInReaction";

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
exports.checkInCommentCountAggregate = checkInCommentCountAggregate;

exports.articleSizeAggregate = articleSizeAggregate;
exports.articleContibutionSizeAggregate = articleContibutionSizeAggregate;

exports.createCheckInCommentNotification = createCheckInCommentNotification;
exports.createCheckInReactionNotification = createCheckInReactionNotification;
