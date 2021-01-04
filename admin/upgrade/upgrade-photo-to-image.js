const url = require("url");
const qs = require("querystring");
const sharp = require("sharp");
const { admin } = require("../init");

const db = admin.firestore();
const bucket = admin.storage().bucket("corkheads-user-public-media/");

const SIZE_RE = /\d+x\d+/;

const DESTINATION_SIZES = [80, 160, 320, 640, 1280, 1920].map((n) => ({
  x: n,
  y: n,
}));

function findBiggestSource(fileId) {
  return Promise.all(
    DESTINATION_SIZES.map((size) => {
      const objectId = [fileId, `${size.x}x${size.y}`].join("/");

      return {
        size,
        objectId,
        file: bucket.file(objectId),
      };
    }).map((entry) => {
      return entry.file.exists().then(([exists]) => ({
        ...entry,
        exists,
      }));
    })
  )
    .then((entries) => entries.filter((e) => e.exists))
    .then((entries) => entries.sort((a, b) => b.size.x - a.size.x))
    .then((entries) => entries[0]);
}

function getSize(objectId) {
  const parts = objectId.split("/");
  const maybeSize = parts.slice(-1)[0];
  if (SIZE_RE.test(maybeSize)) {
    return maybeSize.split("x").map(parseFloat);
  }
  return;
}

function getSourceId(objectId) {
  const size = getSize(objectId);
  if (size) {
    return findBiggestSource(objectId.split("/").slice(0, -1).join("/")).then(
      (source) => source.objectId
    );
  }
  return objectId;
}

async function createImage(photoURL, userId, imageId) {
  const urlObject = url.parse(photoURL);
  const objectId = qs.unescape(urlObject.pathname.split("/").slice(-1)[0]);
  const imageRef = db.collection("images").doc(imageId);

  const sourceId = await getSourceId(objectId);

  const image = {
    source: sourceId,
  };

  if (userId) {
    image.userId = userId;
  }

  console.log("Source id", sourceId);
  console.log("Saving image object", imageRef.id);

  await imageRef.set(image, { merge: true });

  return imageRef;
}

function upgradeArticles() {
  return db
    .collection("articles")
    .orderBy("photoURL")
    .get()
    .then((articles) => {
      const tasks = [];
      articles.forEach((doc) => {
        console.log("Processing article", doc.id);
        const { photoURL, userId } = doc.data();
        const task = createImage(photoURL, userId, doc.id).then((imageRef) => {
          if (imageRef) {
            console.log("Updating article", doc.id);
            return doc.ref.update({ imageId: imageRef.id });
          }
        });
        tasks.push(task);
      });
      return Promise.all(tasks);
    });
}

function upgradeCheckIns() {
  return db
    .collection("check-ins")
    .orderBy("photoURL")
    .get()
    .then((checkIns) => {
      const tasks = [];
      checkIns.forEach((doc) => {
        console.log("Processing check-in", doc.id);
        const { photoURL, userId } = doc.data();
        const task = createImage(photoURL, userId, doc.id).then((imageRef) => {
          if (imageRef) {
            console.log("Updating check-in", doc.id);
            return doc.ref.update({ imageId: imageRef.id });
          }
        });
        tasks.push(task);
      });
      return Promise.all(tasks);
    });
}

function upgradeUsers() {
  return db
    .collection("users")
    .orderBy("profile.photoURL")
    .limit(1)
    .get()
    .then((users) => {
      const tasks = [];
      users.forEach((doc) => {
        console.log("Processing user", doc.id);
        const { photoURL } = doc.data();
        const task = createImage(photoURL, doc.id, doc.id).then((imageRef) => {
          if (imageRef) {
            console.log("Updating user", doc.id);
            return doc.ref.update({ "profile.imageId": imageRef.id });
          }
        });
        tasks.push(task);
      });
      return Promise.all(tasks);
    });
}

async function main() {
  //await upgradeArticles();
  //await upgradeCheckIns();
  await upgradeUsers();
}

main().catch(console.error);
