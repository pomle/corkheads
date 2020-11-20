import * as search from "./search/algolia";
import { aggregateArticle } from "./rating/aggregateArticle";

exports.onArticleCreated = search.onArticleCreated;
exports.onArticleUpdated = search.onArticleUpdated;
exports.onArticleDeleted = search.onArticleDeleted;

exports.aggregateArticle = aggregateArticle;
