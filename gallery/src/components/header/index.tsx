import { useAppContext } from "../../context/AppContext";
import styled from "styled-components";
import { ApplicationStateEnum } from "../../types";
import { DARK_GRAY, LIGHT_GRAY } from "../../constants";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding: 0.4rem;
  color: ${DARK_GRAY};
  background-color: ${LIGHT_GRAY};
  z-index: 5;
`;

const stateMap = {
  [ApplicationStateEnum.MENU]: ["active", "inactive"],
  [ApplicationStateEnum.GRID]: ["inactive", "active"],
};

const Header = () => {
  const { activeState } = useAppContext();

  const stateDesc = stateMap[activeState];
  return (
    <StyledHeader>{`State: Menu is ${stateDesc[0]} and grid is ${stateDesc[1]}`}</StyledHeader>
  );
};

export default Header;
