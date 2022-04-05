import React from "react";
import { Container } from "./styles";
//import blurImg from '../../assets/blurred.png';
import background from '../../assets/background/background.png';

export function ContainerBackground({ }) {
  return (
    <Container
      source={background}
      imageStyle={{ opacity: 0.5 }}
      blurRadius={30}
    />
  )
}