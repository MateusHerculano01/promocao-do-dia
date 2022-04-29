import React from "react";
import { ButtonView, Image, Placeholder, PlaceholderTitle } from "./styles";

type Props = {
  uri: string | null;
}

export function PhotoSuggestion({ uri }: Props) {
  if (uri) {
    return (

      <Image source={{ uri }}>
        <ButtonView />
      </Image>
    );
  }

  return (
    <Placeholder>
      <PlaceholderTitle>Nenhuma foto {'\n'}carregada</PlaceholderTitle>
    </Placeholder>
  )
}