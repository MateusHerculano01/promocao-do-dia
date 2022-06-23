import styled from "styled-components/native";

export const Divider = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.5;
`;
