import styled, { css } from "styled-components";
import { LIGHT_TEXT } from "../../constants";

export const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

export const NoContent = styled.div`
  ${containerCss};
  color: ${LIGHT_TEXT};
  font-size: 5rem;
`;

export const SpinnerContainer = styled.div`
  ${containerCss};
`;
