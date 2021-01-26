const { admin } = require("../init");

const db = admin.firestore();

async function removeOrphanUserArticles() {
  const allArticles = await db.collectionGroup("articles").get();
  const articles = allArticles.docs.filter((doc) =>
    doc.ref.path.startsWith("articles/")
  );
  const userArticles = allArticles.docs.filter((doc) =>
    doc.ref.path.startsWith("users/")
  );
  const existingArticleIds = articles.reduce((s, d) => {
    s.add(d.id);
    return s;
  }, new Set());

  const orhpanUserArticles = userArticles.filter(
    (d) => !existingArticleIds.has(d.id)
  );

  console.log("Removing %d user articles", orhpanUserArticles.length);

  for (const ua of orhpanUserArticles) {
    await ua.ref.delete();
  }
}

async function main() {
  await removeOrphanUserArticles();
}

main().catch(console.error);
