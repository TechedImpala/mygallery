import styled from "styled-components";
import Grid from "./grid";
import Menu from "./menu";

const StyledLayout = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const Header = () => {
  return (
    <StyledLayout>
      <Menu />
      <Grid />
    </StyledLayout>
  );
};

export default Header;
