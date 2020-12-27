import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";
// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const articlesIndex = client.initIndex("articles");
const usersIndex = client.initIndex("users");
const userArticlesIndex = client.initIndex("user-articles");

export const onArticleCreated = functions.firestore
  .document("articles/{articleId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    data.objectID = context.params.articleId;
    console.log("Writing %s", data.objectID, data);
    return articlesIndex.saveObject(data);
  });

export const onArticleUpdated = functions.firestore
  .document("articles/{articleId}")
  .onUpdate((snap, context) => {
    const data = snap.after.data();
    data.objectID = context.params.articleId;
    console.log("Writing %s", data.objectID, data);
    return articlesIndex.saveObject(data);
  });

export const onArticleDeleted = functions.firestore
  .document("articles/{articleId}")
  .onDelete((snap, context) => {
    const objectID = context.params.articleId;
    console.log("Deleting %s", objectID);
    return articlesIndex.deleteObject(objectID);
  });

export const onUserArticleCreated = functions.firestore
  .document("users/{userId}/articles/{articleId}")
  .onCreate((snap, context) => {
    const { articleId, userId } = context.params;
    const data = snap.data();
    data.objectID = [articleId, userId].join("/");
    data.articleId = articleId;
    data.userId = userId;
    console.log("Writing %s", data.objectID, data);
    return userArticlesIndex.saveObject(data);
  });

export const onUserArticleUpdated = functions.firestore
  .document("users/{userId}/articles/{articleId}")
  .onUpdate((snap, context) => {
    const { articleId, userId } = context.params;
    const data = snap.after.data();
    data.objectID = [articleId, userId].join("/");
    data.articleId = articleId;
    data.userId = userId;
    console.log("Writing %s", data.objectID, data);
    return userArticlesIndex.saveObject(data);
  });

export const onUserArticleDeleted = functions.firestore
  .document("users/{userId}/articles/{articleId}")
  .onDelete((snap, context) => {
    const objectID = context.params.articleId;
    console.log("Deleting %s", objectID);
    return userArticlesIndex.deleteObject(objectID);
  });

export const onUserCreated = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const { userId } = context.params;
    const data = snap.data()?.profile || {};
    data.objectID = userId;
    data.userId = userId;
    console.log("Writing %s", data.objectID, data);
    return usersIndex.saveObject(data);
  });

export const onUserUpdated = functions.firestore
  .document("users/{userId}")
  .onUpdate((snap, context) => {
    const { userId } = context.params;
    const data = snap.after.data()?.profile || {};
    data.objectID = userId;
    data.userId = userId;
    console.log("Writing %s", data.objectID, data);
    return usersIndex.saveObject(data);
  });

export const onUserDeleted = functions.firestore
  .document("users/{userId}")
  .onDelete((snap, context) => {
    const objectID = context.params.userId;
    console.log("Deleting %s", objectID);
    return usersIndex.deleteObject(objectID);
  });
