const { admin } = require("../init");

const db = admin.firestore();

async function removeOrphanUserCheckIns() {
  const allCheckIns = await db.collectionGroup("check-ins").get();
  const checkIns = allCheckIns.docs.filter((doc) =>
    doc.ref.path.startsWith("check-ins/")
  );
  const userCheckIns = allCheckIns.docs.filter((doc) =>
    doc.ref.path.startsWith("users/")
  );
  const existingCheckInIds = checkIns.reduce((s, d) => {
    s.add(d.id);
    return s;
  }, new Set());

  const orhpanUserCheckIns = userCheckIns.filter(
    (d) => !existingCheckInIds.has(d.id)
  );

  console.log("Removing %d user check-ins", orhpanUserCheckIns.length);

  for (const uc of orhpanUserCheckIns) {
    await uc.ref.delete();
  }
}

async function main() {
  await removeOrphanUserCheckIns();
}

main().catch(console.error);
