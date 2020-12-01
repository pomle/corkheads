import { Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { calculateActiveDiff } from "../diff";

describe("#calculateActiveDiff", () => {
  it("returns 0 if both active", () => {
    const change = {
      before: {
        data() {
          return { active: true };
        },
      },
      after: {
        data() {
          return { active: true };
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(0);
  });

  it("returns -1 if deleted", () => {
    const change = {
      before: {
        data() {
          return { active: true };
        },
      },
      after: {
        data() {
          return undefined;
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(-1);
  });

  it("returns +1 if created", () => {
    const change = {
      before: {
        data() {
          return undefined;
        },
      },
      after: {
        data() {
          return { active: true };
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(1);
  });

  it("returns 0 if created inactive", () => {
    const change = {
      before: {
        data() {
          return undefined;
        },
      },
      after: {
        data() {
          return { active: false };
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(0);
  });

  it("returns 0 if deleted inactive", () => {
    const change = {
      before: {
        data() {
          return { active: false };
        },
      },
      after: {
        data() {
          return undefined;
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(0);
  });

  it("returns 0 both deleted", () => {
    const change = {
      before: {
        data() {
          return undefined;
        },
      },
      after: {
        data() {
          return undefined;
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(0);
  });

  it("returns 0 both active", () => {
    const change = {
      before: {
        data() {
          return { active: true };
        },
      },
      after: {
        data() {
          return { active: true };
        },
      },
    };

    expect(
      calculateActiveDiff((change as unknown) as Change<DocumentSnapshot>)
    ).toEqual(0);
  });
});
