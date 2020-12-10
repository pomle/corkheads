import { createCodec } from "lib/path";

export const stringCodec = createCodec(encodeURIComponent, decodeURIComponent);
