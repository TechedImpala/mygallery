import { useAppContext } from "../../../context/AppContext";
import styled, { css } from "styled-components";
import useAxios from "../../../hooks/useAxios";
import { DARK_GRAY, DARK_TEXT, LIGHT_GRAY } from "../../../constants";
import { ApplicationStateEnum } from "../../../types";
import { SpinnerContainer } from "../../styles";
import Spinner from "../../spinner";

const StyledMenu = styled.header<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "" : "hidden")};
  width: ${({ visible }) => (visible ? "25%" : "5%")};
  transition: all 0.5s;
  background-color: ${DARK_GRAY};
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 100;
`;

const TOPIC_URL = "/topics";

interface ITopic {
  id: string;
  slug: string;
  title: string;
  description: string;
}

const StyledMenuItem = styled.div<{ isActive: boolean }>`
  font-size: 1.2rem;
  border: 1px solid silver;
  color: ${DARK_TEXT};
  background-color: ${LIGHT_GRAY};
  padding: 1.25rem;
  cursor: pointer;
  margin-left: 2px;

  ${({ isActive }) =>
    isActive &&
    css`
      cursor: default;
      color: white;
      font-size: 1.5rem;
      font-weight: 500;
      background-color: ${DARK_GRAY};
      border-left: 5px goldenrod solid;
    `}
`;

const Menu = () => {
  const {
    activeState,
    setActiveState,
    activeTopic,
    setActiveTopic,
    menuVisible,
  } = useAppContext();

  const { data, loading } = useAxios<ITopic[]>({
    url: TOPIC_URL,
    headers: { Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}` },
  });

  if (loading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  if (data === null) return <div>Something went wrong</div>;

  const handleMenuClick = (slug: string) => {
    if (activeTopic && slug === activeTopic) return;

    if (setActiveTopic) setActiveTopic(slug);
    if (activeState === ApplicationStateEnum.GRID && setActiveState)
      setActiveState(ApplicationStateEnum.MENU);
  };

  return (
    <StyledMenu visible={menuVisible}>
      {data.map(({ id, title, slug }) => {
        return (
          <StyledMenuItem
            key={id}
            data-testid={`menu-item-${slug}`}
            isActive={activeTopic === slug}
            onClick={() => handleMenuClick(slug)}
          >
            {title}
          </StyledMenuItem>
        );
      })}
    </StyledMenu>
  );
};

export default Menu;
