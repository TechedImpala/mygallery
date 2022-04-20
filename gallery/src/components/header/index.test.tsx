import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./";
import { useAppContext } from "../../context/AppContext";
import { ApplicationStateEnum } from "../../types";

jest.mock("../../context/AppContext");

describe("Header:", () => {
  test("correct text when menu state is active", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.MENU,
    });
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  test("correct text when grid state is active", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.GRID,
    });
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
