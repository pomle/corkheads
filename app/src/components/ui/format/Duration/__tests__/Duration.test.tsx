import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import moment from "moment";
import Duration from "../Duration";

describe("Duration component", () => {
  it("shows hour and minute", () => {
    const A = moment("2000-01-01T00:00:00Z");
    const B = A.clone()
      .add(3, "hours")
      .add(25, "minutes");
    const component = renderer.create(<Duration from={A} until={B} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows only minutes if under hour", () => {
    const A = moment("2000-01-01T00:00:00Z");
    const B = A.clone().add(59, "minutes");
    const component = renderer.create(<Duration from={A} until={B} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
