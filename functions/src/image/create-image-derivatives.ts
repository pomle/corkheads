import * as functions from "firebase-functions";
import { processSource } from "./process";

export const createImageDerivatives = functions.firestore
  .document("images/{imageId}")
  .onCreate(async (snap, context) => {
    const { source } = snap.data();
    const { imageId } = context.params;
    if (!source) {
      console.log("No source field, ignoring write");
      return;
    }

    const outputs = await processSource(source, imageId);

    await Promise.all(
      outputs.map((output) => output.derivate.file.makePublic())
    );

    const formats = outputs.map((output) => {
      return {
        url: output.url,
        resolution: {
          x: output.derivate.size.x,
          y: output.derivate.size.y,
        },
      };
    });

    await snap.ref.update({ formats });
  });
