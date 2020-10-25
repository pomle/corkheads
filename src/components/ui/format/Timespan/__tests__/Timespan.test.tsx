import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import moment from "moment";
import Timespan from "../Timespan";

describe("Timespan component", () => {
  const START = moment("2019-09-12T12:42:13.423Z");
  const END = START.clone().add(1, "hour");

  it("shows start time a time after duration", () => {
    const component = renderer.create(<Timespan start={START} end={END} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
