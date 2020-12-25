const { admin } = require("../init");

const db = admin.firestore();

async function updateUser(userId) {
  const sourceUser = db.collection("users").doc(userId);
  const destUser = sourceUser;

  const sourceCollection = sourceUser.collection("collection");
  const destCollection = destUser.collection("articles");

  let size = 0;
  const collectionSnapshot = await sourceCollection.get();
  collectionSnapshot.forEach(async (doc) => {
    const articleId = doc.id;
    const collection = doc.data();
    delete collection.inventory;

    if (collection?.active) {
      size += 1;
    }

    const destDoc = destCollection.doc(articleId);
    console.log("Running set", destDoc.path);
    await destDoc.set({ collection }, { merge: true });
  });

  console.log("Setting collection total", size);
  destUser.set({ collectionSize: size }, { merge: true });
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
