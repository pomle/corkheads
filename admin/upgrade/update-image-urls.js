const { admin } = require("../init");

const db = admin.firestore();

async function updateImage(imageDoc) {
  const imageId = imageDoc.id;

  console.log("Processing image %s", imageId);

  const data = imageDoc.data();
  if (!data) {
    console.log("Image %s does not exist", imageId);
    return;
  }

  if (!Array.isArray(data.formats)) {
    console.log("Image %s has not formats array", imageId);
    return;
  }

  const updatedFormats = data.formats.map((format) => {
    return {
      ...format,
      url: format.url.replace(
        "https://storage.googleapis.com/corkheads-generated-media/",
        "https://generated-media.corkheads.com/"
      ),
    };
  });

  await imageDoc.ref.update({
    formats: updatedFormats,
  });
}

async function main() {
  const images = await db.collection("images").get();
  for (const imageDoc of images.docs) {
    await updateImage(imageDoc);
  }
}

main();
