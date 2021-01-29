const { admin } = require("../init");

const db = admin.firestore();

async function countCollection(userDoc) {
  const userArticles = await db
    .collection("users")
    .doc(userDoc.id)
    .collection("articles")
    .get();

  let collectionCount = 0;
  userArticles.forEach((snap) => {
    const data = snap.data();
    if (data?.collection?.active) {
      collectionCount += 1;
    }
  });

  console.log(
    "Setting user %s collection size to %d",
    userDoc.id,
    collectionCount
  );

  await userDoc.ref.update({ collectionSize: collectionCount });
}

async function main() {
  const users = await db.collection("users").get();

  for (const user of users.docs) {
    await countCollection(user);
  }
}

main().catch(console.error);
