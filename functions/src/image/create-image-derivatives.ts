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
        // @ts-ignore
        url: output.derivate.file.publicUrl() as string,
        resolution: {
          x: output.size.x,
          y: output.size.y,
        },
      };
    });

    await snap.ref.update({ formats });
  });
