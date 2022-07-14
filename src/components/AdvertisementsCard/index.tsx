import React from "react";
import { AdvertiserDTOS } from "@dtos/AdvertiserDTOS";
import { BannerGroup, Container, ImageAds } from "./styles";

interface Props extends AdvertiserDTOS {
  data: AdvertiserDTOS;
  onPress: () => void;
}

export function AdvertisementsCard({ data, onPress }: Props) {
  return (
    <BannerGroup>
      {data.announces.map((ads) => (
        <Container size={ads.size === "big" ? "big" : "small"} onPress={onPress}>
          <ImageAds source={{ uri: ads.photo_url }} />
        </Container>
      ))}
    </BannerGroup>
  );
}
