import React from "react";
import { FlatList } from "react-native";
import { Container, Sizes, SizesTitle, Separator } from "./styles";

export type SizesType = {
  id: string;
  title: string;
}

type Props = {
  handleModalSelect: (size: SizesType) => void;
}

export function SizeAdvertisement({ handleModalSelect }: Props) {
  const sizes = [
    {
      id: '10',
      title: 'Big'
    },
    {
      id: '20',
      title: 'Small'
    }
  ]

  return (
    <Container>
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={sizes}
        keyExtractor={(item) => item.id}
        horizontal={false}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Sizes
            onPress={() => handleModalSelect(item)}
          >
            <SizesTitle>{item.title}</SizesTitle>
          </Sizes>
        )}
      />
    </Container>
  )
}