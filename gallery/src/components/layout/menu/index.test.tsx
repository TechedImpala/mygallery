import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Menu from "./";
import { useAppContext } from "../../../context/AppContext";
import { ApplicationStateEnum } from "../../../types";
import useAxios from "../../../hooks/useAxios";
import { topicResponse } from "../__fixtures___/index.fixtures";

jest.mock("../../../context/AppContext");
jest.mock("../../../hooks/useAxios");

describe("Menu:", () => {
  test("sets the active menu item when clicked", () => {
    const setActiveTopicMock = jest.fn();
    (useAxios as jest.Mock).mockReturnValue({
      data: topicResponse,
      loading: false,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.MENU,
      activeTopic: "",
      setActiveTopic: setActiveTopicMock,
    });

    const { container, getByTestId } = render(<Menu />);

    act(() => {
      fireEvent.click(getByTestId("menu-item-color-of-water"));
    });

    expect(setActiveTopicMock).toHaveBeenCalledWith("color-of-water");
    expect(container).toMatchSnapshot();
  });
});
