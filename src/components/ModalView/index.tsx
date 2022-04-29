import React, { ReactNode } from "react";
import { View, Modal, ModalProps, TouchableWithoutFeedback } from "react-native";
import { ContainerBackground } from "@components/ContainerBackground";
import { ContainerOverlay, Container, Bar } from "./styles";

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
}

export function ModalView({ children, closeModal, ...rest }: Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <ContainerOverlay>
          <Container>
            <ContainerBackground />
            <Bar />
            {children}
          </Container>
        </ContainerOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  )
}