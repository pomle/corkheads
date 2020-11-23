import { firestore } from "firebase/app";
import moment from "moment";
import { createConverter } from "../converter";

describe("#createConverter", () => {
  type Shape = {
    id: string;
  };

  const conv = createConverter<Shape>({
    to(source) {
      return {
        ...source,
      };
    },
    from(snap) {
      const data = snap.data();
      return {
        id: "",
        date: moment(data.date),
      };
    },
  });

  describe("#toFirestore", () => {
    it("deletes 'id' prop from input", () => {
      const res = conv.toFirestore({
        id: "foo",
      });

      expect(res).toEqual({});
    });
  });

  describe("#fromFirestore", () => {
    it("adds 'id' prop to output", () => {
      const docMock = ({
        id: "bar",
        data() {
          return {};
        },
      } as unknown) as firestore.QueryDocumentSnapshot;

      const res = conv.fromFirestore(docMock);
      expect(res.id).toEqual("bar");
    });
  });
});
