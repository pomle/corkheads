import React from "react";
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import renderer from "react-test-renderer";
import ButtonSet from "../ButtonSet";

describe("ButtonSet component", () => {
  it("renders nothing if content missing", () => {
    const component = renderer.create(
      <ButtonSet>
        {null}
        {null}
      </ButtonSet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders content with children when content present", () => {
    const component = renderer.create(
      <ButtonSet>
        <button type="button">Foo</button>
        {null}
        <button type="button">Bar</button>
      </ButtonSet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
