const { admin } = require("../init");

const db = admin.firestore();

async function updateUser(userId) {
  const sourceUser = db.collection("users").doc(userId);
  const destUser = sourceUser;

  const sourceCollection = sourceUser.collection("collection");
  const destCollection = destUser.collection("articles");

  const collectionSnapshot = await sourceCollection.get();
  collectionSnapshot.forEach(async (doc) => {
    const articleId = doc.id;
    const inventory = doc.data()?.inventory;
    if (inventory) {
      const destDoc = destCollection.doc(articleId);
      console.log("Running set", destDoc.path);
      await destDoc.set({ inventory }, { merge: true });
    }
  });
}

async function main() {
  try {
    const snapshot = await db.collection("users").get();

    snapshot.forEach(async (doc) => {
      await updateUser(doc.id);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
