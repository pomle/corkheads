const { admin } = require("../init");

const db = admin.firestore();

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function generateImage(imageSnap) {
  const id = imageSnap.id;
  console.log("Processing %s", id);
  const data = imageSnap.data();
  await imageSnap.ref.delete();
  await wait(500);
  await imageSnap.ref.set({ ...data, version: 1 });
  await wait(10000);
}

async function generateImages() {
  const imageSnapshotsCompleted = await db
    .collection("images")
    .where("version", "==", 1)
    .get();
  const imageIdsDone = new Set();
  imageSnapshotsCompleted.forEach((snap) => {
    imageIdsDone.add(snap.id);
  });

  const imageSnapshots = await db.collection("images").get();

  const snaps = [];
  imageSnapshots.forEach((snap) => {
    if (!imageIdsDone.has(snap.id)) {
      snaps.push(snap);
    }
  });

  return new Promise((resolve) => {
    async function next() {
      if (snaps.length === 0) {
        return resolve();
      }

      const snap = snaps.pop();
      await generateImage(snap);
      next();
    }

    next();
  });
}

async function main() {
  //await upgradeArticles();
  //await upgradeCheckIns();
  await generateImages();
}

main().catch(console.error);
