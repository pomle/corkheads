import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import moment from "moment";
import DayTime from "../DayTime";

describe("DayTime component", () => {
  const VALID_MOMENT = moment("2019-09-12T12:42:13.423Z");

  it("shows the date and time of date when valid", () => {
    const component = renderer.create(<DayTime date={VALID_MOMENT} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
