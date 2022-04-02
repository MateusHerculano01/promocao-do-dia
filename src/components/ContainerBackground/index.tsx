import React from "react";
import { Container} from "./styles";
import blurImg from '../../assets/blurred.png';


export function ContainerBackground({}) {
  return (
    <Container
        source={blurImg}
        imageStyle={{opacity: 0.3}}
        blurRadius={30}
      />
  )
}