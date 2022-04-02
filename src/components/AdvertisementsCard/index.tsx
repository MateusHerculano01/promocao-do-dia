import React from "react";
import { DataListProps } from "../../screens/Dashboard";
import { BannerBig, Title, BannerGroup, BannerMini } from "./styles";

interface Props {
  data: DataListProps;
  onPress: () => void;
}

export function AdvertisementsCard({ data, onPress }: Props) {
  switch (data?.type) {
    case 'group':
      return (
        <BannerGroup  key={data.id}>
          {data?.announces.map(ads => (
            <BannerMini onPress={onPress}>
              <Title>{ads?.title}</Title>
            </BannerMini>
          ))}
        </BannerGroup>
      )
    default:
      return (
        <BannerGroup  key={data.id}>
          {data.announces.map(ads => (
            <BannerBig onPress={onPress}>
              <Title>{ads?.title}</Title>
            </BannerBig>
          ))}
        </BannerGroup>
      )
  }
}
