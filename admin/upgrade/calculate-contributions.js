const { admin } = require("../init");

const db = admin.firestore();

async function updateUser(userId) {
  const userRef = db.collection("users").doc(userId);

  const articles = await db
    .collection("articles")
    .where("userId", "==", userId)
    .get();

  userRef.set({ articleContributionsSize: articles.size }, { merge: true });
}

async function main() {
  const snapshot = await db.collection("users").get();

  snapshot.forEach(async (doc) => {
    await updateUser(doc.id);
  });
}

main();
