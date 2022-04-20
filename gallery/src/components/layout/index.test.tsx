import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./";
import { useAppContext } from "../../context/AppContext";
import { ApplicationStateEnum } from "../../types";
import useAxios from "../../hooks/useAxios";
import { topicResponse } from "./__fixtures___/index.fixtures";

jest.mock("../../context/AppContext");
jest.mock("../../hooks/useAxios");

describe("Layout:", () => {
  test("renders the menu and grid with no content", () => {
    (useAxios as jest.Mock)
      .mockReturnValueOnce({
        data: topicResponse,
        loading: false,
      })
      .mockReturnValue({
        data: null,
        loading: false,
        handleRequest: jest.fn(),
      });
    (useAppContext as jest.Mock).mockReturnValue({
      activeState: ApplicationStateEnum.MENU,
      activeTopic: "",
    });
    const { container, getByText } = render(<Layout />);

    expect(getByText("Please select a topic")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
