import { useAppContext } from "../../../context/AppContext";
import styled, { css } from "styled-components";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { ApplicationStateEnum, IUrls } from "../../../types";
import Spinner from "../../spinner";
import { DARK_GRAY, LIGHT_TEXT } from "../../../constants";
import { NoContent, SpinnerContainer } from "../../styles";
import RightChevron from "../../icons";

const Container = styled.div<{ menuVisible: boolean }>`
  position: relative;
  width: ${({ menuVisible }) => (menuVisible ? "75%" : "90%")};
  overflow: hidden;
`;

const StyledGrid = styled.div<{ translationCount: number }>`
  margin: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  grid-gap: 1rem;
  transform: ${({ translationCount }) =>
    `translateX(${translationCount * -480}px)`};
  transition: transform 0.5s;
`;

const StyledImg = styled.img<{ isActive: boolean; color: string }>`
  width: 28rem;
  height: 28rem;

  cursor: pointer;

  ${({ isActive, color }) =>
    isActive &&
    css`
      border: 8px solid ${color};
    `}
`;

const buttonCommon = css`
  position: fixed;
  z-index: 10;
  top: 77px;
  width: 5rem;
  height: 100%;
  opacity: 0.8;
  background-color: ${DARK_GRAY};
  cursor: pointer;
`;

const StyledLeftButton = styled.button`
  ${buttonCommon};
  left: 0;

  svg {
    fill: ${LIGHT_TEXT};
    transform: rotate(180deg);
  }
`;

const StyledRightButton = styled.button`
  ${buttonCommon};

  right: 0;

  svg {
    fill: ${LIGHT_TEXT};
  }
`;

const PHOTOS_URL = (topic: string) => `/topics/${topic}/photos`;

interface IPhoto {
  id: string;
  color: string;
  urls: IUrls;
}

// TODO: add accessibility functionality
const Grid = () => {
  const [moveCount, setMoveCount] = useState<number>(0);

  const [selectedItem, setSelectedItem] = useState<string>();
  const {
    activeState,
    setActiveState,
    activeTopic,
    menuVisible,
    setMenuVisibility,
  } = useAppContext();

  const { data, loading, handleRequest } = useAxios<IPhoto[]>({
    url: PHOTOS_URL(activeTopic),
    headers: { Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}` },
    manual: true,
  });

  useEffect(() => {
    if (activeTopic) handleRequest();
  }, [activeTopic]);

  if (loading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  if (data === null) return <NoContent>Please select a topic</NoContent>;

  const handleItemSelect = (id: string) => {
    if (id !== selectedItem) setSelectedItem(id);
    if (activeState === ApplicationStateEnum.MENU && setActiveState)
      setActiveState(ApplicationStateEnum.GRID);
  };

  const handleLeftScroll = () => {
    if (setMenuVisibility && moveCount === 1) setMenuVisibility(true);
    setMoveCount(moveCount - 1);
  };

  const handleRightScroll = () => {
    if (setMenuVisibility && moveCount === 1) setMenuVisibility(false);
    setMoveCount(moveCount + 1);
  };

  return (
    <Container menuVisible={menuVisible}>
      {activeState === ApplicationStateEnum.GRID && (
        <StyledLeftButton onClick={handleLeftScroll}>
          <RightChevron />
        </StyledLeftButton>
      )}
      <StyledGrid translationCount={moveCount}>
        {data.map(({ id, color, urls }) => {
          return (
            <StyledImg
              key={id}
              color={color}
              src={urls.thumb}
              data-testid={`image-${id}`}
              isActive={id === selectedItem}
              onClick={() => handleItemSelect(id)}
            />
          );
        })}
      </StyledGrid>
      {activeState === ApplicationStateEnum.GRID && (
        <StyledRightButton onClick={handleRightScroll}>
          <RightChevron />
        </StyledRightButton>
      )}
    </Container>
  );
};

export default Grid;
