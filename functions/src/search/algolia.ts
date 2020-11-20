import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = "articles";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export const onArticleCreated = functions.firestore
  .document("articles/{articleId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    data.objectID = context.params.articleId;
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(data);
  });

export const onArticleUpdated = functions.firestore
  .document("articles/{articleId}")
  .onUpdate((snap, context) => {
    const data = snap.after.data();
    data.objectID = context.params.articleId;
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(data);
  });

export const onArticleDeleted = functions.firestore
  .document("articles/{articleId}")
  .onDelete((snap, context) => {
    const objectID = context.params.articleId;
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(objectID);
  });
