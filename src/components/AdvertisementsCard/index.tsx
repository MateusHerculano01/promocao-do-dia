import React from "react";
import { DataListProps } from "../../screens/Dashboard";
import { BannerBig, Title, BannerGroup, BannerMini, ImageAds } from "./styles";

interface Props {
  data: DataListProps;
  onPress: () => void;
}

export function AdvertisementsCard({ data, onPress }: Props) {
  switch (data?.type) {
    case "group":
      return (
        <BannerGroup>
          {data?.announces.map((ads, index) => (
            <BannerMini
              onPress={onPress}
              style={index === 0 ? { marginRight: 10 } : {}}
            >
              <Title>{ads?.title}</Title>
            </BannerMini>
          ))}
        </BannerGroup>
      );
    default:
      return (
        <BannerGroup>
          {data.announces.map((ads) => (
            <BannerBig onPress={onPress} >
              {ads.imageProduct ? (
                <ImageAds source={ads.imageProduct} />
              ) : (
                <Title>{ads?.title}</Title>
              )}
            </BannerBig>
          ))}
        </BannerGroup>
      );
  }
}
