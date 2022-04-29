import styled from "styled-components/native";

export const ContainerOverlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
`;

export const Container = styled.View`
  flex: 1;
  margin-top: 100px;
`;

export const Bar = styled.View`
  width: 50px;
  height: 3px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.7;
  align-self: center;
  margin-top: 13px;
`;