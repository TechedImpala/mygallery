import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Grid from "./";
import { useAppContext } from "../../../context/AppContext";
import { ApplicationStateEnum } from "../../../types";
import useAxios from "../../../hooks/useAxios";
import { photosResponse, topicResponse } from "../__fixtures___/index.fixtures";

jest.mock("../../../context/AppContext");
jest.mock("../../../hooks/useAxios");

describe("Grid:", () => {
  test("loads grid when a topic is selected", () => {
    const handleRequestMock = jest.fn();

    (useAxios as jest.Mock).mockReturnValue({
      data: photosResponse,
      loading: false,
      handleRequest: handleRequestMock,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.MENU,
      activeTopic: "color-of-water",
    });

    const { container } = render(<Grid />);

    expect(handleRequestMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test("sets grid active when selected", () => {
    const handleRequestMock = jest.fn();

    (useAxios as jest.Mock).mockReturnValue({
      data: photosResponse,
      loading: false,
      handleRequest: handleRequestMock,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.MENU,
      activeTopic: "color-of-water",
      setActiveState: jest.fn(),
    });

    const { container, getByTestId } = render(<Grid />);

    act(() => {
      fireEvent.click(getByTestId("image-JLDWc82d3U4"));
    });

    expect(handleRequestMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
