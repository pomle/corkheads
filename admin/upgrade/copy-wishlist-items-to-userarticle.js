const { admin } = require("../init");

const db = admin.firestore();

async function updateUser(userId) {
  const sourceUser = db.collection("users").doc(userId);
  const destUser = sourceUser;

  const sourceCollection = sourceUser.collection("wishlist");
  const destCollection = destUser.collection("articles");

  const wishlistSnapshot = await sourceCollection.get();
  let size = 0;
  wishlistSnapshot.forEach(async (doc) => {
    const articleId = doc.id;
    const wishlist = doc.data();
    if (wishlist?.active) {
      size += 1;
    }
    const destDoc = destCollection.doc(articleId);
    console.log("Running set", destDoc.path);
    await destDoc.set({ wishlist }, { merge: true });
  });

  console.log("Setting wishlist total", size);
  destUser.set({ wishlistSize: size }, { merge: true });
}

async function main() {
  const snapshot = await db.collection("users").get();

  snapshot.forEach(async (doc) => {
    await updateUser(doc.id);
  });
}

main();
