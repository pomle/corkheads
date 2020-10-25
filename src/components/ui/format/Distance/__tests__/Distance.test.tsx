import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import Distance from "../Distance";

describe("Distance component", () => {
  it("formats a distance as kilometers", () => {
    const component = renderer.create(<Distance meters={4500} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
