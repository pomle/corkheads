import * as search from "./search/algolia";

exports.onArticleCreated = search.onArticleCreated;
exports.onArticleUpdated = search.onArticleUpdated;
exports.onArticleDeleted = search.onArticleDeleted;
