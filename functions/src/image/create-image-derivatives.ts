import * as functions from "firebase-functions";
import { processSource } from "./process";

export const createImageDerivatives = functions.firestore
  .document("images/{imageId}")
  .onWrite(async (snap, context) => {
    const source = snap.after.data()?.source;
    if (!source) {
      console.log("No source field, ignoring write");
      return;
    }

    if (source === snap.before.data()?.source) {
      console.log("Source field not updated, ignoring write");
      return;
    }

    const { imageId } = context.params;
    const outputs = await processSource(source, imageId);

    await Promise.all(
      outputs.map((output) => output.derivate.file.makePublic())
    );

    const formats = outputs.map((output) => {
      return {
        url: output.url,
        mime: output.derivate.contentType,
        resolution: {
          x: output.derivate.size.x,
          y: output.derivate.size.y,
        },
      };
    });

    await snap.after.ref.update({ formats });
  });
