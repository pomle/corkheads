const { admin } = require("../init");

const db = admin.firestore();

async function removeOrphanCheckIns() {
  const articles = await db.collection("articles").get();

  const existingArticleIds = articles.docs.reduce((s, d) => {
    s.add(d.id);
    return s;
  }, new Set());

  const checkIns = await db.collection("check-ins").get();

  const orphanCheckIns = checkIns.docs.filter((c) => {
    const articleId = c.data().articleId;
    return !existingArticleIds.has(articleId);
  });

  console.log("Removing %d check ins", orphanCheckIns.length);

  for (const checkIn of orphanCheckIns) {
    await checkIn.ref.delete();
  }
}

async function main() {
  await removeOrphanCheckIns();
}

main().catch(console.error);
