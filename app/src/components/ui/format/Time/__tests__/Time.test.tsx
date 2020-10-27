import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import moment from "moment";
import Time from "../Time";

describe("Time component", () => {
  const VALID_MOMENT = moment("2019-09-12T12:42:13.423Z");
  const INVALID_MOMENT = moment.invalid();

  it("shows the time of day for the date when valid", () => {
    const component = renderer.create(<Time date={VALID_MOMENT} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows blank time when date invalid", () => {
    const component = renderer.create(<Time date={INVALID_MOMENT} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
