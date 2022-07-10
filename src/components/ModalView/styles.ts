import styled from "styled-components/native";

export const ContainerOverlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text_dark};
  opacity: 0.9;
`;
