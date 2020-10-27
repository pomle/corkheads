import React from "react";
import renderer from "react-test-renderer";
import PickableItem from "../PickableItem";

describe("PickableItem", () => {
  it("wraps children", () => {
    const component = renderer.create(
      <PickableItem value={1} onPick={() => undefined}>
        I am a child
      </PickableItem>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onPick with value on click", () => {
    const value = Symbol("a unique value");
    const handlePick = jest.fn();
    const component = renderer.create(
      <PickableItem value={value} onPick={handlePick} />
    );
    component.root.findByType("button").props.onClick();
    expect(handlePick).toHaveBeenCalledTimes(1);
    expect(handlePick).toHaveBeenCalledWith(value);
  });
});
