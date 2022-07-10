import React, { ReactNode } from "react";
import { Modal, ModalProps, TouchableWithoutFeedback } from "react-native";
import { ContainerOverlay } from "./styles";

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
          {children}
        </ContainerOverlay>
      </TouchableWithoutFeedback>
    </Modal>

  )
}