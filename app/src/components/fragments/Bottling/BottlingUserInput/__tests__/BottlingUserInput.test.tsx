import React from "react";
import renderer from "react-test-renderer";
import { AppContextMock } from "lib/mocks/AppContextMock";
import { createMockFactory } from "lib/mocks/MockFactory";
import BottlingUserInput from "../BottlingUserInput";

const mocks = createMockFactory();

describe("BottlingUserInput component", () => {
  it("renders as expected", () => {
    const bottling = mocks.createBottling();
    const onChange = jest.fn();
    const component = renderer.create(
      <AppContextMock>
        <BottlingUserInput bottling={bottling} onChange={onChange} />
      </AppContextMock>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
