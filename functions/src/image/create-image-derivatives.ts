import * as functions from "firebase-functions";
import { admin } from "../admin";
import { processSource } from "./process";

const arrayUnion = admin.firestore.FieldValue.arrayUnion;

export const createImageDerivatives = functions.firestore
  .document("images/{imageId}")
  .onCreate(async (snap, context) => {
    const { source } = snap.data();
    const { imageId } = context.params;
    if (!source) {
      console.log("No source field, ignoring write");
      return;
    }

    const tasks = await processSource(source, imageId);

    for (const task of tasks) {
      task.then(async (output) => {
        await output.derivate.file.makePublic();

        const format = {
          mime: output.mime,
          url: output.url,
          resolution: {
            x: output.derivate.size.x,
            y: output.derivate.size.y,
          },
        };

        await snap.ref.update({ formats: arrayUnion(format) });
      });
    }
  });
