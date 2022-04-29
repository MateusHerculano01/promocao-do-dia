import styled from "styled-components/native";

export const Divider = styled.View`
  width: 90%;
  height: 0.7px;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.4;
  
  align-self: flex-end;
`;