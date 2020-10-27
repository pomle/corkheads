import React from "react";
import renderer from "react-test-renderer";
import ItemListItem from "../ItemListItem";

describe("ItemListItem", () => {
  it("wraps children", () => {
    const component = renderer.create(
      <ItemListItem>I am a child</ItemListItem>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as button when onClick supplied", () => {
    const component = renderer.create(
      <ItemListItem onClick={() => undefined} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("invokes onClick when clicked", () => {
    const handleClick = jest.fn();
    const component = renderer.create(<ItemListItem onClick={handleClick} />);
    component.root.findByType("button").props.onClick();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    const component = renderer.create(<ItemListItem disabled />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
