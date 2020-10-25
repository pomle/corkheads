import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import Percentage from "../Percentage";

describe("Percentage component", () => {
  it("shows 1 as 100%", () => {
    const component = renderer.create(<Percentage fraction={1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("rounds number", () => {
    const component = renderer.create(<Percentage fraction={0.54124} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles negatives", () => {
    const component = renderer.create(<Percentage fraction={-1.24} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles non-finites gracefully", () => {
    const component = renderer.create(<Percentage fraction={1 / 0} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
