import React from "react";
import { DataListProps } from "../../screens/Dashboard";
import { BannerBig, Title, BannerGroup, BannerMini } from "./styles";

interface Props {
  data: DataListProps;
}

export function AdvertisementsCard({ data }: Props) {
  switch (data?.type) {
    case 'group':
      return (
        <BannerGroup  key={data.id}>
          {data?.announces.map(ads => (
            <BannerMini onPress={() => {

            }}>
              <Title>{ads?.title}</Title>
            </BannerMini>
          ))}
        </BannerGroup>
      )
    default:
      return (
        <BannerGroup  key={data.id}>
          {data.announces.map(ads => (
            <BannerBig>
              <Title>{ads?.title}</Title>
            </BannerBig>
          ))}
        </BannerGroup>
      )
  }
}
