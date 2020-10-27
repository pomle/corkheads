import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import moment from "moment";
import Day from "../Day";

describe("Day component", () => {
  const VALID_MOMENT = moment("2019-09-12T12:42:13.423Z");

  it("shows the day of date when valid", () => {
    const component = renderer.create(<Day date={VALID_MOMENT} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
