import React from "react";
import { AdvertiserFormattedDTOS } from "@dtos/AdvertiserFormattedDTOS";
import { BannerGroup, Container, ImageAds } from "./styles";

interface Props extends AdvertiserFormattedDTOS {
  data: AdvertiserFormattedDTOS;
  onPress: () => void;
}

export function AdvertisementsCard({ data, onPress }: Props) {
  const randomKey = Math.floor(Math.random() * 65536);
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
